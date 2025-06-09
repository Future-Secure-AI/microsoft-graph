/**
 * Error thrown when a required environment variable is not set, empty or whitespace.
 * @module EnvironmentVariableMissingError
 * @category Errors
 */
export default class EnvironmentVariableMissingError extends Error {
	public constructor(env: string) {
		super(`Environment variable '${env}' is not set, empty or whitespace.`);
		this.name = "EnvironmentVariableMissingError";
	}
}
