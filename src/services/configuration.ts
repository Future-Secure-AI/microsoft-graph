
import type { DriveId } from "../models/DriveId.ts";
import type { DriveRef } from "../models/DriveRef.ts";
import type { SiteId } from "../models/SiteId.ts";
import type { SiteRef } from "../models/SiteRef.ts";

const missingEnvironmentVariables: string[] = [];

function tryGetEnvironmentVariable(env: string, fallbackValue: string | null = null): string {
	const value = process.env[env]?.trim() ?? "";

	if (value === "") {
		if (fallbackValue === null) {
			missingEnvironmentVariables.push(env); // It's fatal if env is unset and there is no fallbackValue, however we want to report all of these in one batch..
		}
		return fallbackValue ?? "";
	}

	return value;
}

export const azureTenantId = tryGetEnvironmentVariable("AZURE_TENANT_ID");
export const azureClientId = tryGetEnvironmentVariable("AZURE_CLIENT_ID");
export const azureClientSecret = tryGetEnvironmentVariable("AZURE_CLIENT_SECRET");

export const defaultSiteId = tryGetEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID") as SiteId;
export const defaultDriveId = tryGetEnvironmentVariable("SHAREPOINT_DEFAULT_DRIVE_ID") as DriveId;
export const httpProxy = tryGetEnvironmentVariable("HTTP_PROXY", "");

export const defaultSiteRef = {
	siteId: defaultSiteId,
} as SiteRef;

export const defaultDriveRef = {
	siteId: defaultSiteId,
	driveId: defaultDriveId,
} as DriveRef;

if (missingEnvironmentVariables.length > 0) {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.error(`\x1b[31mFATAL: Required environment variable(s) ${missingEnvironmentVariables.join(", ")} missing, empty or whitespace.\x1b[0m`);
	process.exit(1);
}
