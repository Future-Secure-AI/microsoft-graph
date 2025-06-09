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
| [BadTemplateError](BadTemplateError.md) | Error thrown when path template did not match the expected format. |
| [EnvironmentVariableMissingError](EnvironmentVariableMissingError.md) | Error thrown when a required environment variable is not set, empty or whitespace. |
| [InconsistentContextError](InconsistentContextError.md) | Error thrown when batched operations are performed with an inconsistent context (ie, different authentication). |
| [InvalidArgumentError](InvalidArgumentError.md) | Error thrown when a function is called with one or more invalid arguments. |
| [InvalidOperationError](InvalidOperationError.md) | Error thrown when a function is called when the system is in an unexpected state. |
| [NeverError](NeverError.md) | Error thrown when a theoretically impossible state is encountered. This is akin to a panic. |
| [NotFoundError](NotFoundError.md) | Error thrown when a requested resource is not found. |
| [NotImplementedError](NotImplementedError.md) | Error thrown when a requested feature or functionality is not yet implemented. |
| [ProtocolError](ProtocolError.md) | Error thrown when a response from the server does not conform to the expected protocol. |
| [RequestFailedError](RequestFailedError.md) | Error thrown when a request to the server fails. |
| [RequestTimeoutError](RequestTimeoutError.md) | Error thrown when a request exceeds the allowed time limit. |
| [UnsupportedAddressTypeError](UnsupportedAddressTypeError.md) | Error thrown when a given address does not confirm to any known address type. |

## Models

| Module | Description |
| ------ | ------ |
| [AccessToken](AccessToken.md) | Token sent to server to authenticate a request. |
| [AccessTokenGenerator](AccessTokenGenerator.md) | Callback function that generates an access token. |
| [Address](Address.md) | Address of a set of cells in a spreadsheet. |
| [AzureApplicationCredentials](AzureApplicationCredentials.md) | Credentials used to authenticate an application with Azure. |
| [Cartesian](Cartesian.md) | Cartesian coordinates of a set of cells in a spreadsheet. |
| [Cell](Cell.md) | Cell in a worksheet. |
| [CellText](CellText.md) | Text content of a cell in a worksheet. |
| [CellValue](CellValue.md) | CellValue represents the value of a cell in a spreadsheet. |
| [ColumnName](ColumnName.md) | Name of a column, as configured by the user. |
| [ColumnOffset](ColumnOffset.md) | Zero-based index representing the position of a column in a range. |
| [Context](Context.md) | Context of requests. |
| [ContextRef](ContextRef.md) | Reference to a context |
| [DriveId](DriveId.md) | Identifier for a drive. |
| [DriveItemId](DriveItemId.md) | Identifier for an item in a drive. |
| [DriveItemPath](DriveItemPath.md) | Path of an item in a drive. |
| [DriveItemRef](DriveItemRef.md) | Reference to an item in a drive. |
| [DriveRef](DriveRef.md) | Reference to a drive. |
| [GraphOperation](GraphOperation.md) | An atomic operation to be performed against the Microsoft Graph API. |
| [HostName](HostName.md) | Name of a remote host, resolvable by DNS. |
| [Http](Http.md) | HTTP models for handling HTTP requests and responses. |
| [NumberFormat](NumberFormat.md) | Format to be applied to a cell value to convert it to text to display to the user. |
| [Row](Row.md) | A linear sequency of cells in a worksheet. |
| [RowNumber](RowNumber.md) | Row number as it appears in Excel. |
| [RowOffset](RowOffset.md) | Zero-based index representing the position of a row in a range. |
| [SiteId](SiteId.md) | Identifier for a site. |
| [SiteName](SiteName.md) | Name of a site. |
| [SiteRef](SiteRef.md) | Reference to a site. |
| [WorkbookNamedRangeRef](WorkbookNamedRangeRef.md) | Reference to a named range. |
| [WorkbookRangeName](WorkbookRangeName.md) | Name of a range in a workbook. |
| [WorkbookRangeRef](WorkbookRangeRef.md) | Reference to a range in a worksheet. |
| [WorkbookRef](WorkbookRef.md) | Reference to a workbook. |
| [WorkbookSessionId](WorkbookSessionId.md) | Identifier for a workbook session. |
| [WorkbookTableColumnRef](WorkbookTableColumnRef.md) | Reference to a column in a table in a worksheet. |
| [WorkbookTableId](WorkbookTableId.md) | Identifier for a table in a worksheet. |
| [WorkbookTableRef](WorkbookTableRef.md) | Reference to a table in a worksheet. |
| [WorkbookWorksheetId](WorkbookWorksheetId.md) | Identifier for a worksheet in a workbook. |
| [WorkbookWorksheetName](WorkbookWorksheetName.md) | Name of a worksheet in a workbook. |
| [WorkbookWorksheetRef](WorkbookWorksheetRef.md) | Reference to a worksheet in a workbook. |

## Other

| Module | Description |
| ------ | ------ |
| [models/DataSource](models/DataSource.md) | - |
| [models/DataSourceDecoder](models/DataSourceDecoder.md) | - |
| [models/DataSourceEncoder](models/DataSourceEncoder.md) | - |
| [models/DataSourceIndex](models/DataSourceIndex.md) | - |
| [models/DataSourceRow](models/DataSourceRow.md) | - |
| [models/Item](models/Item.md) | - |
| [models/RangeOperationCallback](models/RangeOperationCallback.md) | - |
| [models/RecordBase](models/RecordBase.md) | - |
| [models/SourceRowValue](models/SourceRowValue.md) | - |
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
| [services/addressManipulation](services/addressManipulation.md) | - |
| [services/addressOffset](services/addressOffset.md) | - |
| [services/azureApplicationCredentials](services/azureApplicationCredentials.md) | - |
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

## Services

| Module | Description |
| ------ | ------ |
| [operationInvoker](operationInvoker.md) | Invoke operations, potentially as parallel or sequential batches. |

## Tasks

| Module | Description |
| ------ | ------ |
| [copyDriveItem](copyDriveItem.md) | Copy a drive item. |
| [createWorkbookAndStartSession](createWorkbookAndStartSession.md) | Create a new workbook and open a session for that workbook. |
| [deleteDriveItemWithRetry](deleteDriveItemWithRetry.md) | Delete a drive item, avoiding locking issues through automatic retries. |
| [downloadDriveItemContent](downloadDriveItemContent.md) | Download a drive item and save it to the local disk. |
| [getWorkbookWorksheetByName](getWorkbookWorksheetByName.md) | Get a worksheet by its name. |
| [listDriveItems](listDriveItems.md) | List drive items in a drive or a drive item. |
| [readWorkbookRows](readWorkbookRows.md) | Iterates over the rows in a given worksheet range. |
| [safeDeleteWorkbook](safeDeleteWorkbook.md) | Safely delete a workbook by first closing any open sessions and then deleting it. |
| [setColumnHidden](setColumnHidden.md) | Set one or more columns visibility. |
| [setRowHidden](setRowHidden.md) | Set one or more rows visibility. |
| [setWorkbookTableBodyVisibleRows](setWorkbookTableBodyVisibleRows.md) | Set visible rows of a workbook table with the provided 2D array of values, ignoring hidden rows and inserting new rows at the end if needed. |
| [tryCloseWorkbookSession](tryCloseWorkbookSession.md) | Try and close a workbook session. |
| [tryDeleteDriveItem](tryDeleteDriveItem.md) | Attempts to delete a drive item, returning success status. |
| [writeWorkbookRows](writeWorkbookRows.md) | Write rows to a workbook range. |
