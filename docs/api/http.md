[Microsoft Graph SDK](README.md) / http

# http

HTTP request utilities for Microsoft Graph API, with proxy support.

## Type Aliases

### Request

> **Request** = `object`

Defined in: [src/services/http.ts:68](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L68)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="data"></a> `data?` | `unknown` | [src/services/http.ts:72](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L72) |
| <a id="headers"></a> `headers?` | `RawAxiosRequestHeaders` | [src/services/http.ts:71](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L71) |
| <a id="method"></a> `method` | [`HttpMethod`](Http-1.md#httpmethod) | [src/services/http.ts:70](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L70) |
| <a id="responsetype"></a> `responseType?` | `ResponseType` | [src/services/http.ts:73](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L73) |
| <a id="url"></a> `url` | `string` | [src/services/http.ts:69](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L69) |

## Functions

### execute()

> **execute**\<`TResponse`\>(`request`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`TResponse`\>

Defined in: [src/services/http.ts:76](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L76)

#### Type Parameters

| Type Parameter |
| ------ |
| `TResponse` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | [`Request`](#request) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`TResponse`\>

***

### executeRaw()

> **executeRaw**(`request`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`AxiosResponse`\<`any`, `any`\>\>

Defined in: [src/services/http.ts:204](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L204)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `request` | [`Request`](#request) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`AxiosResponse`\<`any`, `any`\>\>

***

### throwHttpException()

> **throwHttpException**(`responseCode`, `message`): `never`

Defined in: [src/services/http.ts:128](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/http.ts#L128)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `responseCode` | `number` |
| `message` | `string` |

#### Returns

`never`
