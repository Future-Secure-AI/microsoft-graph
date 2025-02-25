import DriveId from "../models/sharepoint/DriveId.js";
import FilePath from "../models/sharepoint/FilePath.js";
import ItemId from "../models/sharepoint/ItemId.js";
import ItemResponse from "../models/sharepoint/ItemResponse.js";
import SiteId from "../models/sharepoint/SiteId.js";
import GraphApi from "./GraphApi.js";
import { Workbook } from "./SharepointAccessor.Workbook.js";


export class SharePoint {
    constructor(
        private readonly siteId: SiteId,
        private readonly graphApi: GraphApi) {
        Object.freeze(this);
    }

    public async getItemIdForFile(driveId: DriveId, filePath: FilePath): Promise<ItemId> {
        const response = await this.graphApi.get<ItemResponse>(["sites", this.siteId.toString(), "drives", driveId.toString(), `root:${filePath}`]);
        return ItemId.parse(response.id);
    }

    public async openWorkbook(driveId: DriveId, itemId: ItemId): Promise<Workbook> {
        return new Workbook(this.siteId, driveId, itemId, this.graphApi);
    }
}
