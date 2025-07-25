/**
 * Can't process the request because it's malformed or incorrect.
 * @module RequestFailedError
 * @category Errors
 */
export default class RequestFailedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestFailedError";
	}
}
