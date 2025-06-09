/**
 * Error thrown when a theoretically impossible state is encountered. This is akin to a panic.
 * @module NeverError
 * @category Errors
 */
export default class NeverError extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = "NeverError";
	}
}
