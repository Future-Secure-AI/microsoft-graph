/**
 * Token sent to server to authenticate. It may be programmatically generated or prescribed.
 * @category Models
 */
export type AccessToken = string & {
	__brand: "AccessToken";
};
