/**
 * Error thrown when a function is called when the system is in an unexpected state.
 * @module InvalidOperationError
 * @category Errors
 */
export default class InvalidOperationError extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = "InvalidOperationError";
	}
}
