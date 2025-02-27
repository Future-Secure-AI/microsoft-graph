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
    if (!pathTemplate.startsWith("/"))
        throw new BadTemplateError("Path template must start with a slash.");

    let index = 0;
    const result = pathTemplate.replace(/\\?\?/ug, (match: string): string => {
        if (match === "\\?")
            return "?";

        const pathArg = pathArgs[index++];
        // eslint-disable-next-line no-undefined
        if (pathArg === undefined)
            throw new BadTemplateError("Not enough arguments provided for path template.");

        return encodeURIComponent(pathArg);
    });

    if (index < pathArgs.length)
        throw new BadTemplateError("Too many arguments provided for path template.");

    return result;
};

export const apiGetRaw = async<T>(path: string): Promise<T> =>
    await client.api(path).get() as T
export const apiGet = async<T>(pathTemplate: string, pathArgs: string[]): Promise<T> =>
    await apiGetRaw<T>(generatePath(pathTemplate, pathArgs)) as T;

export const apiPostRaw = async<T>(path: string, data: unknown): Promise<T> =>
    await client.api(path).post(data) as T
export const apiPost = async<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> =>
    await apiPostRaw(generatePath(pathTemplate, pathArgs), data) as T;

export const apiPatchRaw = async (path: string, data: unknown): Promise<void> => {
    await client.api(path).patch(data);
}
export const apiPatch = async (pathTemplate: string, pathArgs: string[], data: unknown): Promise<void> => {
    await apiPatchRaw(generatePath(pathTemplate, pathArgs), data);
}

export const apiDeleteRaw = async (path: string): Promise<void> => {
    await client.api(path).delete();
}
export const apiDelete = async (pathTemplate: string, pathArgs: string[]): Promise<void> => {
    await apiDeleteRaw(generatePath(pathTemplate, pathArgs));
}
