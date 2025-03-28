import ProtocolError from "../errors/ProtocolError.ts";
import type { ContextRef } from "../models/ContextRef.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { SiteRef } from "../models/SiteRef.ts";
import { getDefaultContextRef } from "./context.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";

export function createSiteRef(contextRef: ContextRef, siteId: SiteId | undefined): SiteRef {
	if (!siteId) {
		throw new ProtocolError("SiteID is missing");
	}

	return {
		contextId: contextRef.contextId,
		siteId,
	};
}

/** Opinionated method of getting default site reference. Not recommended for production use. */
export function getDefaultSiteRef(): SiteRef {
	const contextRef = getDefaultContextRef();
	const siteId = getEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID") as SiteId;

	const siteRef = createSiteRef(contextRef, siteId);

	return siteRef;
}
