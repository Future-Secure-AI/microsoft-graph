/**
 * Invoke operations, potentially as parallel or sequential batches.
 * @module operationInvoker
 * @category Services
 **/
import InconsistentContextError from "../errors/InconsistentContextError.ts";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import NeverError from "../errors/NeverError.ts";
import ProtocolError from "../errors/ProtocolError.ts";
import type { AccessToken } from "../models/AccessToken.ts";
import type { GraphOperation, GraphOperationDefinition, OperationResponse } from "../models/GraphOperation.ts";
import type { HttpHeaders } from "../models/Http.ts";
import { execute, throwHttpException } from "./http.ts";
import { isHttpSuccess } from "./httpStatus.ts";
import { operationIdToIndex, operationIndexToId } from "./operationId.ts";

/**
 * Endpoint for submitting individual requests.
 * @internal
 */
export const endpoint = "https://graph.microsoft.com/v1.0";

/**
 * Endpoint for submitting batch requests.
 * @internal
 */
export const batchEndpoint = `${endpoint}/$batch`;

/**
 * Defines a Graph operation.
 *
 * Operations can be awaited to execute independently, or passed with others as arguments to {@link parallel} or {@link sequential} to execute as part of a batch.
 *
 * @typeParam T - The response type of the operation.
 * @param definition Definition of the Graph operation.
 * @returns GraphOperation instance.
 */
export function operation<T>(definition: GraphOperationDefinition<T>): GraphOperation<T> {
	const single = async <T>(definition: GraphOperationDefinition<T>): Promise<T> => {
		return await executeSingle<T>(definition);
	};

	const op = single(definition) as GraphOperation<T>;
	op.definition = definition;
	return op;
}

/**
 * Execute a batch of GraphAPI operations in parallel.
 *
 * Provides the best performance for batch operations, however only useful if operations can logically be performed at the same time.
 *
 * @typeParam T - Tuple of GraphOperation types.
 * @param operations Operations to execute in parallel.
 * @returns The responses for each operation, in the same order.
 */
export async function parallel<T extends GraphOperation<unknown>[]>(...operations: T): Promise<OperationResponse<T>> {
	const definitions = operations.map((op) => op.definition) as BatchGraphOperationDefinition<unknown>[];

	return (await executeBatch(...definitions)) as OperationResponse<T>;
}

/**
 * Execute a batch of GraphAPI operations sequentially.
 *
 * Each operation is dependent on the previous operation in the batch.
 *
 * @typeParam T - Tuple of GraphOperation types.
 * @param operations Operations to execute sequentially.
 * @returns The responses for each operation, in the same order.
 */
export async function sequential<T extends GraphOperation<unknown>[]>(...operations: T): Promise<OperationResponse<T>> {
	const definitions = operations.map((definition, index) => ({
		...definition.definition,
		dependsOn: index > 0 ? [index - 1] : undefined, // Each op is dependant on the previous op
	}));

	return (await executeBatch(...definitions)) as OperationResponse<T>;
}

const maxBatchOperations = 20; // https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

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

async function executeSingle<T>(definition: GraphOperationDefinition<T>) {
	const accessToken = await definition.context.generateAccessToken();
	const response = await execute<T>({
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

	const context = firstOp.context;

	if (ops.some((op) => op.context !== context)) {
		throw new InconsistentContextError("All operations in a batch must share the same context.");
	}

	const accessToken = await context.generateAccessToken();

	const body = await execute<BatchReplyPayload>({
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
		if (!isHttpSuccess(r.status)) {
			throwHttpException(r.status, `Batch operation failed for op #${index}: ${JSON.stringify(r.body, null, 2)}`);
		}
		responses[index] = op.responseTransform(body);
	}

	return responses as OperationResponse<T>; // TODO: Is there a neater way to massage the types correctly? This is functionally correct, but I do want to avoid using `unknown` here if possible.
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

function headersToObject(obj: HttpHeaders): Record<string, string> {
	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Record<string, string>;
}
