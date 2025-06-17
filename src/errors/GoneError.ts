/**
 * The requested resource is no longer available at the server.
 * @module GoneError
 * @category Errors
 */
export default class GoneError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "GoneError";
	}
}
