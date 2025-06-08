[Microsoft Graph SDK](../../modules.md) / operations/user/userSendMail

## Functions

### userSendMail()

> **userSendMail**(`context`, `sender`, `message`): [`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Defined in: [src/operations/user/userSendMail.ts:21](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/operations/user/userSendMail.ts#L21)

Send an email.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`Context`](../../models/Context.md#context) | A reference to the context. |
| `sender` | `null` \| `string` | The email address of the sender or NULL for the current user. Must match a valid email address in this tenant. |
| `message` | `Message` | The email message to be sent. |

#### Returns

[`GraphOperation`](../../models/GraphOperation.md#graphoperation)\<`void`\>

Nothing.

#### Throws

InvalidArgumentError if the sender email address does not match the required pattern.

#### See

https://learn.microsoft.com/en-us/graph/api/user-sendmail
