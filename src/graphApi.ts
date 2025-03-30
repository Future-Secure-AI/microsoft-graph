import fetch from "node-fetch";
import InconsistentContextError from "./errors/InconsistentContextError.ts";
import InvalidArgumentError from "./errors/InvalidArgumentError.ts";
import RequestFailedError from "./errors/RequestFailedError.ts";
import type { GraphOperation, GraphOperationDefinition } from "./models/GraphOperation.ts";
import type { Scope } from "./models/Scope.ts";
import { getCurrentAccessToken } from "./services/accessToken.ts";
import { getContext } from "./services/context.ts";
import { tryGetHttpAgent } from "./services/httpAgent.ts";
import { operationIdToIndex, operationIndexToId } from "./services/operationId.ts";

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
export async function parallel<T extends GraphOperation<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
	const definitions = ops.map((op) => op.definition) as GraphOperationDefinitionWithDeps<unknown>[];

	return (await executeBatch(...definitions)) as ExecutionResults<T>;
}

/** Execute a batch of GraphAPI operations sequentially. */
export async function sequential<T extends GraphOperation<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
	const definitions = ops.map((definition, index) => ({
		...definition.definition,
		dependsOn: index > 0 ? [index - 1] : undefined, // Each op is dependant on the previous op
	}));

	return (await executeBatch(...definitions)) as ExecutionResults<T>;
}

const maxBatchOperations = 20; // https://learn.microsoft.com/en-us/graph/json-batching?tabs=http#batch-size-limitations

type ReplyPayload = {
	responses: {
		id: string;
		status: number;
		headers: Record<string, string>;
		body: unknown;
	}[];
};

type GraphOperationDefinitionWithDeps<T> = GraphOperationDefinition<T> & {
	/** Array of request indexes that must be completed before this request is executed. */
	dependsOn?: number[] | undefined;
};

type ExecutionResults<T> = {
	[K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never;
};

async function executeSingle<T>(definition: GraphOperationDefinition<T>) {
	const context = getContext(definition.contextId);
	const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);
	const agent = tryGetHttpAgent(context.httpProxy);

	const requestHeaders = {
		authorization: `Bearer ${accessToken}`,
		...Object.fromEntries(Object.entries(definition.headers ?? {}).filter(([_, v]) => v !== undefined)), // TODO: Tidy
	} as Record<string, string>;

	const reply = await fetch(`${endpoint}${definition.path}`, {
		method: definition.method,
		headers: requestHeaders,
		body: definition.body === null ? null : JSON.stringify(definition.body),
		agent,
	});

	const replyContentType = reply.headers.get("content-type")?.toLowerCase();

	const body = replyContentType?.startsWith("application/json") ? await reply.json() : null;
	RequestFailedError.throwIfNotOkOperation(reply.status, 0, definition, body);

	return definition.responseTransform(body);
}

async function executeBatch<T extends GraphOperationDefinitionWithDeps<unknown>[]>(...ops: T): Promise<ExecutionResults<T>> {
	InvalidArgumentError.throwIfGreater(ops.length, maxBatchOperations, `At most ${maxBatchOperations} operations allowed, but ${ops.length} were provided.`);

	if (ops.length === 0) {
		return [] as ExecutionResults<T>;
	}

	const requestPayload = await composeRequestPayload<T>(ops);
	const reply = await fetch(batchEndpoint, requestPayload);
	const replyPayload = (await reply.json()) as ReplyPayload;
	RequestFailedError.throwIfNotOkBatch(reply.status, ops, replyPayload);
	const responses = parseResponses<T>(replyPayload, ops);

	return responses;
}

async function composeRequestPayload<T extends GraphOperationDefinitionWithDeps<unknown>[]>(ops: T) {
	const firstOp = ops[0];
	if (!firstOp) {
		throw new Error("First op not found. Should be impossible");
	}

	const contextId = firstOp.contextId;

	if (ops.some((op) => op.contextId !== contextId)) {
		throw new InconsistentContextError("All operations in a batch must share the same contextId.");
	}

	const context = getContext(contextId);
	const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);
	const agent = tryGetHttpAgent(context.httpProxy);

	const requestBody = {
		requests: ops.map((op, index) => ({
			id: operationIndexToId(index),
			method: op.method,
			url: op.path,
			headers: op.headers,
			body: op.body === null ? undefined : op.body,
			dependsOn: op.dependsOn?.map((id) => id.toString()),
		})),
	};

	const requestPayload = {
		method: "POST",
		headers: {
			authorization: `Bearer ${accessToken}`,
			accept: "application/json",
			"content-type": "application/json",
		},
		body: JSON.stringify(requestBody),
		agent,
	};

	return requestPayload;
}

function normalizeBody(contentType: string | undefined, body: unknown): unknown {
	if (contentType?.startsWith("application/json") && typeof body === "string") {
		return JSON.parse(atob(body));
	}

	return body;
}

function normalizeHeaders(input: Record<string, string>): Record<string, string> {
	const headers: Record<string, string> = {};
	for (const key in input) {
		if (input[key]) {
			headers[key.toLocaleLowerCase()] = input[key];
		}
	}
	return headers;
}

function parseResponses<T extends GraphOperationDefinitionWithDeps<unknown>[]>(replyPayload: ReplyPayload, ops: T) {
	const results: unknown[] = [];

	for (const response of replyPayload.responses) {
		const index = operationIdToIndex(response.id);
		const headers = normalizeHeaders(response.headers);
		const contentType = headers["content-type"];
		const body = normalizeBody(contentType, response.body);

		const op = ops[index];
		if (!op) {
			throw new Error("Op not found. Should be impossible");
		}
		RequestFailedError.throwIfNotOkOperation(response.status, index, op, body);

		results[index] = op.responseTransform(body);
	}

	return results as ExecutionResults<T>; // TODO: Is there a neater way to massage the types correctly? This is functionally correct, but I do want to avoid using `unknown` here if possible.
}
