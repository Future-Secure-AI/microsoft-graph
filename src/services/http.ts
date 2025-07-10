/**
 * HTTP request utilities for Microsoft Graph API, with proxy support.
 * @module http
 * @category Services
 */

import type { PublicErrorResponse } from "@microsoft/microsoft-graph-types";
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type CreateAxiosDefaults, type RawAxiosRequestHeaders, type ResponseType } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import BadRequestError from "../errors/BadRequestError.ts";
import BandwidthLimitExceededError from "../errors/BandwidthLimitExceededError.ts";
import ConflictError from "../errors/ConflictError.ts";
import ForbiddenError from "../errors/ForbiddenError.ts";
import GatewayTimeoutError from "../errors/GatewayTimeoutError.ts";
import GoneError from "../errors/GoneError.ts";
import InsufficientStorageError from "../errors/InsufficientStorageError.ts";
import InternalServerError from "../errors/InternalServerError.ts";
import LengthRequiredError from "../errors/LengthRequiredError.ts";
import LockedError from "../errors/LockedError.ts";
import MethodNotAllowedError from "../errors/MethodNotAllowedError.ts";
import NeverError from "../errors/NeverError.ts";
import NotAcceptableError from "../errors/NotAcceptableError.ts";
import NotFoundError from "../errors/NotFoundError.ts";
import NotImplementedError from "../errors/NotImplementedError.ts";
import PaymentRequiredError from "../errors/PaymentRequiredError.ts";
import PreconditionFailedError from "../errors/PreconditionFailedError.ts";
import RequestedRangeNotSatisfiableError from "../errors/RequestedRangeNotSatisfiableError.ts";
import RequestEntityTooLargeError from "../errors/RequestEntityTooLargeError.ts";
import ServiceUnavailableError from "../errors/ServiceUnavailableError.ts";
import TooManyRequestsError from "../errors/TooManyRequestsError.ts";
import UnauthorizedError from "../errors/UnauthorizedError.ts";
import UnprocessableEntityError from "../errors/UnprocessableEntityError.ts";
import UnsupportedMediaTypeError from "../errors/UnsupportedMediaTypeError.ts";
import type { HttpMethod } from "../models/Http.ts";
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
import { sleep } from "./sleep.ts";

const maxRetries = 3;
const defaultRetryDelayMilliseconds = 1000;
const consecutiveRetryDelayMultiplier = 2;

export type Request = {
	url: string;
	method: HttpMethod;
	headers?: RawAxiosRequestHeaders;
	data?: unknown;
	responseType?: ResponseType;
};

export async function execute<TResponse>(request: Request): Promise<TResponse> {
	let retryAfterMilliseconds = defaultRetryDelayMilliseconds;
	let response: AxiosResponse | null = null;
	let attempts = 0;
	let errorLog = "";
	while (true) {
		try {
			response = await executeRaw(request);
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

	return response.data as TResponse;
}

export function throwHttpException(responseCode: number, message: string): never {
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

	throw new Error(message);
}

let instance: AxiosInstance | null = null;

export async function executeRaw(request: Request) {
	if (!instance) {
		instance = createAxiosInstance();
	}

	return await instance(request satisfies AxiosRequestConfig);
}

function createAxiosInstance(): AxiosInstance {
	const config: CreateAxiosDefaults = {
		validateStatus: () => true,
	};

	// biome-ignore lint/complexity/useLiteralKeys: Accessing env
	const httpsProxy = process.env["HTTPS_PROXY"];
	if (httpsProxy) {
		config.proxy = false;
		config.httpsAgent = new HttpsProxyAgent(httpsProxy);
	}

	return axios.create(config);
}

function requestToString(request: AxiosRequestConfig): string {
	const url = request.url || "";
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

	throwHttpException(response.status, message);
}
