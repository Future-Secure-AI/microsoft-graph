/**
 * List drives in a site as an async iterable.
 * @module iterateDrives
 * @category Tasks
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveRef } from "../models/Drive.ts";
import type { SiteRef } from "../models/Site.ts";
import listDrives from "../operations/drive/listDrives.ts";
import { executeHttpRequest } from "../services/http.ts";

/**
 * List drives in a site as an async iterable.
 * @param siteRef Reference to the site.
 * @param maxPerChunk Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @returns Async iterable of drives.
 * @remarks `pageSize` should only be set for advanced performance tuning.
 */
export default async function* iterateDrives(siteRef: SiteRef, maxPerChunk = 1000): AsyncGenerator<DriveItem & DriveRef> {
	let { drives, nextLink } = await listDrives(siteRef, maxPerChunk);

	for (const drive of drives) {
		yield drive;
	}

	while (nextLink) {
		const accessToken = await siteRef.context.generateAccessToken();

		const response = await executeHttpRequest({
			url: nextLink.toString(),
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});
		const result = response.data as { value: (DriveItem & DriveRef)[]; "@odata.nextLink"?: string };
		drives = result.value;
		nextLink = result["@odata.nextLink"] ? new URL(result["@odata.nextLink"]) : null;

		for (const drive of drives) {
			yield drive;
		}
	}
}
