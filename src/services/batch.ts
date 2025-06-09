/**
 * Constants and helpers for batching Microsoft Graph API requests.
 * @module batch
 * @category Services
 */

/**
 * Maximum number of cells that can be retrieved in a single request, unless overwritten.
 * @remarks The Microsoft Graph API documentation does not specify a fixed maximum number of cells that can be retrieved in a single request.
 * However, it mentions that large ranges may result in errors due to resource constraints. Additionally, discussions in developer
 * communities suggest that requests exceeding 10,000 cells may encounter issues.
 */
export const maxCellsPerRequest = 10000;
