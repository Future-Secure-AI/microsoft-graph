/**
 * Error thrown when a response from the server does not conform to the expected protocol.
 * @module ProtocolError
 * @category Errors
 */
export default class ProtocolError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ProtocolError";
	}
}
