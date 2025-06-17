/**
 * Can't process the request because it is semantically incorrect.
 * @module UnprocessableEntityError
 * @category Errors
 */
export default class UnprocessableEntityError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "UnprocessableEntityError";
	}
}
