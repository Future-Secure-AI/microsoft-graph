[Microsoft Graph SDK](README.md) / userSendMail

# userSendMail

Send an email.

## Functions

### userSendMail()

> **userSendMail**(`context`, `sender`, `message`): [`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/user/userSendMail.ts:28](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/operations/user/userSendMail.ts#L28)

Send an email.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`Context`](Context-1.md#context) | Reference to the context. |
| `sender` | `null` \| `string` | The email address of the sender or NULL for the current user. Must match a valid email address in this tenant. |
| `message` | `Message` | The email message to be sent. |

#### Returns

[`GraphOperation`](GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Throws

InvalidArgumentError if the sender email address does not match the required pattern.

#### See

https://learn.microsoft.com/en-us/graph/api/user-sendmail
