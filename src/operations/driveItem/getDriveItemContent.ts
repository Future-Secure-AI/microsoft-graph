import fetch from "node-fetch";
import { authenticationScope, endpoint } from "../../graphApi.ts";
import type { DriveItemRef } from "../../models/DriveItemRef.ts";
import { getCurrentAccessToken } from "../../services/accessToken.ts";
import { getContext } from "../../services/context.ts";
import { tryGetHttpAgent } from "../../services/httpAgent.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/**
 * Download the content of a drive item.
 *
 * @param itemRef - A reference to the drive item to be downloaded.
 * @returns The content of the drive item as an ArrayBuffer.
 * @throws Error if the download fails.
 * @see https://learn.microsoft.com/en-us/graph/api/driveitem-get-content
 */
export default async function getDriveItemContent(itemRef: DriveItemRef): Promise<ArrayBuffer> {
	// Note this method doesn't match the standard pattern since the batching library doesn't support non-JSON return types, and there appears to be no value in adding support.
	const url = `${endpoint}${generatePath("/sites/{site-id}/drives/{drive-id}/items/{item-id}/content", itemRef)}`;
	const context = getContext(itemRef.contextId);
	const accessToken = await getCurrentAccessToken(context.tenantId, context.clientId, context.clientSecret, authenticationScope);
	const agent = tryGetHttpAgent(context.httpProxy);

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
		agent,
	});

	if (!response.ok) {
		throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
	}

	return await response.arrayBuffer();
}
