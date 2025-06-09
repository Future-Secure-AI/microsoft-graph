[Microsoft Graph SDK](README.md) / httpStatus

Utilities for analyzing HTTP status codes for Microsoft Graph API responses.

## Functions

### isGatewayTimeout()

> **isGatewayTimeout**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:57](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L57)

Checks if the HTTP status code indicates a gateway has timed out.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 504, otherwise false.

***

### isHttpNotFound()

> **isHttpNotFound**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L30)

Checks if the HTTP status code indicates not found.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 404, otherwise false.

***

### isHttpOk()

> **isHttpOk**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L21)

Checks if the HTTP status code is OK

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 200, otherwise false.

***

### isHttpSuccess()

> **isHttpSuccess**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L12)

Checks if the HTTP status code indicates a successful response.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is in the range 200-299, otherwise false.

***

### isHttpTooManyRequests()

> **isHttpTooManyRequests**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L39)

Checks if the HTTP status code indicates too many requests (rate limiting).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 429, otherwise false.

***

### isLocked()

> **isLocked**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:66](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L66)

Checks if the HTTP status code indicates the resource is locked

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 423, otherwise false.

***

### isServiceUnavailable()

> **isServiceUnavailable**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L48)

Checks if the HTTP status code indicates the service is unavailable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 503, otherwise false.
