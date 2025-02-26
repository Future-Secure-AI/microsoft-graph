import { Client } from "@microsoft/microsoft-graph-client";
import { getCurrentAccessToken } from "./accessToken.js";

const segmentsToPath = (segments: string[]): string => {
    if (!segments.length) throw new Error("At least one segment must be provided");

    const concatenatedSegments = segments
        .map(encodeURIComponent)
        .join("/");

    return `/${concatenatedSegments}`;
};

const client = Client.init({
    authProvider: done => {
        getCurrentAccessToken() // Do not store the returned access token as it may expire
            .then(accessToken => {
                done(null, accessToken);
            })
            .catch((error: unknown) => {
                done(error, null);
            });
    }
});

export const get = async<T>(path: string | string[]): Promise<T> => {
    const normalisedPath = typeof path === "string" ? path : segmentsToPath(path);
    return await client.api(normalisedPath).get() as T;
}

export const patch = async (path: string | string[], data: unknown): Promise<void> => {
    const normalisedPath = typeof path === "string" ? path : segmentsToPath(path);
    await client.api(normalisedPath).patch(data);
};