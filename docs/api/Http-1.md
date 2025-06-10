[Microsoft Graph SDK](README.md) / Http

# Http

HTTP models for handling HTTP requests and responses.

## Type Aliases

### HttpHeaders

> **HttpHeaders** = `object`

Defined in: [src/models/Http.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L13)

HTTP headers used in requests and responses.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content-type"></a> `content-type?` | `string` | [src/models/Http.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L15) |
| <a id="workbook-session-id"></a> `workbook-session-id?` | [`WorkbookSessionId`](WorkbookSessionId.md#workbooksessionid) | [src/models/Http.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L14) |

***

### HttpMethod

> **HttpMethod** = `"GET"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [src/models/Http.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L19)

HTTP methods used in requests.

***

### HttpPath

> **HttpPath** = `string` & `object`

Defined in: [src/models/Http.ts:22](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L22)

HTTP path used in requests

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"Path"`

***

### HttpProxy

> **HttpProxy** = `string` & `object`

Defined in: [src/models/Http.ts:27](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L27)

HTTP proxy used to route requests

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"HttpProxy"`
