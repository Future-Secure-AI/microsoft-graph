export default class NeverError extends Error {
	public constructor(message?: string) {
		super(message);
		this.name = "NeverError";
	}
}
