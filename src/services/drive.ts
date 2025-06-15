/**
 * Utilities for working with Microsoft Graph Drive references and operations.
 * @module drive
 * @category Services
 */

import ProtocolError from "../errors/ProtocolError.ts";
import type { AzureClientId, AzureClientSecret, AzureTenantId } from "../models/AzureApplicationCredentials.ts";
import type { DriveId, DriveRef } from "../models/Drive.ts";
import type { SiteId, SiteRef } from "../models/Site.ts";
import { createClientSecretContext, register } from "./context.ts";
import { getEnvironmentVariable } from "./environmentVariable.ts";
import { createSiteRef } from "./site.ts";

/**
 * Creates a reference to a drive.
 * @param siteRef - The reference to the site.
 * @param driveId - The ID of the drive.
 * @returns A reference to the drive.
 * @throws ProtocolError if the drive ID is missing.
 */
export function createDriveRef(siteRef: SiteRef, driveId: DriveId | undefined): DriveRef {
	if (!driveId) {
		throw new ProtocolError("DriveId is missing");
	}

	return {
		context: siteRef.context,
		siteId: siteRef.siteId,
		driveId,
	};
}

/** Creates a context with a reference to a drive. */
export function createClientSecretContextWithDriveRef(tenantId: AzureTenantId, clientId: AzureClientId, clientSecret: AzureClientSecret, siteId: SiteId, driveId: DriveId): DriveRef {
	const context = createClientSecretContext(tenantId, clientId, clientSecret);
	const siteRef = createSiteRef(context, siteId);
	const driveRef = createDriveRef(siteRef, driveId);
	return driveRef;
}

/**
 * Retrieves the opinionated default drive reference. NOT RECOMMENDED FOR PRODUCTION USE.
 * @returns A reference to the default drive.
 * @remarks This method is opinionated and not recommended for production use.
 * @deprecated Use `createClientSecretContextWithDriveRef()` instead.
 * @hidden
 */
export function getDefaultDriveRef(): DriveRef {
	const tenantId = getEnvironmentVariable("AZURE_TENANT_ID") as AzureTenantId;
	const clientId = getEnvironmentVariable("AZURE_CLIENT_ID") as AzureClientId;
	const clientSecret = getEnvironmentVariable("AZURE_CLIENT_SECRET") as AzureClientSecret;
	const siteId = getEnvironmentVariable("SHAREPOINT_DEFAULT_SITE_ID") as SiteId;
	const driveId = getEnvironmentVariable("SHAREPOINT_DEFAULT_DRIVE_ID") as DriveId;

	const contextRef = register(tenantId, clientId, clientSecret);
	const siteRef = createSiteRef(contextRef, siteId);
	const driveRef = createDriveRef(siteRef, driveId);

	return driveRef;
}
