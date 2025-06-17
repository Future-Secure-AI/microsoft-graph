/**
 * The request can't be processed due to a conflict with the current state.
 * @remarks For example, the specified parent folder might not exist.
 * @module ConflictError
 * @category Errors
 */
export default class ConflictError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ConflictError";
	}
}
