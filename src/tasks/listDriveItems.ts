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
 * List drive items in a drive or a drive item.
 * @param parentRef Parent drive or folder reference.
 * @param pageSize Number of items to fetch per request.
 * @returns
 * @remarks `pageSize` should only be set for advanced performance tuning.
 */
export default async function listDriveItems(parentRef: DriveRef | DriveItemRef, pageSize = 1000): Promise<(DriveItem & DriveItemRef)[]> {
	// TODO: Make async iterable
	const output: (DriveItem & DriveItemRef)[] = [];

	let result = await listDriveItemChildren(parentRef, pageSize);
	output.push(...result.value);

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

		const items = result.value.map((item) => {
			const itemRef = createDriveItemRef(parentRef, item.id as DriveItemId);

			return {
				...item,
				...itemRef,
			};
		});

		output.push(...items);
	}

	return output;
}
