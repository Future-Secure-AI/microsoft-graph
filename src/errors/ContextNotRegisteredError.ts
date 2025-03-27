export default class ContextNotRegisteredError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ContextNotRegisteredError";
	}
}
