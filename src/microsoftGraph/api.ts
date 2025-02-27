import { Client } from "@microsoft/microsoft-graph-client";
import { getCurrentAccessToken } from "../azureEntra/accessToken.js";
import BadTemplateError from "../errors/BadTemplateError.js";

// See https://learn.microsoft.com/en-us/graph/api/overview for more information on the Microsoft Graph API

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
const generatePath = (pathTemplate: string, pathArgs: string[]): string => {
    if (!pathTemplate.startsWith("/")) {
        throw new BadTemplateError("Path template must start with a slash.");
    }

    let index = 0;
    return pathTemplate.replace(/\\?\?/ug, (match: string): string => {
        if (match === "\\?")
            return "?";

        const pathArg = pathArgs[index++];
        // eslint-disable-next-line no-undefined
        if (pathArg === undefined)
            throw new BadTemplateError("Not enough arguments provided for path template.");

        return encodeURIComponent(pathArg);
    });
};

export const apiGet = async<T>(pathTemplate: string, pathArgs: string[]): Promise<T> => {
    const path = generatePath(pathTemplate, pathArgs);
    return await client.api(path).get() as T;
};

export const apiPost = async<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> => {
    const path = generatePath(pathTemplate, pathArgs);
    return await client.api(path).post(data) as T;
};

export const apiPatch = async (pathTemplate: string, pathArgs: string[], data: unknown): Promise<void> => {
    const path = generatePath(pathTemplate, pathArgs);
    await client.api(path).patch(data);
};

export const apiDelete = async (pathTemplate: string, pathArgs: string[]): Promise<void> => {
    const path = generatePath(pathTemplate, pathArgs);
    await client.api(path).delete();
};