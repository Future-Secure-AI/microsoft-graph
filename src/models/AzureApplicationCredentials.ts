/**
 * Credentials used to authenticate an application with Azure.
 * @module AzureApplicationCredentials
 * @category Models
 */

/**
 * Application Client ID to authenticate with Azure.
 */
export type AzureClientId = string & {
	readonly __brand: unique symbol;
};

/**
 * Application Client secret to authenticate with Azure.
 */
export type AzureClientSecret = string & {
	readonly __brand: unique symbol;
};

/**
 * ID of tenant in Azure.
 */
export type AzureTenantId = string & {
	readonly __brand: unique symbol;
};

/**
 * Scope for which the access token is requested.
 * @remarks Typically, this is set to "https://graph.microsoft.com/.default" for Microsoft Graph API.
 */
export type Scope = string & {
	readonly __brand: unique symbol;
};
