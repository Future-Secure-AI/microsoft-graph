export default class NotFoundError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}
