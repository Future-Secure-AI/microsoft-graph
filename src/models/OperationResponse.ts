import type { GraphOperation } from "./GraphOperation.ts";

export type OperationResponse<T> = {
	[K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never;
};
