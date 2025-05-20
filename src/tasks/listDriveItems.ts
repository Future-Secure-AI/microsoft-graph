import type { DriveItem } from "@microsoft/microsoft-graph-types";
import { authenticationScope } from "../graphApi.ts";
import type { DriveItemId } from "../models/DriveItemId.ts";
import type { DriveItemRef } from "../models/DriveItemRef.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import listDriveItemChildren, { type ListDriveItemResponse } from "../operations/driveItem/listDriveItemChildren.ts";
import { getCurrentAccessToken } from "../services/accessToken.ts";
import { getContext } from "../services/context.ts";
import { createDriveItemRef } from "../services/driveItem.ts";
import { executeHttpRequest } from "../services/http.ts";

export default async function listDriveItems(parentRef: DriveRef | DriveItemRef, pageSize = 1000): Promise<(DriveItem & DriveItemRef)[]> {
	const output: (DriveItem & DriveItemRef)[] = [];

	let result = await listDriveItemChildren(parentRef, pageSize);
	output.push(...result.value);

	while (result["@odata.nextLink"]) {
		const context = getContext(parentRef.contextId);
		const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);

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
