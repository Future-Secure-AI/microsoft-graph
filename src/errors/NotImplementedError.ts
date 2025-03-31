export default class NotImplementedError extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = "NotImplementedError";
	}
}
