import { inject, injectable } from "inversify";
import SiteId from "../models/sharepoint/SiteId.js";
import GraphApi from "./GraphApi.js";
import SharePoint from "./SharepointAccessor.Sharepoint.js";

/*
* This is a more structure approach to what has been implemented in https://github.com/Future-Secure-AI/fsai_flow/blob/bd8f309578df16a957ba59e034737e158e58d6c4/packages/fsai-utils/src/msgraph/sharepoint_client.ts
*/

@injectable()
export default class SharepointAccessor {
    public constructor(
        @inject(GraphApi)
        private readonly graphApi: GraphApi) {
        Object.freeze(this);
    }

    // Expecting to add async here in the future
    // eslint-disable-next-line @typescript-eslint/require-await 
    public async open(siteId: SiteId): Promise<SharePoint> {
        return new SharePoint(siteId, this.graphApi);
    }
}


