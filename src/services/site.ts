import ProtocolError from "../errors/ProtocolError.ts";
import type { Context } from "../models/Context.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { SiteRef } from "../models/SiteRef.ts";
import { getDefaultContextRef } from "./context.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";

/**
 * Creates a reference to a site.
 * @param context - The reference to the context.
 * @param siteId - The ID of the site.
 * @returns A reference to the site.
 * @throws ProtocolError if the site ID is missing.
 */
export function createSiteRef(context: Context, siteId: SiteId | undefined): SiteRef {
	if (!siteId) {
		throw new ProtocolError("SiteID is missing");
	}

	return {
		context,
		siteId,
	};
}

/**
 * Retrieves the opinionated default site reference. NOT RECOMMENDED FOR PRODUCTION USE
 * @returns A reference to the default site.
 * @remarks This method is opinionated and not recommended for production use.
 */
export function getDefaultSiteRef(): SiteRef {
	const contextRef = getDefaultContextRef();
	const siteId = getEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID") as SiteId;

	const siteRef = createSiteRef(contextRef, siteId);

	return siteRef;
}
