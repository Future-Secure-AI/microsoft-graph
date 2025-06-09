[Microsoft Graph SDK](README.md) / GraphOperation

# GraphOperation

An atomic operation to be performed against the Microsoft Graph API.

## Type Aliases

### GraphOperation\<T\>

> **GraphOperation**\<`T`\> = [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`T`\> & `object`

Defined in: [src/models/GraphOperation.ts:33](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L33)

Instance of an operation to be performed against the Microsoft Graph API.

#### Type declaration

##### definition

> **definition**: [`GraphOperationDefinition`](#graphoperationdefinition)\<`T`\>

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response from the operation. |

***

### GraphOperationDefinition\<T\>

> **GraphOperationDefinition**\<`T`\> = `object`

Defined in: [src/models/GraphOperation.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L14)

Definition of an operation to be performed against the Microsoft Graph API.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the response from the operation. |

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `unknown` | JSON object or a base64 URL-encoded value, for example, when the body is an image. When a body is included with the request, the headers object must contain a value for Content-Type. | [src/models/GraphOperation.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L24) |
| <a id="context"></a> `context` | [`Context`](Context-1.md#context) | Context to match the operation to. Used for authentication etc. | [src/models/GraphOperation.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L16) |
| <a id="headers"></a> `headers` | [`HttpHeaders`](Http-1.md#httpheaders) | HTTP headers to be used. When the body is supplied, a Content-Type header must be included. | [src/models/GraphOperation.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L22) |
| <a id="method"></a> `method` | [`HttpMethod`](Http-1.md#httpmethod) | HTTP method to be used. | [src/models/GraphOperation.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L18) |
| <a id="path"></a> `path` | [`HttpPath`](Http-1.md#httppath) | Relative resource URL for the individual request. Ie, if the absolute URL is `https://graph.microsoft.com/v1.0/users`, this path is `/users`. | [src/models/GraphOperation.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L20) |
| <a id="responsetransform"></a> `responseTransform` | (`response`) => `T` | Translate the server response into a usable model | [src/models/GraphOperation.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L26) |

***

### OperationResponse\<T\>

> **OperationResponse**\<`T`\> = `{ [K in keyof T]: T[K] extends GraphOperation<infer R> ? R : never }`

Defined in: [src/models/GraphOperation.ts:41](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperation.ts#L41)

Response from a batch of Graph operations.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the operations in the batch. |
