[Microsoft Graph SDK](README.md) / operationInvoker

# operationInvoker

Invoke operations, potentially as parallel or sequential batches.

## Functions

### operation()

> **operation**\<`T`\>(`definition`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`T`\>

Defined in: src/services/operationInvoker.ts:38

Define a operation.

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

#### Remarks

Operations can be `await`d to execute independently, or passed with others as arguments to `parallel` or `sequential` to execute as part of a batch.

***

### parallel()

> **parallel**\<`T`\>(...`operations`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

Defined in: src/services/operationInvoker.ts:52

Execute a batch of GraphAPI operations in parallel.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* [`GraphOperation`](GraphOperation.md#graphoperation)\<`unknown`\>[] |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`operations` | `T` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

#### Remarks

Provides the best performance for batch operations, however only useful if operations can logically be performed at the same time.

***

### sequential()

> **sequential**\<`T`\>(...`operations`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>

Defined in: src/services/operationInvoker.ts:61

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

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`OperationResponse`](GraphOperation.md#operationresponse)\<`T`\>\>
