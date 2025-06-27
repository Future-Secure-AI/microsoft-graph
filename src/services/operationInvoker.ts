/**
 * Invoke operations, potentially as parallel or sequential batches.
 * @module operationInvoker
 * @category Services
 **/
import type { PublicErrorResponse } from "@microsoft/microsoft-graph-types";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import BadRequestError from "../errors/BadRequestError.ts";
import BandwidthLimitExceededError from "../errors/BandwidthLimitExceededError.ts";
import ConflictError from "../errors/ConflictError.ts";
import ForbiddenError from "../errors/ForbiddenError.ts";
import GatewayTimeoutError from "../errors/GatewayTimeoutError.ts";
import GoneError from "../errors/GoneError.ts";
import InconsistentContextError from "../errors/InconsistentContextError.ts";
import InsufficientStorageError from "../errors/InsufficientStorageError.ts";
import InternalServerError from "../errors/InternalServerError.ts";
import InvalidArgumentError from "../errors/InvalidArgumentError.ts";
import LengthRequiredError from "../errors/LengthRequiredError.ts";
import LockedError from "../errors/LockedError.ts";
import MethodNotAllowedError from "../errors/MethodNotAllowedError.ts";
import NeverError from "../errors/NeverError.ts";
import NotAcceptableError from "../errors/NotAcceptableError.ts";
import NotFoundError from "../errors/NotFoundError.ts";
import NotImplementedError from "../errors/NotImplementedError.ts";
import PaymentRequiredError from "../errors/PaymentRequiredError.ts";
import PreconditionFailedError from "../errors/PreconditionFailedError.ts";
import ProtocolError from "../errors/ProtocolError.ts";
import RequestedRangeNotSatisfiableError from "../errors/RequestedRangeNotSatisfiableError.ts";
import RequestEntityTooLargeError from "../errors/RequestEntityTooLargeError.ts";
import ServiceUnavailableError from "../errors/ServiceUnavailableError.ts";
import TooManyRequestsError from "../errors/TooManyRequestsError.ts";
import UnauthorizedError from "../errors/UnauthorizedError.ts";
import UnprocessableEntityError from "../errors/UnprocessableEntityError.ts";
import UnsupportedMediaTypeError from "../errors/UnsupportedMediaTypeError.ts";
import type { AccessToken } from "../models/AccessToken.ts";
import type { GraphOperation, GraphOperationDefinition, OperationResponse } from "../models/GraphOperation.ts";
import type { HttpHeaders } from "../models/Http.ts";
import { executeHttpRequest } from "./http.ts";
import {
	isHttpBadRequest,
	isHttpBandwidthLimitExceeded,
	isHttpConflict,
	isHttpForbidden,
	isHttpGatewayTimeout,
	isHttpGone,
	isHttpInsufficientStorage,
	isHttpInternalServerError,
	isHttpLengthRequired,
	isHttpLocked,
	isHttpMethodNotAllowed,
	isHttpNotAcceptable,
	isHttpNotFound,
	isHttpNotImplemented,
	isHttpPaymentRequired,
	isHttpPreconditionFailed,
	isHttpRequestedRangeNotSatisfiable,
	isHttpRequestEntityTooLarge,
	isHttpServiceUnavailable,
	isHttpSuccess,
	isHttpTooManyRequests,
	isHttpUnauthorized,
	isHttpUnprocessableEntity,
	isHttpUnsupportedMediaType,
	isRetryable,
} from "./httpStatus.ts";
import { operationIdToIndex, operationIndexToId } from "./operationId.ts";
import { sleep } from "./sleep.ts";

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

async function executeSingle<T>(definition: GraphOperationDefinition<T>) {
	const accessToken = await definition.context.generateAccessToken();
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

	const context = firstOp.context;

	if (ops.some((op) => op.context !== context)) {
		throw new InconsistentContextError("All operations in a batch must share the same context.");
	}

	const accessToken = await context.generateAccessToken();

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
		if (!isHttpSuccess(r.status)) {
			throwException(r.status, `Batch operation failed for op #${index}: ${JSON.stringify(r.body, null, 2)}`);
		}
		responses[index] = op.responseTransform(body);
	}

	return responses as OperationResponse<T>; // TODO: Is there a neater way to massage the types correctly? This is functionally correct, but I do want to avoid using `unknown` here if possible.
}

async function innerFetch<T>(request: AxiosRequestConfig): Promise<T> {
	let retryAfterMilliseconds = defaultRetryDelayMilliseconds;
	let response: AxiosResponse | null = null;
	let attempts = 0;
	let errorLog = "";
	while (true) {
		try {
			response = await executeHttpRequest(request);
		} catch (error) {
			const message = error instanceof Error ? error.message : error?.toString() || "Unknown error";
			response = {
				status: -1,
				statusText: message,
				headers: {},
				data: null,
				config: request,
				request: null,
			} as AxiosResponse;
			errorLog += message;
		}

		errorLog += requestToString(request);
		errorLog += responseToString(response);
		attempts++;

		if (isHttpSuccess(response.status) || !isRetryable(response.status) || attempts === maxRetries) {
			break;
		}

		const requestedRetryAfterSeconds = Number.parseInt(response.headers["retry-after"] ?? "0", 10);
		if (requestedRetryAfterSeconds) {
			retryAfterMilliseconds = requestedRetryAfterSeconds * 1000;
		} else {
			retryAfterMilliseconds += Math.random() * 1000; // Add some randomness to the retry delay to avoid thundering herd problem
		}

		errorLog += waitToString(retryAfterMilliseconds);
		await sleep(retryAfterMilliseconds);
		retryAfterMilliseconds *= consecutiveRetryDelayMultiplier;
	}

	if (!response) {
		throw new NeverError("Response is empty.");
	}

	if (!isHttpSuccess(response.status)) {
		handleResponseError(response, errorLog, attempts);
	}

	return response.data as T;
}

function requestToString(request: AxiosRequestConfig): string {
	let url = request.url || "";
	if (url.startsWith(endpoint)) {
		url = url.substring(endpoint.length);
	}
	let message = ` 📤 ${request.method} ${url}\n`;
	if (request.data) {
		message += errorObjectToString(request.data);
	}
	return message;
}
function responseToString(response: AxiosResponse): string {
	const message = ` 📥 ${response.status} ${response.statusText}\n`;
	// TODO: Is there any case where we care about the response body?
	// if (response.data) {
	// 	message += errorObjectToString(response.data);
	// }
	return message;
}
function waitToString(milliseconds: number): string {
	return ` ⏳ Wait ${milliseconds}ms for retry.\n`;
}

function errorObjectToString(obj: unknown): string {
	const maxLength = 1024;
	const ellipses = "...";

	let str = JSON.stringify(obj, null, 2)
		.split("\n")
		.map((line) => `    ${line}`)
		.join("\n");

	if (str.length > maxLength) {
		str = `${str.substring(0, maxLength - ellipses.length)}${ellipses}`;
	}
	return `${str}\n`;
}
function handleResponseError(response: AxiosResponse, errorLog: string, attempts: number, operationIndex: number | null = null): never {
	const error = response.data as PublicErrorResponse | undefined;

	let message = error?.error?.message;
	if (message && !message.endsWith(".")) {
		message += ".";
	}
	if (error?.error?.innerError?.message) {
		message += ` ${error.error.innerError.message}`;
	}
	if (message && !message.endsWith(".")) {
		message += ".";
	}
	if (!message) {
		message = response.statusText;
	}
	if (attempts > 1) {
		message += ` Operation attempted ${attempts} time(s).`;
	}
	if (operationIndex !== null) {
		message += ` (op #${operationIndex})`;
	}
	message += `\n${errorLog}`;

	throwException(response.status, message);
}

export function throwException(responseCode: number, message: string): never {
	if (isHttpBadRequest(responseCode)) {
		throw new BadRequestError(message);
	}
	if (isHttpUnauthorized(responseCode)) {
		throw new UnauthorizedError(message);
	}
	if (isHttpPaymentRequired(responseCode)) {
		throw new PaymentRequiredError(message);
	}
	if (isHttpForbidden(responseCode)) {
		throw new ForbiddenError(message);
	}
	if (isHttpNotFound(responseCode)) {
		throw new NotFoundError(message);
	}
	if (isHttpMethodNotAllowed(responseCode)) {
		throw new MethodNotAllowedError(message);
	}
	if (isHttpNotAcceptable(responseCode)) {
		throw new NotAcceptableError(message);
	}
	if (isHttpConflict(responseCode)) {
		throw new ConflictError(message);
	}
	if (isHttpGone(responseCode)) {
		throw new GoneError(message);
	}
	if (isHttpLengthRequired(responseCode)) {
		throw new LengthRequiredError(message);
	}
	if (isHttpPreconditionFailed(responseCode)) {
		throw new PreconditionFailedError(message);
	}
	if (isHttpRequestEntityTooLarge(responseCode)) {
		throw new RequestEntityTooLargeError(message);
	}
	if (isHttpUnsupportedMediaType(responseCode)) {
		throw new UnsupportedMediaTypeError(message);
	}
	if (isHttpRequestedRangeNotSatisfiable(responseCode)) {
		throw new RequestedRangeNotSatisfiableError(message);
	}
	if (isHttpUnprocessableEntity(responseCode)) {
		throw new UnprocessableEntityError(message);
	}
	if (isHttpLocked(responseCode)) {
		throw new LockedError(message);
	}
	if (isHttpTooManyRequests(responseCode)) {
		throw new TooManyRequestsError(message);
	}
	if (isHttpInternalServerError(responseCode)) {
		throw new InternalServerError(message);
	}
	if (isHttpNotImplemented(responseCode)) {
		throw new NotImplementedError(message);
	}
	if (isHttpServiceUnavailable(responseCode)) {
		throw new ServiceUnavailableError(message);
	}
	if (isHttpGatewayTimeout(responseCode)) {
		throw new GatewayTimeoutError(message);
	}
	if (isHttpInsufficientStorage(responseCode)) {
		throw new InsufficientStorageError(message);
	}
	if (isHttpBandwidthLimitExceeded(responseCode)) {
		throw new BandwidthLimitExceededError(message);
	}

	throw new NeverError(message);
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
