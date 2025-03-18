export default class ProtocolError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ProtocolError";
	}
}
