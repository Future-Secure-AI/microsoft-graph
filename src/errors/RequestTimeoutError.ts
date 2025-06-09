/**
 * Error thrown when a request exceeds the allowed time limit.
 * @module RequestTimeoutError
 * @category Errors
 */
export default class RequestTimeoutError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "TimeoutError";
	}
}
