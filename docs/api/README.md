# Microsoft Graph SDK

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
| [AzureApplicationCredentials](AzureApplicationCredentials-1.md) | Credentials used to authenticate an application with Azure. |
| [Cartesian](Cartesian.md) | Cartesian coordinates of a set of cells in a spreadsheet. |
| [Cell](Cell.md) | Cell in a worksheet. |
| [Column](Column.md) | Column pointers. |
| [Context](Context-1.md) | Context of requests. |
| [Drive](Drive-1.md) | Drive pointers. |
| [DriveItem](DriveItem-1.md) | Drive item pointers. |
| [GraphOperation](GraphOperation.md) | An atomic operation to be performed against the Microsoft Graph API. |
| [HostName](HostName.md) | Name of a remote host, resolvable by DNS. |
| [Http](Http-1.md) | HTTP models for handling HTTP requests and responses. |
| [Row](Row.md) | A linear sequency of cells in a worksheet. |
| [Site](Site-1.md) | Pointers to a site. |
| [Workbook](Workbook.md) | Pointers to a workbook. |
| [WorkbookNamedRange](WorkbookNamedRange.md) | Pointers to a named range in a worksheet. |
| [WorkbookRange](WorkbookRange-1.md) | Pointers to a range in a worksheet. |
| [WorkbookSession](WorkbookSession.md) | Pointers to a workbook session . |
| [WorkbookTable](WorkbookTable-1.md) | Pointer for a table in a worksheet. |
| [WorkbookWorksheet](WorkbookWorksheet-1.md) | Pointer for a worksheet in a workbook. |

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
| [getWorkbookWorksheetByName](getWorkbookWorksheetByName.md) | Retrieve a worksheet by its name from a workbook. |
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
| [services/dataSource](services/dataSource.md) | - |

## Services

| Module | Description |
| ------ | ------ |
| [addressManipulation](addressManipulation.md) | Utilities for manipulating and analyzing spreadsheet-style addresses (A1 notation). |
| [addressOffset](addressOffset.md) | Utilities for converting between spreadsheet column/row addresses and offsets. |
| [azureApplicationCredentials](azureApplicationCredentials.md) | Azure application credential helpers for authentication and token management. |
| [batch](batch.md) | Constants and helpers for batching Microsoft Graph API requests. |
| [cartesianAddress](cartesianAddress.md) | Utilities for converting between A1 addresses and Cartesian coordinates. |
| [CellFormat](CellFormat.md) | Spreadsheet number format constants for Microsoft Graph API. |
| [context](context.md) | Context creation and management utilities for Microsoft Graph API authentication. |
| [drive](drive.md) | Utilities for working with Microsoft Graph Drive references and operations. |
| [driveItem](driveItem.md) | Utilities for working with Microsoft Graph Drive Items (files and folders). |
| [environmentVariable](environmentVariable.md) | Utilities for accessing environment variables with error handling and fallbacks. |
| [http](http.md) | HTTP request utilities for Microsoft Graph API, with proxy support. |
| [httpStatus](httpStatus.md) | Utilities for analyzing HTTP status codes for Microsoft Graph API responses. |
| [Iteration](Iteration.md) | - |
| [operationId](operationId.md) | Utilities for converting between operation IDs and indexes. |
| [operationInvoker](operationInvoker.md) | Invoke operations, potentially as parallel or sequential batches. |
| [random](random.md) | Utilities for generating random values for spreadsheet and API operations. |
| [rangeManipulation](rangeManipulation.md) | Utilities for inferring and manipulating spreadsheet ranges and objects. |
| [sharepointUrl](sharepointUrl.md) | Utilities for parsing and extracting information from SharePoint URLs. |
| [site](site.md) | Utilities for working with Microsoft Graph Site references and operations. |
| [sleep](sleep.md) | Utility for pausing execution (sleep) in async workflows. |
| [stringCaseConversion](stringCaseConversion.md) | Utilities for converting string case styles (e.g., kebab-case to camelCase). |
| [templatedPaths](templatedPaths.md) | Utilities for generating and parsing templated HTTP paths. |
| [temporaryFiles](temporaryFiles.md) | Utilities for generating temporary file names for use with Drive Items. |
| [workbookRange](workbookRange.md) | Utilities for working with workbook ranges and references. |
| [workbookTable](workbookTable.md) | Utilities for creating and working with workbook table references. |
| [workbookTableColumn](workbookTableColumn.md) | Utilities for creating and working with workbook table column references. |
| [workbookWorksheet](workbookWorksheet.md) | Utilities for creating and working with workbook worksheet references. |

## Tasks

| Module | Description |
| ------ | ------ |
| [copyDriveItem](copyDriveItem.md) | Copy a drive item. |
| [createWorkbookAndStartSession](createWorkbookAndStartSession.md) | Create a new workbook and open a session for that workbook. |
| [deleteDriveItemWithRetry](deleteDriveItemWithRetry.md) | Delete a drive item, avoiding locking issues through automatic retries. |
| [downloadDriveItemContent](downloadDriveItemContent.md) | Download a drive item and save it to the local disk. |
| [getWorkbookWorksheetByName](getWorkbookWorksheetByName-1.md) | Get a worksheet by its name. |
| [listDriveItems](listDriveItems.md) | List drive items in a drive or a drive item. |
| [readWorkbookRows](readWorkbookRows.md) | Iterates over the rows in a given worksheet range. |
| [safeDeleteWorkbook](safeDeleteWorkbook.md) | Safely delete a workbook by first closing any open sessions and then deleting it. |
| [setColumnHidden](setColumnHidden.md) | Set one or more columns visibility. |
| [setRowHidden](setRowHidden.md) | Set one or more rows visibility. |
| [setWorkbookTableBodyVisibleRows](setWorkbookTableBodyVisibleRows.md) | Set visible rows of a workbook table with the provided 2D array of values, ignoring hidden rows and inserting new rows at the end if needed. |
| [tryCloseWorkbookSession](tryCloseWorkbookSession.md) | Try and close a workbook session. |
| [tryDeleteDriveItem](tryDeleteDriveItem.md) | Attempts to delete a drive item, returning success status. |
| [writeWorkbookRows](writeWorkbookRows.md) | Write rows to a workbook range. |
