/**
 * This service doesn’t support the format requested in the Accept header.
 * @module NotAcceptableError
 * @category Errors
 */
export default class NotAcceptableError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "NotAcceptableError";
	}
}
