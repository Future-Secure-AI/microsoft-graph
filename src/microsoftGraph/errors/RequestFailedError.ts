export default class RequestFailedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestFailedError";
	}
}
