[Microsoft Graph SDK](../modules.md) / models/GraphOperation

## Type Aliases

### GraphHeaders

> **GraphHeaders** = `object`

Defined in: [src/models/GraphOperation.ts:6](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L6)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content-type"></a> `content-type?` | `string` | [src/models/GraphOperation.ts:8](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L8) |
| <a id="workbook-session-id"></a> `workbook-session-id?` | [`WorkbookSessionId`](WorkbookSessionId.md#workbooksessionid) | [src/models/GraphOperation.ts:7](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L7) |

***

### GraphMethod

> **GraphMethod** = `"GET"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [src/models/GraphOperation.ts:4](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L4)

***

### GraphOperation\<T\>

> **GraphOperation**\<`T`\> = [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`T`\> & `object`

Defined in: [src/models/GraphOperation.ts:27](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L27)

#### Type declaration

##### definition

> **definition**: [`GraphOperationDefinition`](#graphoperationdefinition)\<`T`\>

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

***

### GraphOperationDefinition\<T\>

> **GraphOperationDefinition**\<`T`\> = `object`

Defined in: [src/models/GraphOperation.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L12)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `unknown` | JSON object or a base64 URL-encoded value, for example, when the body is an image. When a body is included with the request, the headers object must contain a value for Content-Type. | [src/models/GraphOperation.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L22) |
| <a id="context"></a> `context` | [`Context`](Context.md#context) | Context to match the operation to. Used for authentication etc. | [src/models/GraphOperation.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L14) |
| <a id="headers"></a> `headers` | [`GraphHeaders`](#graphheaders) | HTTP headers to be used. When the body is supplied, a Content-Type header must be included. | [src/models/GraphOperation.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L20) |
| <a id="method"></a> `method` | [`GraphMethod`](#graphmethod) | HTTP method to be used. | [src/models/GraphOperation.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L16) |
| <a id="path"></a> `path` | [`GraphPath`](#graphpath) | Relative resource URL for the individual request. Ie, if the absolute URL is `https://graph.microsoft.com/v1.0/users`, this path is `/users`. | [src/models/GraphOperation.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L18) |
| <a id="responsetransform"></a> `responseTransform` | (`response`) => `T` | Translate the server response into a usable model | [src/models/GraphOperation.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L24) |

***

### GraphPath

> **GraphPath** = `string` & `object`

Defined in: [src/models/GraphOperation.ts:5](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/GraphOperation.ts#L5)

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"Path"`
