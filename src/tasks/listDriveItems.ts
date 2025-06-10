/**
 * List drive items in a drive or a drive item.
 * @module listDriveItems
 * @category Tasks
 */

import type { DriveItem } from "@microsoft/microsoft-graph-types";
import type { DriveRef } from "../models/Drive.ts";
import type { DriveItemId, DriveItemRef } from "../models/DriveItem.ts";
import listDriveItemChildren, { type ListDriveItemResponse } from "../operations/driveItem/listDriveItemChildren.ts";
import { createDriveItemRef } from "../services/driveItem.ts";
import { executeHttpRequest } from "../services/http.ts";

/**
 * List drive items in a drive or a drive item as an async iterable.
 * @param parentRef Parent drive or folder reference.
 * @param maxPerChunk Number of items to fetch per request. DO NOT SET EXCEPT FOR ADVANCED TUNING.
 * @returns Async iterable of drive items.
 * @remarks `pageSize` should only be set for advanced performance tuning.
 */
export default async function* listDriveItems(parentRef: DriveRef | DriveItemRef, maxPerChunk = 1000): AsyncGenerator<DriveItem & DriveItemRef> {
	let result = await listDriveItemChildren(parentRef, maxPerChunk);

	for (const item of result.value) {
		const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);
		yield {
			...item,
			...itemRef,
		};
	}

	while (result["@odata.nextLink"]) {
		const accessToken = await parentRef.context.generateAccessToken();

		const response = await executeHttpRequest({
			url: result["@odata.nextLink"],
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		result = response.data as ListDriveItemResponse;

		for (const item of result.value) {
			const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);
			yield {
				...item,
				...itemRef,
			};
		}
	}
}
