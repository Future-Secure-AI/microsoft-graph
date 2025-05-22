export default class InvalidOperationError extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = "InvalidOperationError";
	}
}
