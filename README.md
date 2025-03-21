# Microsoft Graph SDK
## Overview
This is a SDK to allow access to Microsoft's Graph API, particularly for the use with Sharepoint. It is not fully featured, and does rely on each operation being added as it's needed.

## Justification/Approach
Why not just use the default SDK for this? Well - there isn't really one. Sure, there is [`@microsoft/microsoft-graph-client`](https://www.npmjs.com/package/@microsoft/microsoft-graph-client), however it's thin and doesn't define 
individual methods we can call. And there's also [`msgraph-typescript-typings`](https://github.com/microsoftgraph/msgraph-typescript-typings) which defines 
the models, however nothing appears to exist to pull these basic concepts together into a SDK.

This project takes `msgraph-typescript-typings` DTOs, injects strongly typed IDs in them and adds a simple (hopefully elegant) layer that allows individual operations to be added.

## Key concepts
GraphAPI exposes a set of operations. This SDK has a series of `operations` defined that maps to this API. If we want to do some rich manipulation of those operations we use a `task`.

When using the SDK you can use low-level operations directly (ie `createWorkbookSession`) or you can use higher-level opinionated tasks (ie `createWorkbookAndOpenSessionAndGetRef`). The opinionated tasks are useful for quick development, however they include assumptions that may not match your circumstance, and also do not lend themselves to optimizations like parallel requesting. You choose what works for you, and you can mix-and-match both.

## Usage
First up, make sure the environment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` are set.

Then make calls:

```typescript
const cells = await getWorkbookUsedRange({
    siteId: args.siteId,
    driveId: args.driveId,
    itemId: args.itemId,
    worksheetId: args.worksheetId,
});
```

While performance is not a primary concern for this SDK, it does support a couple of pieces to allow for faster development iteration. Sessions dramatically improves worksheet speed:

```typescript
const workbookRef: WorkbookRef = {
    siteId: args.siteId,
    driveId: args.driveId,
    itemId: args.itemId,
};

const session = await createWorkbookSession(workbookRef);

const worksheetRef: WorkbookWorksheetRef = {
    ...workbookRef,
    worksheetId: args.worksheetId,
    sessionId: session.id,
}

const cells = await getWorkbookUsedRange(worksheetRef);

await closeWorkbookSession(workbookRef);

console.info(cells.values);
```

Batching improves the speed of all operations, allowing them to be performed in a single request to the server, and indeed in parallel. To do this use `parallel` or `sequential`

```typescript
const [cells, _, __] = await parallel(
    getWorkbookUsedRangeValues({
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

## Gotchas
Workbooks don't necessarily update their values immediately. When writing and reading quickly, you need an explicit `calculateWorkbook`, otherwise reads may not include prior writes.

```typescript
await updateWorkbookRange(rangeRef, { values: values });
await calculateWorkbook(workbookRef); // IMPORTANT!!
const usedRange = await getWorkbookUsedRange(worksheetRef);
```

The same applies to the batch version of this.
```typescript
 const [_, __, usedRange] = await sequential(
    updateWorkbookRange(rangeRef, {
        values: values
    }),
    calculateWorkbook(workbookRef), // IMPORTANT!!
    getWorkbookUsedRange(worksheetRef)
);
```
