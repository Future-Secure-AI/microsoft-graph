/**
 * Can't process the request because it's malformed or incorrect.
 * @module BadRequestError
 * @category Errors
 */
export default class BadRequestError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "BadRequestError";
	}
}
