import type DriveId from "../models/sharepoint/DriveId.js";
import type ItemId from "../models/sharepoint/ItemId.js";
import type RangeResponse from "../models/sharepoint/RangeResponse.js";
import type { RangeValues } from "../models/sharepoint/RangeValues.js";
import type SiteId from "../models/sharepoint/SiteId.js";
import type WorksheetName from "../models/sharepoint/WorksheetName.js";
import type GraphApi from "./GraphApi.js";

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
