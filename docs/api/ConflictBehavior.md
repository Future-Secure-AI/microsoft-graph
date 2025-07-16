[Microsoft Graph SDK](README.md) / ConflictBehavior

# ConflictBehavior

Conflict behavior options.

## Type Aliases

### ConflictBehavior

> **ConflictBehavior** = `"fail"` \| `"replace"` \| `"rename"`

Defined in: [src/models/ConflictBehavior.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/models/ConflictBehavior.ts#L13)

What to do if a file/folder with the same name already exists.
- "fail": Throw an error if the item already exists.
- "replace": Replace the existing item with the new one.
- "rename": Rename the new item to avoid conflict.
