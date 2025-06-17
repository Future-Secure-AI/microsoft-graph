/**
 * The HTTP method in the request isn't allowed on the resource.
 * @module MethodNotAllowedError
 * @category Errors
 */
export default class MethodNotAllowedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "MethodNotAllowedError";
	}
}
