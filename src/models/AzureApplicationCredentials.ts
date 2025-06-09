/**
 * Credentials used to authenticate an application with Azure.
 * @module AzureApplicationCredentials
 * @category Models
 */

/**
 * Application Client ID to authenticate with Azure.
 */
export type AzureClientId = string & {
	__brand: "AzureClientId";
};

/**
 * Application Client secret to authenticate with Azure.
 */
export type AzureClientSecret = string & {
	__brand: "AzureClientSecret";
};

/**
 * ID of tenant in Azure.
 */
export type AzureTenantId = string & {
	__brand: "AzureTenantId";
};

/**
 * Scope for which the access token is requested.
 * @remarks Typically, this is set to "https://graph.microsoft.com/.default" for Microsoft Graph API.
 */
export type Scope = string & {
	__brand: "Scope";
};
