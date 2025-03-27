export default class InconsistentContextError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "InconsistentContextError";
	}
}
