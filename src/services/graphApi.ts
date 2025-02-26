import { Client } from "@microsoft/microsoft-graph-client";
import { getCurrentAccessToken } from "./accessToken.js";

// See https://learn.microsoft.com/en-us/graph/api/overview for more information on the Microsoft Graph API

const segmentsToPath = (segments: string[]): string => {
    if (!segments.length) throw new Error("At least one segment must be provided");

    const concatenatedSegments = segments
        .map(encodeURIComponent) // https://learn.microsoft.com/en-us/graph/onedrive-addressing-driveitems#javascript says to use `escape()`, however it was deprecated and replaced by `encodeURIComponent`
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

export const apiGet = async<T>(path: string | string[]): Promise<T> => {
    const normalisedPath = typeof path === "string" ? path : segmentsToPath(path);
    return await client.api(normalisedPath).get() as T;
}

export const apiPost = async<T>(path: string | string[], data: unknown): Promise<T> => {
    const normalisedPath = typeof path === "string" ? path : segmentsToPath(path);
    return await client.api(normalisedPath).post(data) as T;
};

export const apiPatch = async (path: string | string[], data: unknown): Promise<void> => {
    const normalisedPath = typeof path === "string" ? path : segmentsToPath(path);
    await client.api(normalisedPath).patch(data);
};

export const apiDelete = async (path: string | string[]): Promise<void> => {
    const normalisedPath = typeof path === "string" ? path : segmentsToPath(path);
    await client.api(normalisedPath).delete();
};