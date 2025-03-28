import type { ContextRef } from "./ContextRef.ts";
import type { SiteId } from "./SiteId.ts";

export type SiteRef = ContextRef & {
	siteId: SiteId;
};
