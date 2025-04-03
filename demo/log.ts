export function debug(msg: unknown): void {
	console.debug(`\x1b[90m[DBG] ${msg}\x1b[0m`);
}

export function info(msg: unknown): void {
	console.info(`\x1b[37m[INF] ${msg}\x1b[0m`);
}

export function warn(msg: unknown): void {
	console.warn(`\x1b[33m[WRN] ${msg}\x1b[0m`);
}

export function error(msg: unknown): void {
	console.error(`\x1b[31m[ERR] ${msg}\x1b[0m`);
}
