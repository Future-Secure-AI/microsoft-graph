/** Low level type-safe API for GraphAPI @see https://learn.microsoft.com/en-us/graph/api/overview */

import { Client } from "@microsoft/microsoft-graph-client";
import { getCurrentAccessToken, type Scope } from "../azureEntra/accessToken.js";
import BadTemplateError from "./BadTemplateError.js";


const scope = "https://graph.microsoft.com/.default" as Scope;

const client = Client.init({
	authProvider: (done) => {
		getCurrentAccessToken(scope) // Do not store the returned access token as it may expire
			.then((accessToken) => {
				done(null, accessToken);
			})
			.catch((error: unknown) => {
				done(error, null);
			});
	},
});

function generatePath(pathTemplate: string, pathArgs: string[]): string {
	if (!pathTemplate.startsWith("/")) throw new BadTemplateError("Path template must start with a slash.");

	let index = 0;
	const result = pathTemplate.replace(/\\?\?/gu, (match: string): string => {
		if (match === "\\?") return "?";

		const pathArg = pathArgs[index++];
		if (pathArg === undefined) throw new BadTemplateError("Not enough arguments provided for path template.");

		return encodeURIComponent(pathArg);
	});

	if (index < pathArgs.length) throw new BadTemplateError("Too many arguments provided for path template.");

	return result;
};

/** Perform a GET request to the Microsoft Graph API with a raw path. PREFER TO USE `apiGet` INSTEAD, as it automatically escapes arguments. */
export async function apiGetRaw<T>(path: string): Promise<T> {
	return (await client.api(path).get()) as T;
}

/** Perform a GET request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped. */
export async function apiGet<T>(pathTemplate: string, pathArgs: string[]): Promise<T> {
	return (await apiGetRaw<T>(generatePath(pathTemplate, pathArgs))) as T;
}

/** Perform a POST request to the Microsoft Graph API with a raw path. PREFER TO USE `apiPost` INSTEAD, as it automatically escapes arguments. */
export async function apiPostRaw<T>(path: string, data: unknown): Promise<T> {
	return (await client.api(path).post(data)) as T;
}

/** Perform a POST request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped. */
export async function apiPost<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> {
	return (await apiPostRaw(generatePath(pathTemplate, pathArgs), data)) as T;
}

/** Perform a PUT request to the Microsoft Graph API with a raw path. PREFER TO USE `apiPut` INSTEAD, as it automatically escapes arguments. */
export async function apiPutRaw<T>(path: string, data: unknown): Promise<T> {
	return (await client.api(path).put(data)) as T;
}

/** Perform a PUT request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped. */
export async function apiPut<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> {
	return (await apiPutRaw(generatePath(pathTemplate, pathArgs), data)) as T;
}

/** Perform a PATCH request to the Microsoft Graph API with a raw path. PREFER TO USE `apiPatch` INSTEAD, as it automatically escapes arguments. */
export async function apiPatchRaw<T>(path: string, data: unknown): Promise<T> {
	return (await client.api(path).patch(data)) as T;
}

/** Perform a PATCH request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped. */
export async function apiPatch<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> {
	return await apiPatchRaw<T>(generatePath(pathTemplate, pathArgs), data);
}

/** Perform a DELETE request to the Microsoft Graph API with a raw path. PREFER TO USE `apiDelete` INSTEAD, as it automatically escapes arguments. */
export async function apiDeleteRaw(path: string): Promise<void> {
	await client.api(path).delete();
}

/** Perform a DELETE request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped. */
export async function apiDelete(pathTemplate: string, pathArgs: string[]): Promise<void> {
	await apiDeleteRaw(generatePath(pathTemplate, pathArgs));
}