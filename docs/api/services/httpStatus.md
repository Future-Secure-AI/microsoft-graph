[Microsoft Graph SDK](../modules.md) / services/httpStatus

## Functions

### isGatewayTimeout()

> **isGatewayTimeout**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:51](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L51)

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

Defined in: [src/services/httpStatus.ts:24](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L24)

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

Defined in: [src/services/httpStatus.ts:15](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L15)

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

Defined in: [src/services/httpStatus.ts:6](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L6)

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

Defined in: [src/services/httpStatus.ts:33](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L33)

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

Defined in: [src/services/httpStatus.ts:60](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L60)

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

Defined in: [src/services/httpStatus.ts:42](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/httpStatus.ts#L42)

Checks if the HTTP status code indicates the service is unavailable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 503, otherwise false.
