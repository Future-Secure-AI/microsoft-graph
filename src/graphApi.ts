import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import InconsistentContextError from "./errors/InconsistentContextError.ts";
import InvalidArgumentError from "./errors/InvalidArgumentError.ts";
import NeverError from "./errors/NeverError.ts";
import ProtocolError from "./errors/ProtocolError.ts";
import RequestFailedError from "./errors/RequestFailedError.ts";
import type { AccessToken } from "./models/AccessToken.ts";
import type { GraphHeaders, GraphOperation, GraphOperationDefinition } from "./models/GraphOperation.ts";
import type { Scope } from "./models/Scope.ts";
import { getCurrentAccessToken } from "./services/accessToken.ts";
import { getContext } from "./services/context.ts";
import { isGatewayTimeout, isHttpOk, isHttpTooManyRequests, isServiceUnavailable } from "./services/httpStatus.ts";
import { operationIdToIndex, operationIndexToId } from "./services/operationId.ts";
import { sleep } from "./services/sleep.ts";

export const authenticationScope = "https://graph.microsoft.com/.default" as Scope;
export const endpoint = "https://graph.microsoft.com/v1.0";
export const batchEndpoint = `${endpoint}/$batch`;

/** Define a operation, which can either be `await`d to execute independently, or passed with other operations ot `parallel` or `sequential` to execute as part of a batch. */
export function operation<T>(definition: GraphOperationDefinition<T>): GraphOperation<T> {
	const single = async <T>(definition: GraphOperationDefinition<T>): Promise<T> => {
		return await executeSingle<T>(definition);
	};

	const op = single(definition) as GraphOperation<T>;
	op.definition = definition;
	return op;
}

/** Execute a batch of GraphAPI operations in parallel. Provides the best performance for batch operations, however only useful if operations can logically be performed at the same time. */
export async function parallel<T extends GraphOperation<unknown>[]>(...operations: T): Promise<OperationResponse<T>> {
	const definitions = operations.map((op) => op.definition) as BatchGraphOperationDefinition<unknown>[];

	return (await executeBatch(...definitions)) as OperationResponse<T>;
}

/** Execute a batch of GraphAPI operations sequentially. */
export async function sequential<T extends GraphOperation<unknown>[]>(...operations: T): Promise<OperationResponse<T>> {
	const definitions = operations.map((definition, index) => ({
		...definition.definition,
		dependsOn: index > 0 ? [index - 1] : undefined, // Each op is dependant on the previous op
	}));

	return (await executeBatch(...definitions)) as OperationResponse<T>;
}

const maxBatchOperations = 20; // https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations
const maxRetries = 3;
const defaultRetryDelayMilliseconds = 1000;
const consecutiveRetryDelayMultiplier = 2;

type BatchReplyPayload = {
	responses: {
		id: string;
		status: number;
		headers: Record<string, string>;
		body: unknown;
	}[];
};

type BatchGraphOperationDefinition<T> = GraphOperationDefinition<T> & {
	dependsOn?: number[] | undefined;
};

type OperationResponse<T> = {
	[K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never;
};

type BodyError = {
	error: {
		code: string;
		message: string;
	};
};

async function executeSingle<T>(definition: GraphOperationDefinition<T>) {
	const context = getContext(definition.contextId);
	const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);

	const response = await innerFetch<T>({
		url: `${endpoint}${definition.path}`,
		method: definition.method,
		headers: {
			authorization: createAuthorizationHeader(accessToken),
			...headersToObject(definition.headers),
		},
		data: definition.body === null ? null : definition.body,
	});

	return definition.responseTransform(response);
}

async function executeBatch<T extends BatchGraphOperationDefinition<unknown>[]>(...ops: T): Promise<OperationResponse<T>> {
	InvalidArgumentError.throwIfGreater(ops.length, maxBatchOperations, `At most ${maxBatchOperations} operations allowed, but ${ops.length} were provided.`);

	if (ops.length === 0) {
		return [] as OperationResponse<T>;
	}

	const firstOp = ops[0];
	if (!firstOp) {
		throw new NeverError("First op not found. Should be impossible");
	}

	const contextId = firstOp.contextId;

	if (ops.some((op) => op.contextId !== contextId)) {
		throw new InconsistentContextError("All operations in a batch must share the same contextId.");
	}

	const context = getContext(contextId);
	const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);

	const body = await innerFetch<BatchReplyPayload>({
		url: batchEndpoint,
		method: "POST",
		headers: {
			authorization: createAuthorizationHeader(accessToken),
			accept: "application/json",
			"content-type": "application/json",
		},
		data: {
			requests: ops.map((op, index) => ({
				id: operationIndexToId(index),
				method: op.method,
				url: op.path,
				headers: op.headers,
				body: op.body === null ? undefined : op.body,
				dependsOn: op.dependsOn?.map((id) => id.toString()),
			})),
		},
	});

	const responses: unknown[] = [];

	for (const r of body.responses) {
		const index = operationIdToIndex(r.id);
		const headers = normalizeBatchHeaders(r.headers);
		const contentType = headers["content-type"];
		const body = normalizeBatchBody(contentType, r.body);

		const op = ops[index];
		if (!op) {
			throw new ProtocolError("Reference to operation that was not submitted in the batch");
		}
		if (!isHttpOk(r.status)) {
			const bodyError = body as BodyError;
			let errorMessage = `${r.status}`;
			if (bodyError?.error) {
				errorMessage += `: [${bodyError.error.code}] '${bodyError.error.message}'`;
			}
			RequestFailedError.throw(`GraphAPI operation ${index} failed: ${errorMessage}`, op, r);
		}
		responses[index] = op.responseTransform(body);
	}

	return responses as OperationResponse<T>; // TODO: Is there a neater way to massage the types correctly? This is functionally correct, but I do want to avoid using `unknown` here if possible.
}

/** Execute request, supporting GraphAPI retry logic */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This function does need to be simplified, though it is a TODO for another day
async function innerFetch<T>(args: AxiosRequestConfig): Promise<T> {
	const { url, ...options } = args;

	if (!url) {
		throw new Error("URL is required for request");
	}

	let retryAfterMilliseconds = defaultRetryDelayMilliseconds;
	let response: AxiosResponse | null = null;
	let attempts = 0; // Track the number of attempts

	// TODO: Tidy this proxy work-around:
	let instance: AxiosInstance;
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	const httpsProxy = process.env["HTTPS_PROXY"];
	if (httpsProxy) {
		instance = axios.create({
			proxy: false,
			httpsAgent: new HttpsProxyAgent(httpsProxy),
		});
	} else {
		instance = axios.create({
			httpsAgent: options.httpAgent,
		});
	}

	while (attempts < maxRetries) {
		try {
			response = await instance({
				url,
				...options,
			});
			break; // If successful, exit the loop
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				response = error.response;

				if (!(isHttpTooManyRequests(response.status) || isServiceUnavailable(response.status) || isGatewayTimeout(response.status))) {
					throw error; // Don't retry for other error codes
				}

				const requestedRetryAfterSeconds = Number.parseInt(response.headers["retry-after"] ?? "0", 10);
				if (requestedRetryAfterSeconds) {
					retryAfterMilliseconds = requestedRetryAfterSeconds * 1000;
				}

				await sleep(retryAfterMilliseconds);
				retryAfterMilliseconds *= consecutiveRetryDelayMultiplier;
				attempts++; // Increment the attempt counter

				if (attempts >= maxRetries) {
					RequestFailedError.throw(`GraphAPI fetch exceed retry limit of ${maxRetries} attempts.`, args);
				}
			} else {
				// For non-Axios errors or errors without response, just throw
				throw error;
			}
		}
	}

	if (!response) {
		throw new NeverError("Response is null. Should be impossible");
	}

	if (isHttpTooManyRequests(response.status)) {
		RequestFailedError.throw("GraphAPI fetch failed after 3 retries due to too many requests.", args);
	}

	if (!isHttpOk(response.status)) {
		const bodyError = response.data as BodyError;
		let errorMessage = `${response.status} '${response.statusText}'`;
		if (bodyError?.error) {
			errorMessage += `: [${bodyError.error.code}] '${bodyError.error.message}'`;
		}

		RequestFailedError.throw(`GraphAPI fetch failed: ${errorMessage}`, args, response.data);
	}

	return response.data as T;
}

function normalizeBatchBody(contentType: string | undefined, body: unknown): unknown {
	if (contentType?.startsWith("application/json") && typeof body === "string") {
		return JSON.parse(atob(body));
	}

	return body;
}

function normalizeBatchHeaders(input: Record<string, string>): Record<string, string> {
	const headers: Record<string, string> = {};
	for (const key in input) {
		if (input[key]) {
			headers[key.toLocaleLowerCase()] = input[key];
		}
	}
	return headers;
}

function createAuthorizationHeader(accessToken: AccessToken): string {
	return `Bearer ${accessToken}`;
}

function headersToObject(obj: GraphHeaders): Record<string, string> {
	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Record<string, string>;
}
