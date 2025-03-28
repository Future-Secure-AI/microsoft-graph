import type { Site } from "@microsoft/microsoft-graph-types";
import { operation } from "../../graphApi.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { SiteRef } from "../../models/SiteRef.ts";
import { generatePath } from "../../services/templatedPaths.ts";

/** Retrieve properties for a site resource. @see https://learn.microsoft.com/en-us/graph/api/site-get */
export default function getSite(siteRef: SiteRef): GraphOperation<Site & SiteRef> {
	return operation({
		contextId: siteRef.contextId,
		method: "GET",
		path: generatePath("/sites/{site-id}", siteRef),
		headers: {},
		body: null,
		responseTransform: (response) => {
			const site = response as Site;
			return {
				...site,
				...siteRef,
			};
		},
	});
}
