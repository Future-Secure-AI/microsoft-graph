import { HttpsProxyAgent } from "https-proxy-agent";
import { httpProxyEnv } from "./configuration.ts";

export function getHttpAgent(): HttpsProxyAgent<string> | undefined {
    const httpProxy = httpProxyEnv();

    if (!httpProxy) {
        return undefined;
    }
    return new HttpsProxyAgent(httpProxy);
}