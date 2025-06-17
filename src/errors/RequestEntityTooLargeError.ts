/**
 * The request size exceeds the maximum limit.
 * @module RequestEntityTooLargeError
 * @category Errors
 */
export default class RequestEntityTooLargeError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestEntityTooLargeError";
	}
}
