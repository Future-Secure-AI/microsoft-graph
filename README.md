# Microsoft Graph SDK
## Overview
This is an extensible library that allows access to Microsoft's GraphAPI, including (but not only) Sharepoint's API. It currently supports the most common operations, with more being added over time.


## Usage
First up, make sure the environment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` and [any others you require](docs/envs.md) are set. Then make calls:

### List drives
```typescript
for (const drive of await listDrives(defaultDriveRef)) {
	console.log(drive.name);
}
```

### List files
```typescript
for (const item of await listDriveItemRefs(defaultDriveRef, folderPath)) {
	console.log(item.name);
}
```

### Getting a used range
```typescript
const cells = await getWorkbookUsedRange({
    siteId: args.siteId,
    driveId: args.driveId,
    itemId: args.itemId,
    worksheetId: args.worksheetId,
});
```

### Updating a range
```typescript
await updateWorkbookRange(rangeRef, {
	values: [
		[1, 2],
		[3, 4]
	]
});
```

From here, have a look at:
* [`/doc`](https://github.com/Future-Secure-AI/microsoft-graph/tree/main/doc) for more general documentation and advice.
* [`/src/operations`](https://github.com/Future-Secure-AI/microsoft-graph/tree/main/src/operations) for other supported GraphAPI operations.
* [`/src/tasks`](https://github.com/Future-Secure-AI/microsoft-graph/tree/main/src/tasks) for supported tasks that make use of multiple operations. 
* [`/src/services`](https://github.com/Future-Secure-AI/microsoft-graph/tree/main/src/services) for a bunch of helpers that make life generally easier.

That's it!

## Extension
If you require more operations you can either raise an [issue](https://github.com/Future-Secure-AI/microsoft-graph/issues), or [raise a pull-request](CONTRIBUTING.md).
