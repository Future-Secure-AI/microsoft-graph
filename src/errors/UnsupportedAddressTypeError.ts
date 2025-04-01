export default class UnsupportedAddressTypeError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "UnsupportedAddressTypeError";
	}
}
