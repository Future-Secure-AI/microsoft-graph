import fs from "fs/promises";
import https from "https";
import { basename } from "path";
import { fileURLToPath } from "url";

const inputUrl = "https://raw.githubusercontent.com/microsoftgraph/msgraph-typescript-typings/refs/heads/main/microsoft-graph.d.ts";
const outputFilePath = "src/microsoftGraph/models.d.ts";

const downloadFile = async (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download file: ${res.statusCode}`));
                return;
            }

            const scriptName = basename(fileURLToPath(import.meta.url));
            let data = `/*\n * DO NOT MODIFY THIS FILE, it is programmatically derived from ${url}.\n * Run ${scriptName} to regenerate.\n*/\n\n`;
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => resolve(data));
        }).on("error", reject);
    });
}

const writeFile = async (path: string, data: string): Promise<void> =>
    await fs.writeFile(path, data, "utf-8");

const fixWhiteSpace = (data: string): string =>
    data.replace(/\u202F/g, " ");

const fixAnyDataType = (data: string): string =>
    data.replace(/\bany\b/g, "unknown");

const fixLintDisables = (data: string): string =>
    "/* eslint-disable */\n" +
    "\n" +
    data.replace(
        /\/\/ tslint:disable-next-line: [a-z- ]+\n/g,
        "");

const linkStronglyTypedIds = (data: string): string =>
    "import type { DriveId, ItemId } from './drive.ts'\n" +
    "import type { SiteId } from './site.ts';\n\n" +
    data
        .replace(
            /export interface Entity\s*{[^}]*id\?: string;/g,
            "export interface Entity<TId = string> {\n    // The unique identifier for an entity. Read-only.\n    id?: TId;"
        )
        .replace(
            /export interface BaseItem<TId = string> extends Entity<TId>/g,
            "export interface BaseItem extends Entity"
        )
        .replace(
            "export interface Drive extends BaseItem {",
            "export interface Drive extends BaseItem<DriveId> {"
        )
        .replace(
            "export interface DriveItem extends BaseItem {",
            "export interface DriveItem extends BaseItem<ItemId> {"
        )
        .replace(
            "export interface Site extends BaseItem {",
            "export interface Site extends BaseItem<SiteId> {"
        )
    ;

let data = await downloadFile(inputUrl);
data = fixWhiteSpace(data);
data = fixAnyDataType(data);
data = fixLintDisables(data);
data = linkStronglyTypedIds(data);
await writeFile(outputFilePath, data);

console.log(`File saved to ${outputFilePath}`);