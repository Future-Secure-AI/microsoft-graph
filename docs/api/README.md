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

## Errors

| Module | Description |
| ------ | ------ |
| [BadTemplateError](BadTemplateError.md) | Error thrown when a template did not match the expected format. |

## Other

| Module | Description |
| ------ | ------ |
| [errors/ContextNotRegisteredError](errors/ContextNotRegisteredError.md) | - |
| [errors/EnvironmentVariableMissingError](errors/EnvironmentVariableMissingError.md) | - |
| [errors/InconsistentContextError](errors/InconsistentContextError.md) | - |
| [errors/InvalidArgumentError](errors/InvalidArgumentError.md) | - |
| [errors/InvalidOperationError](errors/InvalidOperationError.md) | - |
| [errors/NeverError](errors/NeverError.md) | - |
| [errors/NotFoundError](errors/NotFoundError.md) | - |
| [errors/NotImplementedError](errors/NotImplementedError.md) | - |
| [errors/ProtocolError](errors/ProtocolError.md) | - |
| [errors/RequestFailedError](errors/RequestFailedError.md) | - |
| [errors/TimeoutError](errors/TimeoutError.md) | - |
| [errors/UnsupportedAddressTypeError](errors/UnsupportedAddressTypeError.md) | - |
| [graphApi](graphApi.md) | - |
| [index](index.md) | - |
| [models/AccessToken](models/AccessToken.md) | - |
| [models/AccessTokenGenerator](models/AccessTokenGenerator.md) | - |
| [models/Address](models/Address.md) | - |
| [models/Cartesian](models/Cartesian.md) | - |
| [models/Cell](models/Cell.md) | - |
| [models/CellText](models/CellText.md) | - |
| [models/CellValue](models/CellValue.md) | - |
| [models/ClientId](models/ClientId.md) | - |
| [models/ClientSecret](models/ClientSecret.md) | - |
| [models/ColumnName](models/ColumnName.md) | - |
| [models/ColumnOffset](models/ColumnOffset.md) | - |
| [models/Context](models/Context.md) | - |
| [models/ContextRef](models/ContextRef.md) | - |
| [models/DataSource](models/DataSource.md) | - |
| [models/DataSourceDecoder](models/DataSourceDecoder.md) | - |
| [models/DataSourceEncoder](models/DataSourceEncoder.md) | - |
| [models/DataSourceIndex](models/DataSourceIndex.md) | - |
| [models/DataSourceRow](models/DataSourceRow.md) | - |
| [models/DriveId](models/DriveId.md) | - |
| [models/DriveItemId](models/DriveItemId.md) | - |
| [models/DriveItemPath](models/DriveItemPath.md) | - |
| [models/DriveItemRef](models/DriveItemRef.md) | - |
| [models/DriveRef](models/DriveRef.md) | - |
| [models/GraphOperation](models/GraphOperation.md) | - |
| [models/GraphOperationDefinition](models/GraphOperationDefinition.md) | - |
| [models/HostName](models/HostName.md) | - |
| [models/HttpProxy](models/HttpProxy.md) | - |
| [models/Item](models/Item.md) | - |
| [models/NumberFormat](models/NumberFormat.md) | - |
| [models/RangeOperationCallback](models/RangeOperationCallback.md) | - |
| [models/RecordBase](models/RecordBase.md) | - |
| [models/Row](models/Row.md) | - |
| [models/RowNumber](models/RowNumber.md) | - |
| [models/RowOffset](models/RowOffset.md) | - |
| [models/Scope](models/Scope.md) | - |
| [models/SiteId](models/SiteId.md) | - |
| [models/SiteName](models/SiteName.md) | - |
| [models/SiteRef](models/SiteRef.md) | - |
| [models/SourceRowValue](models/SourceRowValue.md) | - |
| [models/TenantId](models/TenantId.md) | - |
| [models/WorkbookNamedRangeRef](models/WorkbookNamedRangeRef.md) | - |
| [models/WorkbookRangeName](models/WorkbookRangeName.md) | - |
| [models/WorkbookRangeRef](models/WorkbookRangeRef.md) | - |
| [models/WorkbookRef](models/WorkbookRef.md) | - |
| [models/WorkbookSessionId](models/WorkbookSessionId.md) | - |
| [models/WorkbookTableColumnRef](models/WorkbookTableColumnRef.md) | - |
| [models/WorkbookTableId](models/WorkbookTableId.md) | - |
| [models/WorkbookTableRef](models/WorkbookTableRef.md) | - |
| [models/WorkbookWorksheetId](models/WorkbookWorksheetId.md) | - |
| [models/WorkbookWorksheetName](models/WorkbookWorksheetName.md) | - |
| [models/WorkbookWorksheetRef](models/WorkbookWorksheetRef.md) | - |
| [operations/drive/createFolder](operations/drive/createFolder.md) | - |
| [operations/drive/listDrives](operations/drive/listDrives.md) | - |
| [operations/driveItem/createDriveItem](operations/driveItem/createDriveItem.md) | - |
| [operations/driveItem/deleteDriveItem](operations/driveItem/deleteDriveItem.md) | - |
| [operations/driveItem/existsDriveItem](operations/driveItem/existsDriveItem.md) | - |
| [operations/driveItem/getDriveItem](operations/driveItem/getDriveItem.md) | - |
| [operations/driveItem/getDriveItemByPath](operations/driveItem/getDriveItemByPath.md) | - |
| [operations/driveItem/getDriveItemContent](operations/driveItem/getDriveItemContent.md) | - |
| [operations/driveItem/initiateCopyDriveItem](operations/driveItem/initiateCopyDriveItem.md) | - |
| [operations/driveItem/listDriveItemChildren](operations/driveItem/listDriveItemChildren.md) | - |
| [operations/driveItem/moveDriveItem](operations/driveItem/moveDriveItem.md) | - |
| [operations/site/getSite](operations/site/getSite.md) | - |
| [operations/site/getSiteByName](operations/site/getSiteByName.md) | - |
| [operations/site/listSites](operations/site/listSites.md) | - |
| [operations/site/searchSites](operations/site/searchSites.md) | - |
| [operations/user/userSendMail](operations/user/userSendMail.md) | - |
| [operations/workbook/calculateWorkbook](operations/workbook/calculateWorkbook.md) | - |
| [operations/workbook/createWorkbook](operations/workbook/createWorkbook.md) | - |
| [operations/workbook/deleteWorkbook](operations/workbook/deleteWorkbook.md) | - |
| [operations/workbookRange/autoFitWorkbookRangeColumns](operations/workbookRange/autoFitWorkbookRangeColumns.md) | - |
| [operations/workbookRange/clearWorkbookRange](operations/workbookRange/clearWorkbookRange.md) | - |
| [operations/workbookRange/deleteWorkbookRange](operations/workbookRange/deleteWorkbookRange.md) | - |
| [operations/workbookRange/getWorkbookNamedRange](operations/workbookRange/getWorkbookNamedRange.md) | - |
| [operations/workbookRange/getWorkbookRangeFill](operations/workbookRange/getWorkbookRangeFill.md) | - |
| [operations/workbookRange/getWorkbookRangeFont](operations/workbookRange/getWorkbookRangeFont.md) | - |
| [operations/workbookRange/getWorkbookRangeFormat](operations/workbookRange/getWorkbookRangeFormat.md) | - |
| [operations/workbookRange/getWorkbookUsedRange](operations/workbookRange/getWorkbookUsedRange.md) | - |
| [operations/workbookRange/getWorkbookVisibleRange](operations/workbookRange/getWorkbookVisibleRange.md) | - |
| [operations/workbookRange/getWorkbookWorksheetRange](operations/workbookRange/getWorkbookWorksheetRange.md) | - |
| [operations/workbookRange/insertWorkbookCells](operations/workbookRange/insertWorkbookCells.md) | - |
| [operations/workbookRange/mergeWorkbookRange](operations/workbookRange/mergeWorkbookRange.md) | - |
| [operations/workbookRange/setWorkbookRangeFill](operations/workbookRange/setWorkbookRangeFill.md) | - |
| [operations/workbookRange/setWorkbookRangeFont](operations/workbookRange/setWorkbookRangeFont.md) | - |
| [operations/workbookRange/setWorkbookRangeFormat](operations/workbookRange/setWorkbookRangeFormat.md) | - |
| [operations/workbookRange/unmergeWorkbookRange](operations/workbookRange/unmergeWorkbookRange.md) | - |
| [operations/workbookRange/updateWorkbookNamedRange](operations/workbookRange/updateWorkbookNamedRange.md) | - |
| [operations/workbookRange/updateWorkbookRange](operations/workbookRange/updateWorkbookRange.md) | - |
| [operations/workbookSession/closeWorkbookSession](operations/workbookSession/closeWorkbookSession.md) | - |
| [operations/workbookSession/createWorkbookSession](operations/workbookSession/createWorkbookSession.md) | - |
| [operations/workbookSession/refreshWorkbookSession](operations/workbookSession/refreshWorkbookSession.md) | - |
| [operations/workbookTable/applyWorkbookTableColumnFilter](operations/workbookTable/applyWorkbookTableColumnFilter.md) | - |
| [operations/workbookTable/clearWorkbookTableFilters](operations/workbookTable/clearWorkbookTableFilters.md) | - |
| [operations/workbookTable/createWorkbookTable](operations/workbookTable/createWorkbookTable.md) | - |
| [operations/workbookTable/deleteWorkbookTable](operations/workbookTable/deleteWorkbookTable.md) | - |
| [operations/workbookTable/deleteWorkbookTablePreservingValues](operations/workbookTable/deleteWorkbookTablePreservingValues.md) | - |
| [operations/workbookTable/getWorkbookTable](operations/workbookTable/getWorkbookTable.md) | - |
| [operations/workbookTable/getWorkbookTableBodyRange](operations/workbookTable/getWorkbookTableBodyRange.md) | - |
| [operations/workbookTable/getWorkbookTableBodyVisibleRange](operations/workbookTable/getWorkbookTableBodyVisibleRange.md) | - |
| [operations/workbookTable/getWorkbookTableHeaderRange](operations/workbookTable/getWorkbookTableHeaderRange.md) | - |
| [operations/workbookTable/listWorkbookTableColumns](operations/workbookTable/listWorkbookTableColumns.md) | - |
| [operations/workbookTable/listWorkbookTableRows](operations/workbookTable/listWorkbookTableRows.md) | - |
| [operations/workbookTable/listWorkbookTables](operations/workbookTable/listWorkbookTables.md) | - |
| [operations/workbookWorksheet/createWorkbookWorksheet](operations/workbookWorksheet/createWorkbookWorksheet.md) | - |
| [operations/workbookWorksheet/deleteWorkbookWorksheet](operations/workbookWorksheet/deleteWorkbookWorksheet.md) | - |
| [operations/workbookWorksheet/getWorkbookWorksheetUsedRange](operations/workbookWorksheet/getWorkbookWorksheetUsedRange.md) | - |
| [operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef](operations/workbookWorksheet/getWorkbookWorksheetUsedRangeRef.md) | - |
| [operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange](operations/workbookWorksheet/getWorkbookWorksheetUsedVisibleRange.md) | - |
| [operations/workbookWorksheet/listWorkbookWorksheets](operations/workbookWorksheet/listWorkbookWorksheets.md) | - |
| [operations/workbookWorksheet/updateWorkbookWorksheet](operations/workbookWorksheet/updateWorkbookWorksheet.md) | - |
| [services/accessToken](services/accessToken.md) | - |
| [services/addressManipulation](services/addressManipulation.md) | - |
| [services/addressOffset](services/addressOffset.md) | - |
| [services/batch](services/batch.md) | - |
| [services/cartesianAddress](services/cartesianAddress.md) | - |
| [services/cellText](services/cellText.md) | - |
| [services/context](services/context.md) | - |
| [services/dataSource](services/dataSource.md) | - |
| [services/drive](services/drive.md) | - |
| [services/driveItem](services/driveItem.md) | - |
| [services/environmentVariable](services/environmentVariable.md) | - |
| [services/http](services/http.md) | - |
| [services/httpStatus](services/httpStatus.md) | - |
| [services/numberFormat](services/numberFormat.md) | - |
| [services/operationId](services/operationId.md) | - |
| [services/random](services/random.md) | - |
| [services/rangeManipulation](services/rangeManipulation.md) | - |
| [services/sharepointUrl](services/sharepointUrl.md) | - |
| [services/site](services/site.md) | - |
| [services/sleep](services/sleep.md) | - |
| [services/stringCaseConversion](services/stringCaseConversion.md) | - |
| [services/templatedPaths](services/templatedPaths.md) | - |
| [services/temporaryFiles](services/temporaryFiles.md) | - |
| [services/workbookRange](services/workbookRange.md) | - |
| [services/workbookTable](services/workbookTable.md) | - |
| [services/workbookTableColumn](services/workbookTableColumn.md) | - |
| [services/workbookWorksheet](services/workbookWorksheet.md) | - |
| [tasks/copyDriveItem](tasks/copyDriveItem.md) | - |
| [tasks/createWorkbookAndStartSession](tasks/createWorkbookAndStartSession.md) | - |
| [tasks/deleteDriveItemWithRetry](tasks/deleteDriveItemWithRetry.md) | - |
| [tasks/downloadDriveItemContent](tasks/downloadDriveItemContent.md) | - |
| [tasks/getRangeLastUsedCell](tasks/getRangeLastUsedCell.md) | - |
| [tasks/getWorkbookTableVisibleBody](tasks/getWorkbookTableVisibleBody.md) | - |
| [tasks/getWorkbookWorksheetByName](tasks/getWorkbookWorksheetByName.md) | - |
| [tasks/iterateWorkbookRange](tasks/iterateWorkbookRange.md) | - |
| [tasks/iterateWorkbookRangeValues](tasks/iterateWorkbookRangeValues.md) | - |
| [tasks/listDriveItems](tasks/listDriveItems.md) | - |
| [tasks/readWorkbookRows](tasks/readWorkbookRows.md) | - |
| [tasks/safeDeleteWorkbook](tasks/safeDeleteWorkbook.md) | - |
| [tasks/setColumnHidden](tasks/setColumnHidden.md) | - |
| [tasks/setRowHidden](tasks/setRowHidden.md) | - |
| [tasks/setWorkbookRangeValues](tasks/setWorkbookRangeValues.md) | - |
| [tasks/setWorkbookTableBodyVisibleRows](tasks/setWorkbookTableBodyVisibleRows.md) | - |
| [tasks/tryCloseWorkbookSession](tasks/tryCloseWorkbookSession.md) | - |
| [tasks/tryDeleteDriveItem](tasks/tryDeleteDriveItem.md) | - |
| [tasks/writeWorkbookRows](tasks/writeWorkbookRows.md) | - |
