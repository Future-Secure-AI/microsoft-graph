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
	readonly __brand: unique symbol;
};

/**
 * Name of a site.
 */
export type SiteName = string & {
	readonly __brand: unique symbol;
};

/**
 * Reference to a site.
 */
export type SiteRef = {
	context: Context;
	siteId: SiteId;
};
