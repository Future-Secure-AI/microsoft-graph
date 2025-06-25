[Microsoft Graph SDK](README.md) / operationInvoker

# operationInvoker

Invoke operations, potentially as parallel or sequential batches.

## Functions

### operation()

> **operation**\<`T`\>(`definition`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`T`\>

Defined in: [src/services/operationInvoker.ts:90](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/operationInvoker.ts#L90)

Defines a Graph operation.

Operations can be awaited to execute independently, or passed with others as arguments to [parallel](#parallel) or [sequential](#sequential) to execute as part of a batch.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The response type of the operation. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `definition` | [`GraphOperationDefinition`](GraphOperation.md#graphoperationdefinition)\<`T`\> | Definition of the Graph operation. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`T`\>

GraphOperation instance.

***

### parallel()

> **parallel**\<`T`\>(...`operations`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

Defined in: [src/services/operationInvoker.ts:109](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/operationInvoker.ts#L109)

Execute a batch of GraphAPI operations in parallel.

Provides the best performance for batch operations, however only useful if operations can logically be performed at the same time.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`GraphOperation`](GraphOperation.md#graphoperation)\<`unknown`\>[] | Tuple of GraphOperation types. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`operations` | `T` | Operations to execute in parallel. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

The responses for each operation, in the same order.

***

### sequential()

> **sequential**\<`T`\>(...`operations`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

Defined in: [src/services/operationInvoker.ts:124](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/operationInvoker.ts#L124)

Execute a batch of GraphAPI operations sequentially.

Each operation is dependent on the previous operation in the batch.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`GraphOperation`](GraphOperation.md#graphoperation)\<`unknown`\>[] | Tuple of GraphOperation types. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`operations` | `T` | Operations to execute sequentially. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

The responses for each operation, in the same order.

***

### throwException()

> **throwException**(`responseCode`, `message`): `never`

Defined in: [src/services/operationInvoker.ts:328](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/operationInvoker.ts#L328)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `responseCode` | `number` |
| `message` | `string` |

#### Returns

`never`
