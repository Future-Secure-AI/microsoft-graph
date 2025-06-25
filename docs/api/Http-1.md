[Microsoft Graph SDK](README.md) / Http

# Http

HTTP models for handling HTTP requests and responses.

## Type Aliases

### HttpHeaders

> **HttpHeaders** = `object`

Defined in: [src/models/Http.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L12)

HTTP headers used in requests and responses.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="content-type"></a> `content-type?` | `string` | [src/models/Http.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L14) |
| <a id="workbook-session-id"></a> `workbook-session-id?` | [`WorkbookSessionId`](WorkbookSession.md#workbooksessionid) | [src/models/Http.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L13) |

***

### HttpMethod

> **HttpMethod** = `"GET"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

Defined in: [src/models/Http.ts:18](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L18)

HTTP methods used in requests.

***

### HttpPath

> **HttpPath** = `string` & `object`

Defined in: [src/models/Http.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L21)

HTTP path used in requests

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"Path"`

***

### HttpProxy

> **HttpProxy** = `string` & `object`

Defined in: [src/models/Http.ts:26](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/Http.ts#L26)

HTTP proxy used to route requests

#### Type declaration

##### \_\_brand

> **\_\_brand**: `"HttpProxy"`
