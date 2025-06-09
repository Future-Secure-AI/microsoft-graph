[Microsoft Graph SDK](../README.md) / services/templatedPaths

## Functions

### generatePath()

> **generatePath**(`template`, `args`): [`HttpPath`](../Http.md#httppath)

Defined in: [src/services/templatedPaths.ts:14](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/templatedPaths.ts#L14)

Generates a HTTP path based on a template and arguments. Arguments are automatically escaped.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `template` | `string` | The path template, which must start with a slash. |
| `args` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> | Record of arguments to replace placeholders in the template. |

#### Returns

[`HttpPath`](../Http.md#httppath)

The generated Graph API path.

#### Throws

BadTemplateError if the template is invalid or required arguments are missing.
