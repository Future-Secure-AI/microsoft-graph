import type { ClientId } from "./ClientId.ts";
import type { ClientSecret } from "./ClientSecret.ts";
import type { TenantId } from "./TenantId.ts";

export type Context = {
	tenantId: TenantId;
	clientId: ClientId;
	clientSecret: ClientSecret;
};
