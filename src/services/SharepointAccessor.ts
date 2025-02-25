import { injectable } from "inversify";
import DriveId from "../models/sharepoint/DriveId.js";
import ItemId from "../models/sharepoint/ItemId.js";
import ItemResponse from "../models/sharepoint/ItemResponse.js";
import RangeName from "../models/sharepoint/RangeName.js";
import RangeResponse from "../models/sharepoint/RangeResponse.js";
import { RangeValues } from "../models/sharepoint/RangeValues.js";
import SiteId from "../models/sharepoint/SiteId.js";
import WorksheetName from "../models/sharepoint/WorksheetName.js";
import GraphApi from "./GraphApi.js";
// https://github.com/Future-Secure-AI/fsai_flow/blob/bd8f309578df16a957ba59e034737e158e58d6c4/packages/fsai-utils/src/msgraph/sharepoint_client.ts

@injectable()
export default class SharepointAccessor {
    constructor(private readonly graphApi: GraphApi) {
        Object.freeze(this);
    }

    public async open(siteId: SiteId): Promise<SharePoint> {
        return new SharePoint(siteId, this.graphApi);
    }
}

export class SharePoint {
    constructor(
        private readonly siteId: SiteId,
        private readonly graphApi: GraphApi) {
        Object.freeze(this);
    }

    public async getItemIdForFile(driveId: DriveId, filePath: string): Promise<ItemId> {
        const response = await this.graphApi.get<ItemResponse>(["sites", this.siteId.toString(), "drives", driveId.toString(), `root:${filePath}`]);
        return ItemId.parse(response.id);
    }

    public async openWorkbook(driveId: DriveId, itemId: ItemId): Promise<Workbook> {
        return new Workbook(this.siteId, driveId, itemId, this.graphApi);
    }
}


export class Workbook {
    public constructor(
        private readonly siteId: SiteId,
        private readonly driveId: DriveId,
        private readonly itemId: ItemId,
        private readonly graphApi: GraphApi) {
        Object.freeze(this);
    }

    public openWorksheet(worksheetName: WorksheetName): Worksheet {
        return new Worksheet(this.siteId, this.driveId, this.itemId, worksheetName, this.graphApi);
    }

    public async getNamedRangeValues(name: RangeName): Promise<RangeValues> {
        const response = await this.graphApi.get<RangeResponse>(["sites", this.siteId.toString(), "drives", this.driveId.toString(), "items", this.itemId.toString(), "workbook", "names", name.toString(), "range"]);
        return response.values;
    }

    public async setNamedRangeValues(name: RangeName, values: RangeValues): Promise<void> {
        await this.graphApi.patch(["sites", this.siteId.toString(), "drives", this.driveId.toString(), "items", this.itemId.toString(), "workbook", "names", name.toString(), "range"], values);
    }
}

export class Worksheet {
    public constructor(
        private readonly siteId: SiteId,
        private readonly driveId: DriveId,
        private readonly itemId: ItemId,
        private readonly worksheetName: WorksheetName,
        private readonly graphApi: GraphApi) {
    }
    public async getUsedRangeValues(): Promise<RangeValues> {
        const response = await this.graphApi.get<RangeResponse>(["sites", this.siteId.toString(), "drives", this.driveId.toString(), "items", this.itemId.toString(), "workbook", "names", this.worksheetName.toString(), "range"]);
        return response.values
    }
}
