import type { AccessTokenGenerator } from "./AccessTokenGenerator.ts";

export type Context = {
	generateAccessToken: AccessTokenGenerator;
};
