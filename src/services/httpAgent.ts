import { HttpProxyAgent } from "http-proxy-agent";
import type { HttpProxy } from "../models/HttpProxy.ts";

export function tryGetHttpAgent(httpProxy: HttpProxy | undefined): HttpProxyAgent<string> | undefined {
    if (!httpProxy) {
        return undefined;
    }
    return new HttpProxyAgent(httpProxy);
}