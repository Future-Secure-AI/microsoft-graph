import DriveId from "../models/sharepoint/DriveId.js";
import ItemId from "../models/sharepoint/ItemId.js";
import RangeResponse from "../models/sharepoint/RangeResponse.js";
import { RangeValues } from "../models/sharepoint/RangeValues.js";
import SiteId from "../models/sharepoint/SiteId.js";
import WorksheetName from "../models/sharepoint/WorksheetName.js";
import GraphApi from "./GraphApi.js";


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
        return response.values;
    }
}
