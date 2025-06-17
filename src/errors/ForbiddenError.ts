/**
 * Access is denied to the requested resource. The user might not have enough permission or might not have a required license.
 *
 * Important: If conditional access policies are applied to a resource, an HTTP 403; Forbidden error=insufficient_claims message may be returned. For more information on Microsoft Graph and conditional access, see Developer Guidance for Microsoft Entra Conditional Access.
 * @module ForbiddenError
 * @category Errors
 */
export default class ForbiddenError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ForbiddenError";
	}
}
