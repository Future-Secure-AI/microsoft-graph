[Microsoft Graph SDK](README.md) / graphApi

## Variables

### batchEndpoint

> `const` **batchEndpoint**: `"https://graph.microsoft.com/v1.0/$batch"`

Defined in: [src/graphApi.ts:17](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/graphApi.ts#L17)

***

### endpoint

> `const` **endpoint**: `"https://graph.microsoft.com/v1.0"` = `"https://graph.microsoft.com/v1.0"`

Defined in: [src/graphApi.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/graphApi.ts#L16)

## Functions

### operation()

> **operation**\<`T`\>(`definition`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`T`\>

Defined in: [src/graphApi.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/graphApi.ts#L20)

Define a operation, which can either be `await`d to execute independently, or passed with other operations ot `parallel` or `sequential` to execute as part of a batch.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | [`GraphOperationDefinition`](GraphOperation.md#graphoperationdefinition)\<`T`\> |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`T`\>

***

### parallel()

> **parallel**\<`T`\>(...`operations`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](models/OperationResponse.md#operationresponse)\<`T`\>\>

Defined in: [src/graphApi.ts:31](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/graphApi.ts#L31)

Execute a batch of GraphAPI operations in parallel. Provides the best performance for batch operations, however only useful if operations can logically be performed at the same time.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`GraphOperation`](GraphOperation.md#graphoperation)\<`unknown`\>[] |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`operations` | `T` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](models/OperationResponse.md#operationresponse)\<`T`\>\>

***

### sequential()

> **sequential**\<`T`\>(...`operations`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](models/OperationResponse.md#operationresponse)\<`T`\>\>

Defined in: [src/graphApi.ts:38](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/graphApi.ts#L38)

Execute a batch of GraphAPI operations sequentially.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`GraphOperation`](GraphOperation.md#graphoperation)\<`unknown`\>[] |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`operations` | `T` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](models/OperationResponse.md#operationresponse)\<`T`\>\>
