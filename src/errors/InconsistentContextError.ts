/**
 * Error thrown when batched operations are performed with an inconsistent context (ie, different authentication).
 * @module InconsistentContextError
 * @category Errors
 */
export default class InconsistentContextError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "InconsistentContextError";
	}
}
