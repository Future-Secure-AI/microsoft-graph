[Microsoft Graph SDK](../modules.md) / services/environmentVariable

## Functions

### bindEnvironmentVariable()

> **bindEnvironmentVariable**(`env`, `fallbackValue`): () => `unknown`

Defined in: [src/services/environmentVariable.ts:29](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/environmentVariable.ts#L29)

Binds an environment variable to a function that retrieves its value.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `env` | `string` | `undefined` | The name of the environment variable. |
| `fallbackValue` | `null` \| `string` | `null` | The fallback value to use if the environment variable is not set. Defaults to null. |

#### Returns

A function that retrieves the value of the environment variable or the fallback value.

> (): `unknown`

##### Returns

`unknown`

***

### getEnvironmentVariable()

> **getEnvironmentVariable**(`env`, `fallbackValue`): `unknown`

Defined in: [src/services/environmentVariable.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/services/environmentVariable.ts#L10)

Retrieves the value of an environment variable.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `env` | `string` | `undefined` | The name of the environment variable. |
| `fallbackValue` | `null` \| `string` | `null` | The fallback value to use if the environment variable is not set. Defaults to null. |

#### Returns

`unknown`

The value of the environment variable or the fallback value.

#### Throws

EnvironmentVariableMissingError if the environment variable is not set and no fallback value is provided.
