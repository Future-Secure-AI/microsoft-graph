# Microsoft Graph integration
## Overview
This is a SDK to allow access to Microsoft's Graph API, particularly for the use with Sharepoint. It is not fully featured, and does rely on each method being added as it's needed.

## Justification/Approach
Why not just use the default SDK for this? Well - there isn't really one. Sure, there is [`@microsoft/microsoft-graph-client`](https://www.npmjs.com/package/@microsoft/microsoft-graph-client), however it's thin and doesn't define 
individual methods we can call. And there's also [`msgraph-typescript-typings`](https://github.com/microsoftgraph/msgraph-typescript-typings) which defines 
the models, however nothing appears to exist to pull these basic concepts together into a SDK.

Since we're trying to do the minimum amount of effort, this project takes `msgraph-typescript-typings` injects strongly typed IDs and adds a simple (hopefully elegant) layer that allows individual methods to be added.

## Usage
First up, make sure the enviuronment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` are set.

Then make calls:

```typescript
const [cells] = await execute(getUsedRangeValues({
    siteId: args.siteId,
    driveId: args.driveId,
    itemId: args.itemId,
    worksheetId: args.worksheetId,
}));
```

While performance is not a primary concern for this SDK, it does support a couple of pieces to allow for faster development iteration. Sessions dramatically improves worksheet speed:

```typescript
const workbookRef: WorkbookRef = {
    siteId: args.siteId,
    driveId: args.driveId,
    itemId: args.itemId,
};

const [session] = await execute(createWorkbookSession(workbookRef));

const worksheetRef: WorkbookWorksheetRef = {
    ...workbookRef,
    worksheetId: args.worksheetId,
    sessionId: session.id,
}

const [cells] = await execute(getWorkbookUsedRange(worksheetRef));

await closeWorkbookSession(workbookRef);

console.info(cells.values);
```

Batching improves the speed of all operations, allowing them to be performed in a single request to the server, and indeed in parallel:

```typescript
const [cells, _, __] = await execute(
    getUsedRangeValues({
        siteId: args.siteId,
        driveId: args.driveId,
        itemId: args.itemId,
        worksheetId: args.worksheetId,
    }),
    updateWorkbookRange(
        {
            iteId: args.siteId,
            driveId: args.driveId,
            itemId: args.itemId,
            worksheetId: args.worksheetId,
            address: "A1"
        },
        {
            values: [["cake"]]
        }
    ),
    deleteDriveItem({
        siteId: args.siteId,
        driveId: args.driveId,
        itemId: args.itemId,
    }),
    // etc...
);
```

That's it!

## Extending
This is not a fully-featured SDK. Only methods that have been required so far have been implemented, so you probably will need to add new ones. **Please feel free to do this**, however be sure to follow the existing pattern.

## Regenerating models
Models are imported from `msgraph-typescript-typings` with some fixes and strongly typed IDs injected. To update the models with the latest run this command: `npx tsx regenerate-models.ts`