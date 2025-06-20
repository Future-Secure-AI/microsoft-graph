/**
 * Retrieve the list of accessible Drives in a Site.
 * @module listDrives
 * @category Operations
 */

import type { Drive, DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveId, DriveRef } from "../../models/Drive.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteRef } from "../../models/Site.ts";
import { createDriveRef } from "../../services/drive.ts";
import { operation } from "../../services/operationInvoker.ts";
import { generatePath } from "../../services/templatedPaths.ts";

export type ListDrivesResponse = {
	value: (DriveItem & DriveRef)[];
	"@odata.nextLink": string | null;
};

export type DriveList = {
	drives: (Drive & DriveRef)[];
	nextLink: URL | null;
};

/**
 * Retrieve the list of accessible Drives in a Site.
 * @param siteRef Reference to the site.
 * @param take Maximum number of items to retrieve. Defaults to 1000.
 * @returns Array of drives available for the specified site, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/drive-list
 */
export default function listDrives(siteRef: SiteRef, take = 1000): GraphOperation<DriveList> {
	return operation({
		context: siteRef.context,
		method: "GET",
		path: generatePath(`/sites/{site-id}/drives?$top=${take}`, siteRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const result = response as ListDrivesResponse;

			return {
				drives: result.value.map((drive) => {
					const driveRef = createDriveRef(siteRef, drive.id as DriveId);

					return {
						...drive,
						...driveRef,
					};
				}),

				nextLink: result["@odata.nextLink"] ? new URL(result["@odata.nextLink"]) : null,
			};
		},
	});
}
