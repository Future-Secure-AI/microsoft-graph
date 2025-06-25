/**
 * Pointers to a site.
 * @module Site
 * @category Models
 */

import type { Context } from "./Context.ts";

/**
 * Identifier for a site.
 */
export type SiteId = string & {
	__brand: "SiteId";
};

/**
 * Name of a site.
 */
export type SiteName = string & {
	__brand: "SiteName";
};

/**
 * Reference to a site.
 */
export type SiteRef = {
	context: Context;
	siteId: SiteId;
};
