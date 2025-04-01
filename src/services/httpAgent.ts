import { HttpsProxyAgent } from "https-proxy-agent";
import type { HttpProxy } from "../models/HttpProxy.ts";

/**
 * Attempts to create an HTTP agent for a given proxy configuration.
 * @param httpProxy - The HTTP proxy configuration.
 * @returns An instance of HttpsProxyAgent if the proxy is defined, otherwise undefined.
 */
export function tryGetHttpAgent(httpProxy: HttpProxy | undefined): HttpsProxyAgent<string> | undefined {
	if (!httpProxy) {
		return undefined;
	}
	return new HttpsProxyAgent(httpProxy);
}
