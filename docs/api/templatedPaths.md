[Microsoft Graph SDK](README.md) / templatedPaths

Utilities for generating and parsing templated HTTP paths.

## Functions

### generatePath()

> **generatePath**(`template`, `args`): [`HttpPath`](Http-1.md#httppath)

Defined in: [src/services/templatedPaths.ts:20](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/templatedPaths.ts#L20)

Generates a HTTP path based on a template and arguments. Arguments are automatically escaped.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `template` | `string` | The path template, which must start with a slash. |
| `args` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> | Record of arguments to replace placeholders in the template. |

#### Returns

[`HttpPath`](Http-1.md#httppath)

The generated Graph API path.

#### Throws

BadTemplateError if the template is invalid or required arguments are missing.
