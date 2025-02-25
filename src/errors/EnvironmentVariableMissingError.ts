export default class EnvironmentVariableMissingError extends Error {
    public constructor(env: string) {
        super(`Environment variable '${env}' not set or blank`);
        this.name = 'EnvironmentVariableMissingError';
    }
}
