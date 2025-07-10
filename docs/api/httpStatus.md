[Microsoft Graph SDK](README.md) / httpStatus

# httpStatus

Utilities for analyzing HTTP status codes for Microsoft Graph API responses.

## Functions

### isHttpBadGateway()

> **isHttpBadGateway**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:255](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L255)

Checks if the HTTP status code indicates a bad gateway.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 502, otherwise false.

***

### isHttpBadRequest()

> **isHttpBadRequest**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:84](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L84)

Checks if the HTTP status code indicates a bad request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 400, otherwise false.

***

### isHttpBandwidthLimitExceeded()

> **isHttpBandwidthLimitExceeded**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:219](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L219)

Checks if the HTTP status code indicates bandwidth limit exceeded.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 509, otherwise false.

***

### isHttpConflict()

> **isHttpConflict**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:138](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L138)

Checks if the HTTP status code indicates a conflict.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 409, otherwise false.

***

### isHttpCreated()

> **isHttpCreated**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L30)

Checks if the HTTP status code is created

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 201, otherwise false.

***

### isHttpForbidden()

> **isHttpForbidden**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:111](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L111)

Checks if the HTTP status code indicates forbidden access.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 403, otherwise false.

***

### isHttpGatewayTimeout()

> **isHttpGatewayTimeout**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:66](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L66)

Checks if the HTTP status code indicates a gateway has timed out.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 504, otherwise false.

***

### isHttpGone()

> **isHttpGone**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:147](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L147)

Checks if the HTTP status code indicates gone.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 410, otherwise false.

***

### isHttpInsufficientStorage()

> **isHttpInsufficientStorage**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:210](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L210)

Checks if the HTTP status code indicates insufficient storage.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 507, otherwise false.

***

### isHttpInternalServerError()

> **isHttpInternalServerError**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:228](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L228)

Checks if the HTTP status code indicates internal server error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 500, otherwise false.

***

### isHttpLengthRequired()

> **isHttpLengthRequired**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:156](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L156)

Checks if the HTTP status code indicates length required.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 411, otherwise false.

***

### isHttpLocked()

> **isHttpLocked**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:75](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L75)

Checks if the HTTP status code indicates the resource is locked

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 423, otherwise false.

***

### isHttpMethodNotAllowed()

> **isHttpMethodNotAllowed**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:120](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L120)

Checks if the HTTP status code indicates method not allowed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 405, otherwise false.

***

### isHttpNotAcceptable()

> **isHttpNotAcceptable**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:129](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L129)

Checks if the HTTP status code indicates not acceptable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 406, otherwise false.

***

### isHttpNotFound()

> **isHttpNotFound**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:39](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L39)

Checks if the HTTP status code indicates not found.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 404, otherwise false.

***

### isHttpNotImplemented()

> **isHttpNotImplemented**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:237](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L237)

Checks if the HTTP status code indicates not implemented.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 501, otherwise false.

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

### isHttpPaymentRequired()

> **isHttpPaymentRequired**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:102](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L102)

Checks if the HTTP status code indicates payment required.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 402, otherwise false.

***

### isHttpPreconditionFailed()

> **isHttpPreconditionFailed**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:165](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L165)

Checks if the HTTP status code indicates precondition failed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 412, otherwise false.

***

### isHttpRequestedRangeNotSatisfiable()

> **isHttpRequestedRangeNotSatisfiable**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:192](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L192)

Checks if the HTTP status code indicates requested range not satisfiable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 416, otherwise false.

***

### isHttpRequestEntityTooLarge()

> **isHttpRequestEntityTooLarge**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:174](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L174)

Checks if the HTTP status code indicates request entity too large.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 413, otherwise false.

***

### isHttpRequestTimeout()

> **isHttpRequestTimeout**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:246](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L246)

Checks if the HTTP status code indicates a request timeout.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 408, otherwise false.

***

### isHttpServiceUnavailable()

> **isHttpServiceUnavailable**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:57](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L57)

Checks if the HTTP status code indicates the service is unavailable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 503, otherwise false.

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

Defined in: [src/services/httpStatus.ts:48](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L48)

Checks if the HTTP status code indicates too many requests (rate limiting).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 429, otherwise false.

***

### isHttpUnauthorized()

> **isHttpUnauthorized**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:93](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L93)

Checks if the HTTP status code indicates unauthorized access.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 401, otherwise false.

***

### isHttpUnprocessableEntity()

> **isHttpUnprocessableEntity**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:201](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L201)

Checks if the HTTP status code indicates unprocessable entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 422, otherwise false.

***

### isHttpUnsupportedMediaType()

> **isHttpUnsupportedMediaType**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:183](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L183)

Checks if the HTTP status code indicates unsupported media type.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is 415, otherwise false.

***

### isRetryable()

> **isRetryable**(`status`): `boolean`

Defined in: [src/services/httpStatus.ts:265](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/httpStatus.ts#L265)

Checks if the HTTP status code is considered retryable.
Retryable status codes typically indicate a temporary condition.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | `number` | The HTTP status code. |

#### Returns

`boolean`

True if the status code is retryable, otherwise false.
