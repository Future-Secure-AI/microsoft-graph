/** GraphAPI Drive bindings. NO NOT ADD BUSINESS OR MANIPULATION LOGIC HERE! */

import { apiGet } from "../api.js";
import type { DriveItem } from "../models.js";
import type { SiteRef } from "../sites/site.js";

export type DriveId = string & { __brand: "DriveId" };
export type DriveRef = SiteRef & { driveId: DriveId };

export type ListDriveResponse = {
    "@odata.context": string;
    value: DriveItem[];
};

/** Retrieve the list of Drive resources available for a Site. @see https://learn.microsoft.com/en-us/graph/api/drive-list */
export async function listDrives(siteRef: SiteRef): Promise<ListDriveResponse> {
    return await apiGet<ListDriveResponse>("/sites/{site-id}/drives", siteRef, []);
}


