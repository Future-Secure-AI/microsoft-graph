import { isHttpOk } from "../services/httpStatus.ts";

export default class RequestFailedError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "RequestFailedError";
	}

	public static throwIfNotOkBatch(status: number, ops: unknown, error: unknown): void {
		if (!isHttpOk(status)) {
			throw new RequestFailedError(`GraphAPI batch failed with HTTP ${status}\nOperation: ${JSON.stringify(ops, null, 2)}\nError: ${JSON.stringify(error, null, 2)}}`);
		}
	}

	public static throwIfNotOkOperation(status: number, index: number, op: unknown, error: unknown): void {
		if (!isHttpOk(status)) {
			throw new RequestFailedError(`GraphAPI operation ${index} failed with HTTP ${status}\nOperation: ${JSON.stringify(op, null, 2)}\nError: ${JSON.stringify(error, null, 2)}}`);
		}
	}
}
