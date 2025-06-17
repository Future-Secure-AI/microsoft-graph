/**
 * There was an internal server error while processing the request.
 * @module InternalServerError
 * @category Errors
 */
export default class InternalServerError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "InternalServerError";
	}
}
