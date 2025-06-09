/**
 * Error thrown when a request to the server fails.
 * @module RequestFailedError
 * @category Errors
 */
export default class RequestFailedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestFailedError";
	}

	public static throw(message: string, request: unknown, response?: unknown): never {
		const r = request as { headers?: { authorization?: string } };
		if (r?.headers?.authorization) {
			r.headers.authorization = "<REDACTED>";
		}
		throw new RequestFailedError(`${message}\n\nREQUEST: ${JSON.stringify(r, null, 2)}\n\nRESPONSE: ${JSON.stringify(response, null, 2)}`);
	}
}
