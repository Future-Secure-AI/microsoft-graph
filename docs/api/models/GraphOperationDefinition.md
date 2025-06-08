[Microsoft Graph SDK](../README.md) / models/GraphOperationDefinition

## Type Aliases

### GraphHeaders

> **GraphHeaders** = `object`

Defined in: [src/models/GraphOperationDefinition.ts:5](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L5)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content-type"></a> `content-type?` | `"application/json"` \| `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"` | [src/models/GraphOperationDefinition.ts:7](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L7) |
| <a id="workbook-session-id"></a> `workbook-session-id?` | [`WorkbookSessionId`](WorkbookSessionId.md#workbooksessionid) | [src/models/GraphOperationDefinition.ts:6](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L6) |

***

### GraphMethod

> **GraphMethod** = `"GET"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [src/models/GraphOperationDefinition.ts:3](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L3)

***

### GraphOperationDefinition\<T\>

> **GraphOperationDefinition**\<`T`\> = `object`

Defined in: [src/models/GraphOperationDefinition.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L12)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `unknown` | JSON object or a base64 URL-encoded value, for example, when the body is an image. When a body is included with the request, the headers object must contain a value for Content-Type. | [src/models/GraphOperationDefinition.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L20) |
| <a id="headers"></a> `headers` | [`GraphHeaders`](#graphheaders) | HTTP headers to be used. When the body is supplied, a Content-Type header must be included. | [src/models/GraphOperationDefinition.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L18) |
| <a id="method"></a> `method` | [`GraphMethod`](#graphmethod) | HTTP method to be used. | [src/models/GraphOperationDefinition.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L14) |
| <a id="path"></a> `path` | [`GraphPath`](#graphpath) | Relative resource URL for the individual request. Ie, if the absolute URL is `https://graph.microsoft.com/v1.0/users`, this path is `/users`. | [src/models/GraphOperationDefinition.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L16) |

***

### GraphPath

> **GraphPath** = `string` & `object`

Defined in: [src/models/GraphOperationDefinition.ts:4](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/GraphOperationDefinition.ts#L4)

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"Path"`
