/**
 * The specified byte range is invalid or unavailable.
 * @module RequestedRangeNotSatisfiableError
 * @category Errors
 */
export default class RequestedRangeNotSatisfiableError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestedRangeNotSatisfiableError";
	}
}
