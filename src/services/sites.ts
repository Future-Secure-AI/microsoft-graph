import { apiGet } from "./graphApi.js";

export type SiteId = string & { __brand: "SiteId" };
export type SiteReference = { site: SiteId };

export type UserInfo = {
    id: string;
    displayName: string;
    email?: string;
};

export type SiteDefinition = {
    id: SiteId;
    name: string;
    createdDateTime: string; // ISO 8601 date string
    lastModifiedDateTime: string; // ISO 8601 date string
    webUrl: string;
};

export type ListSitesReponse = {
    "@odata.context": string;
    value: SiteDefinition[];
};

/**
 * Search across a SharePoint tenant for sites that match keywords provided.
 * https://learn.microsoft.com/en-us/graph/api/site-search
 */
export const searchSites = async (search: string): Promise<ListSitesReponse> =>
    apiGet<ListSitesReponse>([
        "sites", `search=${search}`
    ]);

/**
 * Retrieve properties for a site resource.
 * https://learn.microsoft.com/en-us/graph/api/site-get
 */
export const getSite = async (site: SiteReference): Promise<SiteDefinition> =>
    apiGet<SiteDefinition>([
        "sites", site.site
    ]);

