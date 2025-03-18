// TODO: Inject logging here

export function debug(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(`[DBG] ${msg}`);
}

export function info(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(`[INF] ${msg}`);
}

export function warn(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(`[WRN] ${msg}`);
}

export function error(msg: unknown): void {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(`[ERR] ${msg}`);
}