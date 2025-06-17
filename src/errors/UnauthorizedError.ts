/**
 * Required authentication information is either missing or not valid for the resource.
 * @module UnauthorizedError
 * @category Errors
 */
export default class UnauthorizedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "UnauthorizedError";
	}
}
