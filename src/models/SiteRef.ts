// TODO: Move to Site.ts
/**
 * Reference to a site.
 * @module SiteRef
 * @category Models
 */
import type { Context } from "./Context.ts";
import type { SiteId } from "./SiteId.ts";

export type SiteRef = {
	context: Context;
	siteId: SiteId;
};
