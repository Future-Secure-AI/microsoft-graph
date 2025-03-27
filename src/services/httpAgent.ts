import { HttpsProxyAgent } from "https-proxy-agent";
import type { HttpProxy } from "../models/HttpProxy.ts";

export function tryGetHttpAgent(httpProxy: HttpProxy | undefined): HttpsProxyAgent<string> | undefined {
    if (!httpProxy) {
        return undefined;
    }
    return new HttpsProxyAgent(httpProxy);
}