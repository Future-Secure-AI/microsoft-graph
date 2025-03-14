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

function toCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function generatePath(template: string, args: Record<string, string>): string {
	if (!template.startsWith("/")) throw new BadTemplateError("Path template must start with a slash.");
	if (template.includes("\n")) throw new BadTemplateError("Path template must not contain newlines.");

	return template.replace(/{(\w+)}/g, (key: string): string => {
		const camelCaseKey = toCamelCase(key);
		const value = args[camelCaseKey as keyof typeof args];
		if (value === undefined) throw new BadTemplateError(`Path template references argument '${camelCaseKey}' however no such argument provided.`);
		return encodeURIComponent(value);
	});
}

/** Perform a GET request on the Graph API. */
export async function apiGet<T>(pathTemplate: string, pathArgs: Record<string, string>): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return await client.api(path).get() as T;
}

/** Perform a POST request on the Graph API. */
export async function apiPost<T>(pathTemplate: string, pathArgs: Record<string, string>, data: unknown): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return await client.api(path).post(data) as T;
}

/** Perform a PUT request on the Graph API. */
export async function apiPut<T>(pathTemplate: string, pathArgs: Record<string, string>, data: unknown): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return await client.api(path).put(data) as T;
}

/** Perform a PATCH request on the Graph API. */
export async function apiPatch<T>(pathTemplate: string, pathArgs: Record<string, string>, data: unknown): Promise<T> {
	const path = generatePath(pathTemplate, pathArgs);
	return await client.api(path).patch(data) as T;
}

/** Perform a DELETE request on the Graph API. */
export async function apiDelete<T>(pathTemplate: string, pathArgs: Record<string, string>): Promise<void> {
	const path = generatePath(pathTemplate, pathArgs);
	await client.api(path).delete() as T;
}