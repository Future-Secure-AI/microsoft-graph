import { HttpProxyAgent } from "http-proxy-agent";
import { httpProxyEnv } from "./environmentVariable.ts";

export function getHttpAgent(): HttpProxyAgent<string> | undefined {
    const httpProxy = httpProxyEnv();

    if (!httpProxy) {
        return undefined;
    }
    return new HttpProxyAgent(httpProxy);
}