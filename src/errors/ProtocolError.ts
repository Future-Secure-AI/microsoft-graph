export default class ProtocolError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ProtocolError";
	}

	public static throwIfFalsy(value: unknown, message: string): void {
		if (!value) {
			throw new ProtocolError(message);
		}
	}
}
