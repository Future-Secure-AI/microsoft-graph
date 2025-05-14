export default class TimeoutError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "TimeoutError";
	}
}
