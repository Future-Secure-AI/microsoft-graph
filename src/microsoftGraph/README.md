# Microsoft Graph integration
## Overview
Microsoft's Graph API is pretty good. It's extensive, powerful, and pretty well designed. Graph however doesn't have a complete client SDK available for though. 
Sure, there is [`@microsoft/microsoft-graph-client`](https://www.npmjs.com/package/@microsoft/microsoft-graph-client), however it's thin and doesn't define 
individual methods we can call. And there's also [`msgraph-typescript-typings`](https://github.com/microsoftgraph/msgraph-typescript-typings) which defines 
the models, however nothing appears to exist to pull these basic concepts together into a SDK.

So what you find here is just that - `@microsoft/microsoft-graph-client` glued to `msgraph-typescript-typings`, with some strongly typed IDs injected to make it hard to make mistakes.

## Usage

1) Make sure the enviuronment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` are set.
2) Make whatever calls you need. See `drive.ts` and `workbook.ts` for a list of whats available

```typescript
// Make sure the envs `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` are set.
const cells = await getUsedRangeValues({
    site: args.siteId,
    drive: args.driveId,
    item: args.itemId,
    worksheet: args.worksheetName,
});
```

That's it!

## Extending
This is not a fully-featured SDK. Only methods that have been required so far have been implemented, so you probably will need to add new ones. **Please feel free to do this**, however be sure to follow the existing pattern.