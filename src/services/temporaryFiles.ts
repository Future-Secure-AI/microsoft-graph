import type { DriveItemPath } from "../models/DriveItemPath.ts";

export function generateTempFileName(extension: string | null = "tmp"): DriveItemPath {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const length = 16;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    return `~${result}.${extension}` as DriveItemPath;
}
