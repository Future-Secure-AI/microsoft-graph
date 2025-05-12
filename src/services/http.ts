import axios, { type AxiosInstance, type AxiosRequestConfig, type CreateAxiosDefaults } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

let instance: AxiosInstance | null = null;

export async function executeHttpRequest(config: AxiosRequestConfig) {
	if (!instance) {
		instance = createAxiosInstance();
	}

	return await instance(config);
}

function createAxiosInstance(): AxiosInstance {
	const config: CreateAxiosDefaults = {
		validateStatus: () => true,
	};

	// biome-ignore lint/complexity/useLiteralKeys: Accessing env
	const httpsProxy = process.env["HTTPS_PROXY"];
	if (httpsProxy) {
		config.proxy = false;
		config.httpsAgent = new HttpsProxyAgent(httpsProxy);
	}

	return axios.create(config);
}
