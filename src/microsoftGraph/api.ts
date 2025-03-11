import { Client } from "@microsoft/microsoft-graph-client";
import { getCurrentAccessToken } from "../azureEntra/accessToken.js";
import BadTemplateError from "../errors/BadTemplateError.js";

// See https://learn.microsoft.com/en-us/graph/api/overview for more information on the Microsoft Graph API

const client = Client.init({
	authProvider: (done) => {
		getCurrentAccessToken() // Do not store the returned access token as it may expire
			.then((accessToken) => {
				done(null, accessToken);
			})
			.catch((error: unknown) => {
				done(error, null);
			});
	},
});

const generatePath = (pathTemplate: string, pathArgs: string[]): string => {
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

/**
 * Perform a GET request to the Microsoft Graph API with a raw path. PREFER TO USE `apiGet` INSTEAD, as it automatically escapes arguments.
 */
export const apiGetRaw = async <T>(path: string): Promise<T> => (await client.api(path).get()) as T;

/**
 * Perform a GET request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped.
 */
export const apiGet = async <T>(pathTemplate: string, pathArgs: string[]): Promise<T> => (await apiGetRaw<T>(generatePath(pathTemplate, pathArgs))) as T;

/**
 * Perform a POST request to the Microsoft Graph API with a raw path. PREFER TO USE `apiPost` INSTEAD, as it automatically escapes arguments.
 */
export const apiPostRaw = async <T>(path: string, data: unknown): Promise<T> => (await client.api(path).post(data)) as T;

/**
 * Perform a POST request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped.
 */
export const apiPost = async <T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> => (await apiPostRaw(generatePath(pathTemplate, pathArgs), data)) as T;

/**
 * Perform a PATCH request to the Microsoft Graph API with a raw path. PREFER TO USE `apiPatch` INSTEAD, as it automatically escapes arguments.
 */
export const apiPatchRaw = async (path: string, data: unknown): Promise<void> => {
	await client.api(path).patch(data);
};

/**
 * Perform a PATCH request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped.
 */
export const apiPatch = async (pathTemplate: string, pathArgs: string[], data: unknown): Promise<void> => {
	await apiPatchRaw(generatePath(pathTemplate, pathArgs), data);
};

/**
 * Perform a DELETE request to the Microsoft Graph API with a raw path. PREFER TO USE `apiDelete` INSTEAD, as it automatically escapes arguments.
 */
export const apiDeleteRaw = async (path: string): Promise<void> => {
	await client.api(path).delete();
};

/**
 * Perform a DELETE request to the Microsoft Graph API with an array of path segments. Segments are automatically escaped.
 */
export const apiDelete = async (pathTemplate: string, pathArgs: string[]): Promise<void> => {
	await apiDeleteRaw(generatePath(pathTemplate, pathArgs));
};
