export default class RequestFailedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestFailedError";
	}

	public static throw(message: string, request: unknown, response?: unknown): never {
		throw new RequestFailedError(`${message}\n\nREQUEST:\n${JSON.stringify(request, null, 2)}\n\nRESPONSE:\n${response}`);
	}
}
