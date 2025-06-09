/**
 * Error thrown when path template did not match the expected format.
 * @module BadTemplateError
 * @category Errors
 */
export default class BadPathTemplateError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "BadPathTemplateError";
	}
}
