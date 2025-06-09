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

## Operations

| Module | Description |
| ------ | ------ |
| [applyWorkbookTableColumnFilter](applyWorkbookTableColumnFilter.md) | Apply a filter to a workbook table column. |
| [autoFitWorkbookRangeColumns](autoFitWorkbookRangeColumns.md) | Auto-fit the columns in a range. |
| [calculateWorkbook](calculateWorkbook.md) | Recalculate a workbook. |
| [clearWorkbookRange](clearWorkbookRange.md) | Clear a range - content, formatting, or both. |
| [clearWorkbookTableColumnFilters](clearWorkbookTableColumnFilters.md) | Clear all filters from a workbook table. |
| [closeWorkbookSession](closeWorkbookSession.md) | Close an existing workbook session. |
| [createDriveItem](createDriveItem.md) | Creates new drive item in the specified parent drive or folder. |
| [createFolder](createFolder.md) | Create a folder in the root of a drive, or in a folder. If it already exists do nothing. |
| [createWorkbook](createWorkbook.md) | Create a new blank workbook. |
| [createWorkbookSession](createWorkbookSession.md) | Create a new workbook session. |
| [createWorkbookTable](createWorkbookTable.md) | Create a new table in a worksheet. |
| [createWorkbookWorksheet](createWorkbookWorksheet.md) | Create a new worksheet in a workbook, optionally with a defined name. |
| [deleteDriveItem](deleteDriveItem.md) | Delete an item from a drive. |
| [deleteWorkbook](deleteWorkbook.md) | Delete a workbook. |
| [deleteWorkbookRange](deleteWorkbookRange.md) | Delete a range. |
| [deleteWorkbookTable](deleteWorkbookTable.md) | Delete a workbook table. All data in the table will be cleared. |
| [deleteWorkbookTablePreservingValues](deleteWorkbookTablePreservingValues.md) | Converts the table into a normal range of cells. All data is preserved. |
| [deleteWorkbookWorksheet](deleteWorkbookWorksheet.md) | Permanently delete a worksheet. |
| [existsDriveItem](existsDriveItem.md) | Check if a given drive item exists. |
| [getDriveItem](getDriveItem.md) | Retrieve the metadata for an item in a drive. |
| [getDriveItemByPath](getDriveItemByPath.md) | Retrieve the metadata for an item in a drive by file path. |
| [getDriveItemContent](getDriveItemContent.md) | Download the content of a drive item. |
| [getSite](getSite.md) | Retrieve properties for a site resource. |
| [getSiteByName](getSiteByName.md) | Get a site by its name. |
| [getWorkbookNamedRange](getWorkbookNamedRange.md) | Retrieve a named range. |
| [getWorkbookRangeFill](getWorkbookRangeFill.md) | Retrieve the fill format of a workbook range. |
| [getWorkbookRangeFont](getWorkbookRangeFont.md) | Retrieve the font format of a workbook range. |
| [getWorkbookRangeFormat](getWorkbookRangeFormat.md) | Retrieve the format of a workbook range. |
| [getWorkbookTable](getWorkbookTable.md) | Retrieve a workbook table. |
| [getWorkbookTableBodyRange](getWorkbookTableBodyRange.md) | Retrieve the data body range of a workbook table. |
| [getWorkbookTableBodyVisibleRange](getWorkbookTableBodyVisibleRange.md) | Retrieve the visible data body range of a table. |
| [getWorkbookTableHeaderRange](getWorkbookTableHeaderRange.md) | Retrieve the header row range of a table. |
| [getWorkbookVisibleRange](getWorkbookVisibleRange.md) | Retrieve the visible view of a range. |
| [getWorkbookWorksheetRange](getWorkbookWorksheetRange.md) | Fetch a range. |
| [getWorkbookWorksheetUsedRange](getWorkbookWorksheetUsedRange.md) | Retrieve the used range in a worksheet, ignoring trailing rows and columns that are blank. |
| [getWorkbookWorksheetUsedRangeRef](getWorkbookWorksheetUsedRangeRef.md) | Retrieve the address of the used range in a worksheet, ignoring trailing rows and columns that are blank. |
| [getWorkbookWorksheetUsedVisibleRange](getWorkbookWorksheetUsedVisibleRange.md) | Retrieve the visible (not hidden) range in a worksheet. |
| [initiateCopyDriveItem](initiateCopyDriveItem.md) | Initiate an asynchronous copy of an item. |
| [insertWorkbookCells](insertWorkbookCells.md) | Insert a new blank range at a specified address, shifting existing cells. |
| [listDriveItemChildren](listDriveItemChildren.md) | Retrieve the metadata for items in a drive or folder. |
| [listDrives](listDrives.md) | Retrieve the list of accessible Drives in a Site. |
| [listSites](listSites.md) | List accessible sites. |
| [listWorkbookTableColumns](listWorkbookTableColumns.md) | Retrieve a list of columns in a table. |
| [listWorkbookTableRows](listWorkbookTableRows.md) | Retrieve a list of rows in a table. |
| [listWorkbookTables](listWorkbookTables.md) | Retrieve a list of tables in a worksheet. |
| [listWorkbookWorksheets](listWorkbookWorksheets.md) | Retrieve a list of worksheets in a workbook. |
| [mergeWorkbookRange](mergeWorkbookRange.md) | Merge a range of cells in a worksheet. |
| [moveDriveItem](moveDriveItem.md) | Moves a file to a new location in the same drive. |
| [refreshWorkbookSession](refreshWorkbookSession.md) | Refresh a workbook session. |
| [searchSites](searchSites.md) | Find accessible sites that match the provided keywords. |
| [setWorkbookRangeFill](setWorkbookRangeFill.md) | Update the fill format of a workbook range. |
| [setWorkbookRangeFont](setWorkbookRangeFont.md) | Update the font format of a workbook range. |
| [setWorkbookRangeFormat](setWorkbookRangeFormat.md) | Update the general format of a workbook range. |
| [unmergeWorkbookRange](unmergeWorkbookRange.md) | Unmerge a merged range of cells in a worksheet. |
| [updateWorkbookNamedRange](updateWorkbookNamedRange.md) | Update a named range. |
| [updateWorkbookRange](updateWorkbookRange.md) | Update a range, including values and formatting. |
| [updateWorkbookWorksheet](updateWorkbookWorksheet.md) | Update the name, position, and/or visibility of a worksheet. |
| [userSendMail](userSendMail.md) | Send an email. |

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
