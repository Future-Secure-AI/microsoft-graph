import { apiGet } from "./api.js";
import type { Site } from "./models.d.ts";

export type SiteId = string & { __brand: "SiteId" };
export type SiteRef = { site: SiteId };

export type ListSitesReponse = {
	"@odata.context": string;
	value: Site[];
};

/**
 * Search across a SharePoint tenant for sites that match keywords provided.
 * https://learn.microsoft.com/en-us/graph/api/site-search
 */
export const searchSites = async (search: string): Promise<ListSitesReponse> => apiGet<ListSitesReponse>("/sites\\?search=?", [search]);

/**
 * Retrieve properties for a site resource.
 * https://learn.microsoft.com/en-us/graph/api/site-get
 */
export const getSite = async (ref: SiteRef): Promise<Site> => apiGet<Site>("/sites/?", [ref.site]);
