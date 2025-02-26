import { get } from "./graphApia.js";

export type SiteId = string & { __brand: "SiteId" };
export type DriveId = string & { __brand: "DriveId" };
export type ItemId = string & { __brand: "ItemId" };
export type FilePath = string & { __brand: "FilePath" };

export type SiteReference = { siteId: SiteId };
export type DriveReference = SiteReference & { driveId: DriveId };
export type ItemReference = DriveReference & { itemId: ItemId };

export type ItemResponse = {
    id: ItemId;
    name?: string;
    size?: number;
    webUrl?: string;
}

export const getFileReferenceFromName = async (drive: DriveReference, filePath: FilePath): Promise<ItemResponse> =>
    get<ItemResponse>(`/sites/${encodeURIComponent(drive.siteId)}/drives/${encodeURIComponent(drive.driveId)}/root:${filePath}`); // `filePath` not escaped as it contains multiple segments
