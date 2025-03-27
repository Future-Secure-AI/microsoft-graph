# Microsoft Graph SDK
## Overview
This is an extensible library that allows access to Microsoft's GraphAPI, including (but not only) Sharepoint's API. It currently supports the most common operations, with more being added over time.

Note that this is a THIRD PARTY library and not associated with Microsoft.

## Breaking changes
### v2.0.0 
* Contextual authentication. Authentication details are no longer automatically loaded from envs. You need to call `const contextRef = register(tenantId, clientId, clientSecret, httpProxy);` 
* References are created with new funcs. Like `createSiteRef`.

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
const contextRef = register(tenantId, clientId, clientSecret, httpProxy);
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

### Update range
```typescript
const worksheet = await getWorkbookWorksheetByName(workbook, "Sheet1");
const rangeRef = createWorkbookRangeRef(worksheet, "A1:B2");
await updateWorkbookRange(rangeRef, {
	values: [
		[1, 2],
		[3, 4]
	]
});
```

### List files
```typescript
for (const item of await listDriveItems(folder)) {
	console.debug(` - ${item.name}`);
}
```

### Cleanup
```typescript
await closeWorkbookSession(workbook);
await deleteDriveItemWithRetry(folder); // May take a moment to unlock the file
```

From here, have a look at:
* [`/docs`](https://github.com/ProspectSafe/microsoft-graph/tree/main/docs) for more general documentation and advice.
* [`/src/operations`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/operations) for other supported GraphAPI operations.
* [`/src/tasks`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/tasks) for supported tasks that make use of multiple operations. 
* [`/src/services`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/services) for a bunch of helpers that make life generally easier.

That's it!

## Extension
If you require more operations you can either raise an [issue](https://github.com/ProspectSafe/microsoft-graph/issues), or [raise a pull-request](CONTRIBUTING.md).
