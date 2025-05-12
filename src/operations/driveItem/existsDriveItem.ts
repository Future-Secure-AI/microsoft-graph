import { authenticationScope, endpoint } from "../../graphApi.ts";
import type { DriveItemPath } from "../../models/DriveItemPath.ts";
import type { DriveRef } from "../../models/DriveRef.ts";
import { getCurrentAccessToken } from "../../services/accessToken.ts";
import { getContext } from "../../services/context.ts";
import { executeHttpRequest } from "../../services/http.ts";
import { isHttpNotFound, isHttpOk } from "../../services/httpStatus.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Check if a given drive item exists.
 *
 * @param itemRef - A reference to the drive item to be downloaded.
 * @returns If the drive item exists.
 */
export default async function existsDriveItem(driveRef: DriveRef, itemPath: DriveItemPath): Promise<boolean> {
	// Note this method doesn't match the standard pattern since the batching library doesn't support non-JSON return types.
	const url = `${endpoint}${generatePath(`/sites/{site-id}/drives/{drive-id}/root:${itemPath}`, driveRef)}`;
	const context = getContext(driveRef.contextId);
	const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);

	const response = await executeHttpRequest({
		url,
		method: "GET",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
		validateStatus: () => true,
	});

	if (isHttpOk(response.status)) {
		return true;
	}

	if (isHttpNotFound(response.status)) {
		return false;
	}

	throw new Error(`Unexpected response status: ${response.status} ${response.statusText}`);
}
