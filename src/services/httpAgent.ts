import { HttpProxyAgent } from "http-proxy-agent";
import { httpProxyEnv } from "./configuration.ts";

export function getHttpAgent(): HttpProxyAgent<string> | undefined {
    const httpProxy = httpProxyEnv();

    if (!httpProxy) {
        return undefined;
    }
    return new HttpProxyAgent(httpProxy);
}