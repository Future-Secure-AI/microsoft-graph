/**
 * The service is temporarily unavailable for maintenance or is overloaded. You may repeat the request after a delay, the length of which may be specified in a Retry-After header.
 * @module ServiceUnavailableError
 * @category Errors
 */
export default class ServiceUnavailableError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ServiceUnavailableError";
	}
}
