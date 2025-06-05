import type { AccessToken } from "./AccessToken.ts";

export type AccessTokenGenerator = () => Promise<AccessToken>;
