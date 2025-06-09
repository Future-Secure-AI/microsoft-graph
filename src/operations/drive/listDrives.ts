/**
 * Retrieve the list of accessible Drives in a Site.
 * @module listDrives
 * @category Operations
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { DriveId } from "../../models/DriveId.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { createDriveRef } from "../../services/drive.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Retrieve the list of accessible Drives in a Site.
 * @param siteRef Reference to the site.
 * @returns An array of drives available for the specified site, each including its metadata and reference information.
 * @see https://learn.microsoft.com/en-us/graph/api/drive-list
 */
export default function listDrives(siteRef: SiteRef): GraphOperation<(DriveItem & DriveRef)[]> {
	return operation({
		context: siteRef.context,
		method: "GET",
		path: generatePath("/sites/{site-id}/drives", siteRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const list = response as { value: DriveItem[] };
			return list.value.map((drive) => {
				const ref = createDriveRef(siteRef, drive.id as DriveId);
				return {
					...drive,
					...ref,
				};
			});
		},
	});
}
