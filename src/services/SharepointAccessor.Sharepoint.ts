import type DriveId from "../models/sharepoint/DriveId.js";
import type FilePath from "../models/sharepoint/FilePath.js";
import ItemId from "../models/sharepoint/ItemId.js";
import type ItemResponse from "../models/sharepoint/ItemResponse.js";
import type SiteId from "../models/sharepoint/SiteId.js";
import type GraphApi from "./GraphApi.js";
import Workbook from "./SharepointAccessor.Workbook.js";

export default class SharePoint {
    public constructor(
        private readonly siteId: SiteId,
        private readonly graphApi: GraphApi) {
        Object.freeze(this);
    }

    public async getItemIdForFile(driveId: DriveId, filePath: FilePath): Promise<ItemId> {
        const response = await this.graphApi.get<ItemResponse>(`/sites/${encodeURIComponent(this.siteId.toString())}/drives/${encodeURIComponent(driveId.toString())}/root:${filePath.toString()}`); // Not passing in segments as filePath is multiple segments in one
        return ItemId.parse(response.id);
    }

    // Expecting to add async logic here in the future
    // eslint-disable-next-line @typescript-eslint/require-await
    public async openWorkbook(driveId: DriveId, itemId: ItemId): Promise<Workbook> {
        return new Workbook(this.siteId, driveId, itemId, this.graphApi);
    }
}
