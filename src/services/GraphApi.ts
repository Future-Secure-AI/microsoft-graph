import { inject, injectable } from "inversify";
import AccessTokenGenerator from "./AccessTokenGenerator.js";
import { Client } from "@microsoft/microsoft-graph-client";

@injectable()
export default class GraphApi {
    public readonly client: Client;

    public constructor(
        @inject(AccessTokenGenerator)
        public readonly accessTokenGenerator: AccessTokenGenerator,
    ) {
        this.client = Client.init({
            authProvider: done => {
                this.accessTokenGenerator.getCurrent() // Do not store the returned access token as it may expire
                    .then(accessToken => {
                        done(null, accessToken)
                    })
                    .catch((error: unknown) => {
                        done(error, null);
                    });
            }
        });

        Object.freeze(this);
    }

    public async get<TResponse>(path: string | string[]): Promise<TResponse> {
        const normalisedPath = typeof path === "string" ? path : GraphApi.segmentsToPath(path);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        return await this.client.api(normalisedPath).get() as TResponse;
    }

    public async patch<TResponse>(path: string | string[], data: unknown): Promise<TResponse> {
        const normalisedPath = typeof path === "string" ? path : GraphApi.segmentsToPath(path);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        return await this.client.api(normalisedPath).patch(data) as TResponse;
    }

    private static segmentsToPath(segments: string[]): string {
        if (!segments.length) throw new Error("At least one segment must be provided");

        const concatenatedSegments = segments
            .map(encodeURIComponent)
            .join("/");

        return `/${concatenatedSegments}`;
    }
}