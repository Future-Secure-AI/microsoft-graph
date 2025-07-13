/**
 * Name of a remote host, resolvable by DNS.
 * @module HostName
 * @category Models
 */
export type HostName = string & {
	readonly __brand: unique symbol;
};
