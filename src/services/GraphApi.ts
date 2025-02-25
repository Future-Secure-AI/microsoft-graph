import { inject, injectable } from "inversify";
import AccessTokenGenerator from "./AccessTokenGenerator.js";
import { Client } from "@microsoft/microsoft-graph-client";

@injectable()
export default class GraphApi {
    public readonly client: Client;

    constructor(
        @inject(AccessTokenGenerator)
        public readonly accessTokenGenerator: AccessTokenGenerator,
    ) {
        this.client = Client.init({
            authProvider: async done => {
                const accessToken = await this.accessTokenGenerator.getCurrent(); // Do not store the returned access token as it may expire
                done(null, accessToken)
            }
        });

        Object.freeze(this);
    }

    public async get<TResponse>(path: string | string[]): Promise<TResponse> {
        path = typeof path === "string" ? path : this.segmentsToPath(path);
        return await this.client.api(path).get() as TResponse;
    }

    public async patch<TRequest, TResponse>(path: string | string[], data: TRequest): Promise<TResponse> {
        path = typeof path === "string" ? path : this.segmentsToPath(path);
        return await this.client.api(path).patch(data) as TResponse;
    }

    private segmentsToPath(segments: string[]) {
        if (!segments.length) throw new Error("At least one segment must be provided");

        return "/" + segments
            .map(encodeURIComponent)
            .join("/");
    }
}