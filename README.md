# Microsoft Graph SDK
## Overview
This is an extensible library that allows access to Microsoft's GraphAPI, including (but not only) Sharepoint's API. It currently supports the most common operations, with more being added over time.

Note that this is a THIRD PARTY library and not associated with Microsoft.

## Usage
1. Make sure the environment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` and [any others you require](docs/envs.md) are set. 
2. Install the NPM package `npm i microsoft-graph`
3. Then make calls:

	### List drives
	```typescript
	for (const drive of await listDrives()) {
		console.log(drive.name);
	}
	```

	### List files
	```typescript
	for (const item of await listDriveItems()) {
		console.log(item.name);
	}
	```

	### Getting a used range
	```typescript
	const range = await getWorkbookUsedRange({
		siteId: args.siteId,
		driveId: args.driveId,
		itemId: args.itemId,
		worksheetId: args.worksheetId,
	});
	```

	### Updating a range
	```typescript
	await updateWorkbookRange(range, {
		values: [
			[1, 2],
			[3, 4]
		]
	});
	```

From here, have a look at:
* [`/docs`](https://github.com/ProspectSafe/microsoft-graph/tree/main/docs) for more general documentation and advice.
* [`/src/operations`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/operations) for other supported GraphAPI operations.
* [`/src/tasks`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/tasks) for supported tasks that make use of multiple operations. 
* [`/src/services`](https://github.com/ProspectSafe/microsoft-graph/tree/main/src/services) for a bunch of helpers that make life generally easier.

That's it!

## Extension
If you require more operations you can either raise an [issue](https://github.com/ProspectSafe/microsoft-graph/issues), or [raise a pull-request](CONTRIBUTING.md).
