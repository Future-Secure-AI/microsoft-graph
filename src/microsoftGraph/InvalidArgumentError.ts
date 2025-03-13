export default class InvalidArgumentError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "InvalidArgumentError";
	}
}
