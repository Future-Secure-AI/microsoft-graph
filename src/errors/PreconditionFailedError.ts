/**
 * A precondition provided in the request (such as an if-match header) doesn't match the resource's current state.
 * @module PreconditionFailedError
 * @category Errors
 */
export default class PreconditionFailedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "PreconditionFailedError";
	}
}
