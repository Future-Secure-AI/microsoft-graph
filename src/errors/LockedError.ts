/**
 * The resource that is being accessed is locked.
 * @module LockedError
 * @category Errors
 */
export default class LockedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "LockedError";
	}
}
