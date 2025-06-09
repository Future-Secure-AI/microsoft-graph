# Microsoft Graph SDK
## Overview
This is an extensible library that allows access to Microsoft's GraphAPI, including (but not only) Sharepoint's API. It currently supports the most common operations, with more being added over time.

ℹ️ This is a THIRD PARTY library and not associated with Microsoft.

## TLDR
Install the NPM package `npm i microsoft-graph`, then:

```typescript
console.info("Loading envs...");
const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;
const siteId = getEnvironmentVariable("SHAREPOINT_SITE_ID") as SiteId;
const driveId = getEnvironmentVariable("SHAREPOINT_DRIVE_ID") as DriveId;

console.info("Get drive...");
const contextRef = createClientSecretContext(tenantId, clientId, clientSecret);
const siteRef = createSiteRef(contextRef, siteId);
const driveRef = createDriveRef(siteRef, driveId);

console.info("Creating workbook...");
const workbook = await createWorkbookAndStartSession(driveRef, generateTempFileName(workbookFileExtension));
try {
	console.info("Getting worksheet...");
	const worksheetRef = createDefaultWorkbookWorksheetRef(workbook); // OR `await getWorkbookWorksheetByName(workbook, "Sheet1");` to get one by name

	console.info("Writing values to range...");
	const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B3");
	await writeWorkbookRows(rangeRef, [
		[{ value: 1 }, { value: 2 }],
		[{ value: 3 }, { value: 4 }],
		[{ value: 5 }, { value: 6 }],
	]);

	console.info("Reading range...");
	for await (const row of readWorkbookRows(rangeRef)) {
		console.debug(` ${row.map((cell) => cell.value).join(", ")}`);
	}
} finally {
	console.info("Cleanup...");
	await safeDeleteWorkbook(workbook);
}

console.info("Done.");
```

## Further reading
* [API Documentation](/docs/api/README.md)
* [Common questions and advanced topics](/docs/topics/README.md)