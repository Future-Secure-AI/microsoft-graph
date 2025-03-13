/** Low level type-safe API for GraphAPI @see https://learn.microsoft.com/en-us/graph/api/overview */

import { Client } from "@microsoft/microsoft-graph-client";
import { getCurrentAccessToken, type Scope } from "../azureEntra/accessToken.js";
import BadTemplateError from "./BadTemplateError.js";

const scope = "https://graph.microsoft.com/.default" as Scope;

export const client = Client.init({
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
}

/** Perform a GET request on the Graph API. */
export async function apiGet<T>(pathTemplate: string, pathArgs: string[]): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return (await client.api(path).get()) as T;
}

/** Perform a POST request on the Graph API. */
export async function apiPost<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return (await client.api(path).post(data)) as T;
}

/** Perform a PUT request on the Graph API. */
export async function apiPut<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return (await client.api(path).put(data)) as T;
}

/** Perform a PATCH request on the Graph API. */
export async function apiPatch<T>(pathTemplate: string, pathArgs: string[], data: unknown): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return (await client.api(path).patch(data)) as T;
}

/** Perform a DELETE request on the Graph API. */
export async function apiDelete(pathTemplate: string, pathArgs: string[]): Promise<void> {
	const path = generatePath(pathTemplate, pathArgs);
	await client.api(path).delete();
}