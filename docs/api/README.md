# Microsoft Graph SDK
## Overview
This is an extensible library that allows access to Microsoft's GraphAPI, including (but not only) Sharepoint's API. It currently supports the most common operations, with more being added over time.

ℹ️ This is a THIRD PARTY library and not associated with Microsoft.

## Usage
Install the NPM package `npm i microsoft-graph`, then:

```typescript
// Get a reference to a drive you want to work with
const contextRef = createClientSecretContext(tenantId, clientId, clientSecret);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);

// Create a folder
const folder = await createFolder(driveRef, "folder-name");

// Create a workbook and start a session on it
const workbook = await createWorkbookAndStartSession(folder, "workbook-name");

// Get a worksheet
const workbook = await getWorkbookWorksheetByName(workbook, "Sheet1");

// OR this cheat to get the default sheet for a newly-created book
const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);

// Write values to a range
const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");
await setWorkbookRangeValues(rangeRef, [
	[1, 2],
	[3, 4],
	[5, 6],
]);

// Read values from a range
for await (const rowValues of iterateWorkbookRangeValues(rangeRef)) {
	// This automatically uses multiple requests if the range is too big for a single request
	debug(` ${rowValues}`);
}

// List files
for (const item of await listDriveItems(folder)) {
	console.debug(` - ${item.name}`);
}

// Cleanup
await safeDeleteWorkbook(workbook); // Closes session and waits for unlock
await deleteDriveItem(folder);
```

From here, have a look at:
* [`/docs`](https://github.com/ProspectSafe/microsoft-graph/tree/main/docs) for more general documentation and advice.
* [`/src/operations`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/operations) for other supported GraphAPI operations.
* [`/src/tasks`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/tasks) for supported tasks that make use of multiple operations. 
* [`/src/services`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/services) for a bunch of helpers that make life generally easier.

That's it!

## Extension
If you require more operations you can either raise an [issue](https://github.com/ProspectSafe/microsoft-graph/issues), or [raise a pull-request](_media/CONTRIBUTING.md).
