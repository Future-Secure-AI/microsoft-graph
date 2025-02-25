import DriveId from "../models/sharepoint/DriveId.js";
import ItemId from "../models/sharepoint/ItemId.js";
import RangeName from "../models/sharepoint/RangeName.js";
import RangeResponse from "../models/sharepoint/RangeResponse.js";
import { RangeValues } from "../models/sharepoint/RangeValues.js";
import SiteId from "../models/sharepoint/SiteId.js";
import WorksheetName from "../models/sharepoint/WorksheetName.js";
import GraphApi from "./GraphApi.js";
import { Worksheet } from "./SharepointAccessor.Worksheet.js";


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
