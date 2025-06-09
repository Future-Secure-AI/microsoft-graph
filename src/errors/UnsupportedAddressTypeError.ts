/**
 * Error thrown when a given address does not confirm to any known address type.
 * @module UnsupportedAddressTypeError
 * @category Errors
 */
export default class UnsupportedAddressTypeError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "UnsupportedAddressTypeError";
	}
}
