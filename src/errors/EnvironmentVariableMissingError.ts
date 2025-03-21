export default class EnvironmentVariableMissingError extends Error {
    public constructor(env: string) {
        super(`Environment variable '${env}' is not set, empty or whitespace.`);
        this.name = "EnvironmentVariableMissingError";
    }
}
