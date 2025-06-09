[Microsoft Graph SDK](README.md) / environmentVariable

Utilities for accessing environment variables with error handling and fallbacks.

## Functions

### bindEnvironmentVariable()

> **bindEnvironmentVariable**(`env`, `fallbackValue`): () => `unknown`

Defined in: [src/services/environmentVariable.ts:35](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/environmentVariable.ts#L35)

Binds an environment variable to a function that retrieves its value.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `env` | `string` | `undefined` | Name of the environment variable. |
| `fallbackValue` | `null` \| `string` | `null` | The fallback value to use if the environment variable is not set. Defaults to null. |

#### Returns

A function that retrieves the value of the environment variable or the fallback value.

> (): `unknown`

##### Returns

`unknown`

***

### getEnvironmentVariable()

> **getEnvironmentVariable**(`env`, `fallbackValue`): `unknown`

Defined in: [src/services/environmentVariable.ts:16](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/environmentVariable.ts#L16)

Retrieves the value of an environment variable.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `env` | `string` | `undefined` | Name of the environment variable. |
| `fallbackValue` | `null` \| `string` | `null` | The fallback value to use if the environment variable is not set. Defaults to null. |

#### Returns

`unknown`

The value of the environment variable or the fallback value.

#### Throws

EnvironmentVariableMissingError if the environment variable is not set and no fallback value is provided.
