[Microsoft Graph SDK](../README.md) / models/OperationResponse

## Type Aliases

### OperationResponse\<T\>

> **OperationResponse**\<`T`\> = `{ [K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never }`

Defined in: src/models/OperationResponse.ts:3

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
