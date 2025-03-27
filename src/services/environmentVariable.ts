import EnvironmentVariableMissingError from "../errors/EnvironmentVariableMissingError.ts";

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

export function bindEnvironmentVariable(env: string, fallbackValue: string | null = null): () => unknown {
	return () => getEnvironmentVariable(env, fallbackValue);
}
