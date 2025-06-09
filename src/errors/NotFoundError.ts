/**
 * Error thrown when a requested resource is not found.
 * @module NotFoundError
 * @category Errors
 */
export default class NotFoundError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}
