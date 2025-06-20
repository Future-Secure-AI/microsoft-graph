/**
 * List drive items in a drive or a drive item.
 * @module iterateDriveItems
 * @category Tasks
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveRef } from "../models/Drive.ts";
import type { DriveItemId, DriveItemRef } from "../models/DriveItem.ts";
import listDriveItems from "../operations/driveItem/listDriveItems.ts";
import { createDriveItemRef } from "../services/driveItem.ts";
import { executeHttpRequest } from "../services/http.ts";

/**
 * List drive items in a drive or a drive item as an async iterable.
 * @param parentRef Parent drive or folder reference.
 * @param maxPerChunk Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @returns Async iterable of drive items.
 * @remarks `pageSize` should only be set for advanced performance tuning.
 */
export default async function* iterateDriveItems(parentRef: DriveRef | DriveItemRef, maxPerChunk = 1000): AsyncGenerator<DriveItem & DriveItemRef> {
	let { items, nextLink } = await listDriveItems(parentRef, maxPerChunk);

	for (const item of items) {
		yield item;
	}

	while (nextLink) {
		const accessToken = await parentRef.context.generateAccessToken();

		const response = await executeHttpRequest({
			url: nextLink.toString(),
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		const result = response.data as { value: (DriveItem & DriveItemRef)[]; "@odata.nextLink"?: string };
		const newItems = result.value.map((item) => (createDriveItemRef(parentRef, item.id as DriveItemId) ? { ...item, ...createDriveItemRef(parentRef, item.id as DriveItemId) } : item));
		nextLink = result["@odata.nextLink"] ? new URL(result["@odata.nextLink"]) : null;

		for (const item of newItems) {
			yield item;
		}
	}
}
