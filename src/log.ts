export function debug(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(`\x1b[90m[DBG] ${msg}\x1b[0m`);
}

export function info(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.info(`\x1b[37m[INF] ${msg}\x1b[0m`);
}

export function warn(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.warn(`\x1b[33m[WRN] ${msg}\x1b[0m`);
}

export function error(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(`\x1b[31m[ERR] ${msg}\x1b[0m`);
}