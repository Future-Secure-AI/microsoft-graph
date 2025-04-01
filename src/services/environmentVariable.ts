import EnvironmentVariableMissingError from "../errors/EnvironmentVariableMissingError.ts";

/**
 * Retrieves the value of an environment variable.
 * @param env - The name of the environment variable.
 * @param fallbackValue - The fallback value to use if the environment variable is not set. Defaults to null.
 * @returns The value of the environment variable or the fallback value.
 * @throws EnvironmentVariableMissingError if the environment variable is not set and no fallback value is provided.
 */
export function getEnvironmentVariable(env: string, fallbackValue: string | null = null): unknown {
	const value = process.env[env]?.trim() ?? "";

	if (value === "") {
		if (fallbackValue === null) {
			throw new EnvironmentVariableMissingError(env);
		}
		return fallbackValue ?? "";
	}

	return value;
}

/**
 * Binds an environment variable to a function that retrieves its value.
 * @param env - The name of the environment variable.
 * @param fallbackValue - The fallback value to use if the environment variable is not set. Defaults to null.
 * @returns A function that retrieves the value of the environment variable or the fallback value.
 */
export function bindEnvironmentVariable(env: string, fallbackValue: string | null = null): () => unknown {
	return () => getEnvironmentVariable(env, fallbackValue);
}
