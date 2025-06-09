[Microsoft Graph SDK](README.md) / sleep

# sleep

Utility for pausing execution (sleep) in async workflows.

## Functions

### sleep()

> **sleep**(`ms`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [src/services/sleep.ts:12](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/sleep.ts#L12)

Pauses execution for the specified number of milliseconds.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ms` | `number` | Number of milliseconds to sleep. |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

A promise that resolves after the specified time.
