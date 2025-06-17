/**
 * A Content-Length header is required on the request.
 * @module LengthRequiredError
 * @category Errors
 */
export default class LengthRequiredError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "LengthRequiredError";
	}
}
