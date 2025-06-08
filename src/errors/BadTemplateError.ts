/**
 * Error thrown when a template did not match the expected format.
 * @module BadTemplateError
 * @category Errors
 */
export default class BadTemplateError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "BadTemplateError";
	}
}
