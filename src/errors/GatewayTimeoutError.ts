/**
 * The server, while acting as a proxy, didn't receive a timely response from the upstream server it needed to access in attempting to complete the request.
 * @module GatewayTimeoutError
 * @category Errors
 */
export default class GatewayTimeoutError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "GatewayTimeoutError";
	}
}
