# Microsoft Graph SDK
## Overview
This is an extensible library that allows access to Microsoft's GraphAPI, including (but not only) Sharepoint's API. It currently supports the most common operations, with more being added over time.

Note that this is a THIRD PARTY library and not associated with Microsoft.

## Breaking changes
2.15.0 has a path change for `listDriveItems`. It's now in `tasks/listDriveItems`. This is part of a fix that prevented `listDriveItems` from returning the first 200 items only.

## Usage
Install the NPM package `npm i microsoft-graph`, then:

### Prepare configuration
Something like this, but whatever works in your context.

```typescript
const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as TenantId;
const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as ClientId;
const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as ClientSecret;
const siteId = getEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID") as SiteId;
const driveId = getEnvironmentVariable("SHAREPOINT_DEFAULT_DRIVE_ID") as DriveId;
```

### Get reference to drive
```typescript
const contextRef = register(tenantId, clientId, clientSecret);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);
```

### Create folder
```typescript
const folder = await createFolder(driveRef, "folder-name");
```

### Create workbook
```typescript
const workbook = await createWorkbookAndStartSession(folder, "workbook-name");
```

## Getting worksheet
```typescript
const workbook = await getWorkbookWorksheetByName(workbook, "Sheet1");

// OR this cheat to get the default sheet for a newly-created book
const worksheetRef = createDefaultWorkbookWorksheetRef(workbook);
```

### Writing values to a range
```typescript
const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");
await setWorkbookRangeValues(rangeRef, [
	[1, 2],
	[3, 4],
	[5, 6],
]);
```

### Reading values from a range
```typescript
for await (const rowValues of iterateWorkbookRangeValues(rangeRef)) {
	// This automatically uses multiple requests if the range is too big for a single request
	debug(` ${rowValues}`);
}
```

### List files
```typescript
for (const item of await listDriveItems(folder)) {
	console.debug(` - ${item.name}`);
}
```

### Cleanup
```typescript
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
If you require more operations you can either raise an [issue](https://github.com/ProspectSafe/microsoft-graph/issues), or [raise a pull-request](CONTRIBUTING.md).
