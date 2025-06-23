# Microsoft Graph SDK

## Errors

| Module | Description |
| ------ | ------ |
| [BadRequestError](BadRequestError.md) | Can't process the request because it's malformed or incorrect. |
| [BadTemplateError](BadTemplateError.md) | Error thrown when path template did not match the expected format. |
| [BandwidthLimitExceededError](BandwidthLimitExceededError.md) | Your app has been throttled for exceeding the maximum bandwidth cap. Your app can retry the request again after more time has elapsed. |
| [ConflictError](ConflictError.md) | The request can't be processed due to a conflict with the current state. |
| [EnvironmentVariableMissingError](EnvironmentVariableMissingError.md) | Error thrown when a required environment variable is not set, empty or whitespace. |
| [ForbiddenError](ForbiddenError.md) | Access is denied to the requested resource. The user might not have enough permission or might not have a required license. |
| [GatewayTimeoutError](GatewayTimeoutError.md) | The server, while acting as a proxy, didn't receive a timely response from the upstream server it needed to access in attempting to complete the request. |
| [GoneError](GoneError.md) | The requested resource is no longer available at the server. |
| [InconsistentContextError](InconsistentContextError.md) | Error thrown when batched operations are performed with an inconsistent context (ie, different authentication). |
| [InsufficientStorageError](InsufficientStorageError.md) | The maximum storage quota has been reached. |
| [InternalServerError](InternalServerError.md) | There was an internal server error while processing the request. |
| [InvalidArgumentError](InvalidArgumentError.md) | Error thrown when a function is called with one or more invalid arguments. |
| [InvalidOperationError](InvalidOperationError.md) | Error thrown when a function is called when the system is in an unexpected state. |
| [LengthRequiredError](LengthRequiredError.md) | A Content-Length header is required on the request. |
| [LockedError](LockedError.md) | The resource that is being accessed is locked. |
| [MethodNotAllowedError](MethodNotAllowedError.md) | The HTTP method in the request isn't allowed on the resource. |
| [NeverError](NeverError.md) | Error thrown when a theoretically impossible state is encountered. This is akin to a panic. |
| [NotAcceptableError](NotAcceptableError.md) | This service doesn’t support the format requested in the Accept header. |
| [NotFoundError](NotFoundError.md) | Error thrown when a requested resource is not found. |
| [NotImplementedError](NotImplementedError.md) | Error thrown when a requested feature or functionality is not yet implemented. |
| [PaymentRequiredError](PaymentRequiredError.md) | The payment requirements for the API haven't been met. |
| [PreconditionFailedError](PreconditionFailedError.md) | A precondition provided in the request (such as an if-match header) doesn't match the resource's current state. |
| [ProtocolError](ProtocolError.md) | Error thrown when a response from the server does not conform to the expected protocol. |
| [RequestedRangeNotSatisfiableError](RequestedRangeNotSatisfiableError.md) | The specified byte range is invalid or unavailable. |
| [RequestEntityTooLargeError](RequestEntityTooLargeError.md) | The request size exceeds the maximum limit. |
| [RequestFailedError](RequestFailedError.md) | Can't process the request because it's malformed or incorrect. |
| [RequestTimeoutError](RequestTimeoutError.md) | Error thrown when a request exceeds the allowed time limit. |
| [ServiceUnavailableError](ServiceUnavailableError.md) | The service is temporarily unavailable for maintenance or is overloaded. You may repeat the request after a delay, the length of which may be specified in a Retry-After header. |
| [TooManyRequestsError](TooManyRequestsError.md) | Client application has been throttled and shouldn't attempt to repeat the request until an amount of time has elapsed. |
| [UnauthorizedError](UnauthorizedError.md) | Required authentication information is either missing or not valid for the resource. |
| [UnprocessableEntityError](UnprocessableEntityError.md) | Can't process the request because it is semantically incorrect. |
| [UnsupportedAddressTypeError](UnsupportedAddressTypeError.md) | Error thrown when a given address does not confirm to any known address type. |
| [UnsupportedMediaTypeError](UnsupportedMediaTypeError.md) | The content type of the request is a format that isn't supported by the service. |

## Models

| Module | Description |
| ------ | ------ |
| [AccessToken](AccessToken.md) | Token sent to server to authenticate a request. |
| [AccessTokenGenerator](AccessTokenGenerator.md) | Callback function that generates an access token. |
| [Address](Address.md) | Address of a set of cells in a spreadsheet. |
| [AzureApplicationCredentials](AzureApplicationCredentials-1.md) | Credentials used to authenticate an application with Azure. |
| [Border](Border.md) | Defining a border that could be on a cell. |
| [Cartesian](Cartesian.md) | Cartesian coordinates of a set of cells in a spreadsheet. |
| [Cell](Cell.md) | Cell in a worksheet. |
| [Color](Color.md) | Color has a hexadecimal representation (ie #ffffff"). |
| [Column](Column.md) | Column pointers. |
| [Context](Context-1.md) | Context of requests. |
| [Drive](Drive-1.md) | Drive pointers. |
| [DriveItem](DriveItem-1.md) | Drive item pointers. |
| [FontName](FontName.md) | Name of a font. |
| [GraphOperation](GraphOperation.md) | An atomic operation to be performed against the Microsoft Graph API. |
| [HostName](HostName.md) | Name of a remote host, resolvable by DNS. |
| [Http](Http-1.md) | HTTP models for handling HTTP requests and responses. |
| [Row](Row.md) | A linear sequency of cells in a worksheet. |
| [Site](Site-1.md) | Pointers to a site. |
| [Workbook](Workbook.md) | Pointers to a workbook. |
| [WorkbookNamedRange](WorkbookNamedRange.md) | Pointers to a named range in a worksheet. |
| [WorkbookPivotTable](WorkbookPivotTable-1.md) | Pointer for a pivot table in a worksheet. |
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
| [createBinaryWorkbook](createBinaryWorkbook.md) | Create a new blank binary workbook (XLSB). |
| [createDriveItem](createDriveItem.md) | Creates new drive item in the specified parent drive or folder. |
| [createFolder](createFolder.md) | Create a folder in the root of a drive, or in a folder. If it already exists do nothing. |
| [createWorkbook](createWorkbook.md) | Create a new blank workbook (XLSX). |
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
| [getSite](getSite.md) | Retrieve properties for a site resource. |
| [getSiteByName](getSiteByName.md) | Get a site by its name. |
| [getWorkbookNamedRange](getWorkbookNamedRange.md) | Retrieve a named range. |
| [getWorkbookPivotTable](getWorkbookPivotTable.md) | Retrieve a workbook pivot table. |
| [getWorkbookRangeAlignment](getWorkbookRangeAlignment.md) | Retrieve the format of a workbook range. |
| [getWorkbookRangeFill](getWorkbookRangeFill.md) | Retrieve the fill format of a workbook range. |
| [getWorkbookRangeFont](getWorkbookRangeFont.md) | Retrieve the font format of a workbook range. |
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
| [listDriveItems](listDriveItems.md) | Retrieve the metadata for items in a drive or folder. |
| [listDrives](listDrives.md) | Retrieve the list of accessible Drives in a Site. |
| [listSites](listSites.md) | List sites in your company geography. |
| [listSites](listSites-1.md) | List sites in all company geographies. |
| [listWorkbookRangeBorders](listWorkbookRangeBorders.md) | List the borders of a range. |
| [listWorkbookTableColumns](listWorkbookTableColumns.md) | Retrieve a list of columns in a table. |
| [listWorkbookTableRows](listWorkbookTableRows.md) | Retrieve a list of rows in a table. |
| [listWorkbookTables](listWorkbookTables.md) | Retrieve a list of tables in a worksheet. |
| [listWorkbookWorksheets](listWorkbookWorksheets.md) | Retrieve a list of worksheets in a workbook. |
| [mergeWorkbookRange](mergeWorkbookRange.md) | Merge a range of cells in a worksheet. |
| [moveDriveItem](moveDriveItem.md) | Moves a file to a new location in the same drive. |
| [refreshAllWorkbookPivotTables](refreshAllWorkbookPivotTables.md) | Refresh all pivot tables in a worksheet. |
| [refreshWorkbookPivotTable](refreshWorkbookPivotTable.md) | Refresh a specific pivot table in a worksheet. |
| [refreshWorkbookSession](refreshWorkbookSession.md) | Refresh a workbook session. |
| [searchSites](searchSites.md) | Find accessible sites that match the provided keywords. |
| [setWorkbookRangeBorder](setWorkbookRangeBorder.md) | Update a specific border of a workbook range. |
| [setWorkbookRangeFill](setWorkbookRangeFill.md) | Update the fill format of a workbook range. |
| [setWorkbookRangeFont](setWorkbookRangeFont.md) | Update the font format of a workbook range. |
| [setWorkbookRangeFormat](setWorkbookRangeFormat.md) | Update the general format of a workbook range. |
| [streamDriveItemContent](streamDriveItemContent.md) | Stream the content of a drive item as a Node.js readable stream. |
| [unmergeWorkbookRange](unmergeWorkbookRange.md) | Unmerge a merged range of cells in a worksheet. |
| [updateWorkbookNamedRange](updateWorkbookNamedRange.md) | Update a named range. |
| [updateWorkbookRange](updateWorkbookRange.md) | Update a range, including values and formatting. |
| [updateWorkbookWorksheet](updateWorkbookWorksheet.md) | Update the name, position, and/or visibility of a worksheet. |
| [userSendMail](userSendMail.md) | Send an email. |

## Other

| Module | Description |
| ------ | ------ |
| [services/sharepointUrl](services/sharepointUrl.md) | - |
| [tasks/getSiteByUrl](tasks/getSiteByUrl.md) | - |

## Services

| Module | Description |
| ------ | ------ |
| [addressManipulation](addressManipulation.md) | Utilities for manipulating and analyzing spreadsheet-style addresses (A1 notation). |
| [addressOffset](addressOffset.md) | Utilities for converting between spreadsheet column/row addresses and offsets. |
| [azureApplicationCredentials](azureApplicationCredentials.md) | Azure application credential helpers for authentication and token management. |
| [batch](batch.md) | Constants and helpers for batching Microsoft Graph API requests. |
| [cartesianAddress](cartesianAddress.md) | Utilities for converting between A1 addresses and Cartesian coordinates. |
| [CellFormat](CellFormat.md) | Cell utilities. |
| [context](context.md) | Context creation and management utilities for Microsoft Graph API authentication. |
| [drive](drive.md) | Utilities for working with Microsoft Graph Drive references and operations. |
| [driveItem](driveItem.md) | Utilities for working with Microsoft Graph Drive Items (files and folders). |
| [environmentVariable](environmentVariable.md) | Utilities for accessing environment variables with error handling and fallbacks. |
| [http](http.md) | HTTP request utilities for Microsoft Graph API, with proxy support. |
| [httpStatus](httpStatus.md) | Utilities for analyzing HTTP status codes for Microsoft Graph API responses. |
| [Iteration](Iteration.md) | Utilities for iterating over AsyncIterables. |
| [objectMapping](objectMapping.md) | Automated conversion of rows to objects and vice versa based on defined mapping rules. |
| [operationId](operationId.md) | Utilities for converting between operation IDs and indexes. |
| [operationInvoker](operationInvoker.md) | Invoke operations, potentially as parallel or sequential batches. |
| [random](random.md) | Utilities for generating random values for spreadsheet and API operations. |
| [rangeManipulation](rangeManipulation.md) | Utilities for inferring and manipulating spreadsheet ranges and objects. |
| [site](site.md) | Utilities for working with Microsoft Graph Site references and operations. |
| [sleep](sleep.md) | Utility for pausing execution (sleep) in async workflows. |
| [stringCaseConversion](stringCaseConversion.md) | Utilities for converting string case styles (e.g., kebab-case to camelCase). |
| [templatedPaths](templatedPaths.md) | Utilities for generating and parsing templated HTTP paths. |
| [temporaryFiles](temporaryFiles.md) | Utilities for generating temporary file names for use with Drive Items. |
| [workbookPivotTable](workbookPivotTable.md) | Utilities for working with workbook pivot tables and their references. |
| [workbookRange](workbookRange.md) | Utilities for working with workbook ranges and references. |
| [workbookTable](workbookTable.md) | Utilities for creating and working with workbook table references. |
| [workbookTableColumn](workbookTableColumn.md) | Utilities for creating and working with workbook table column references. |
| [workbookWorksheet](workbookWorksheet.md) | Utilities for creating and working with workbook worksheet references. |

## Tasks

| Module | Description |
| ------ | ------ |
| [copyDriveItem](copyDriveItem.md) | Copy a drive item. |
| [createWorkbookAndStartSession](createWorkbookAndStartSession.md) | Create a new workbook and open a session for that workbook. |
| [downloadDriveItemContent](downloadDriveItemContent.md) | Download a drive item and save it to the local disk. |
| [insertWorkbookRangeRow](insertWorkbookRangeRow.md) | Inserts a single row into a workbook range. |
| [insertWorkbookRangeRows](insertWorkbookRangeRows.md) | Inserts rows into a workbook range. |
| [iterateDriveItems](iterateDriveItems.md) | List drive items in a drive or a drive item. |
| [iterateDrives](iterateDrives.md) | List drives in a site as an async iterable. |
| [iterateSites](iterateSites.md) | List sites in your company geography as an async iterable. |
| [iterateSiteSearch](iterateSiteSearch.md) | Iterate accessible sites matching the provided search keywords as an async iterable. |
| [iterateWorkbookRangeRows](iterateWorkbookRangeRows.md) | Iterate over the rows in a given worksheet range. |
| [readWorkbookRangeFirstRow](readWorkbookRangeFirstRow.md) | Read the first row from a given workbook range. |
| [readWorkbookRangeRows](readWorkbookRangeRows.md) | Read all rows from a given workbook range. |
| [readWorkbookRows](readWorkbookRows.md) | Iterates over the rows in a given worksheet range. |
| [safeDeleteWorkbook](safeDeleteWorkbook.md) | Safely delete a workbook by first closing any open sessions and then deleting it. |
| [setColumnHidden](setColumnHidden.md) | Set one or more columns visibility. |
| [setRowHidden](setRowHidden.md) | Set one or more rows visibility. |
| [setWorkbookTableBodyVisibleRows](setWorkbookTableBodyVisibleRows.md) | Set visible rows of a workbook table with the provided 2D array of values, ignoring hidden rows and inserting new rows at the end if needed. |
| [tryCloseWorkbookSession](tryCloseWorkbookSession.md) | Try and close a workbook session. |
| [tryDeleteDriveItem](tryDeleteDriveItem.md) | Attempts to delete a drive item, returning success status. |
| [updateWorkbookRangeFirstRow](updateWorkbookRangeFirstRow.md) | Update first row in a given workbook range. |
| [updateWorkbookRangeRows](updateWorkbookRangeRows.md) | Update rows in a given workbook range. |
| [writeWorkbookRows](writeWorkbookRows.md) | Write rows to a workbook range. |
