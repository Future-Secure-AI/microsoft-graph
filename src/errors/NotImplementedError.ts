/**
 * Error thrown when a requested feature or functionality is not yet implemented.
 * @module NotImplementedError
 * @category Errors
 */
export default class NotImplementedError extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = "NotImplementedError";
	}
}
