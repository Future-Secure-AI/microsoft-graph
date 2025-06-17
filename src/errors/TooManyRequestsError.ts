/**
 * Client application has been throttled and shouldn't attempt to repeat the request until an amount of time has elapsed.
 * @module TooManyRequestsError
 * @category Errors
 */
export default class TooManyRequestsError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "TooManyRequestsError";
	}
}
