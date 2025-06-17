/**
 * The maximum storage quota has been reached.
 * @module InsufficientStorageError
 * @category Errors
 */
export default class InsufficientStorageError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "InsufficientStorageError";
	}
}
