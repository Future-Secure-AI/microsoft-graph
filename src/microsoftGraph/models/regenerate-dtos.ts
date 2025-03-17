import fs from "node:fs/promises";
import https from "node:https";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const inputUrl = "https://raw.githubusercontent.com/microsoftgraph/msgraph-typescript-typings/refs/heads/main/microsoft-graph.d.ts";
const outputFilePath = `${dirname(fileURLToPath(import.meta.url))}/Dto.d.ts`;

async function downloadFile(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download file: ${res.statusCode}`));
                return;
            }

            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => resolve(data));
        }).on("error", reject);
    });
}

async function writeFile(path: string, data: string): Promise<void> {
    const payload = `/*\n * DO NOT MODIFY THIS FILE, it is programmatically generated.\n * Run \`npm run regenerate-dtos\` to regenerate.\n*/\n\n${data}`;
    return await fs.writeFile(path, payload, "utf-8");
}

function fixWhiteSpace(data: string): string {
    return data.replace(/\u202F/g, " ");
}

function fixAnyDataType(data: string): string {
    return data
        .replace(/: any\b/g, ": unknown")
        .replace(/\<any\>/g, "<unknown>");
}

function fixLintDisables(data: string): string {
    return data
        .replace(/\/\/ tslint:disable-next-line: [a-z- ]+\n/g, "");
}

function linkStronglyTypedIds(data: string): string {
    // biome-ignore lint/style/useTemplate: <explanation>
    return `import type { DriveId } from './DriveId.ts'\n` +
        `import type { DriveItemId } from './DriveItemId.ts'\n` +
        `import type { SiteId } from './SiteId.ts';\n\n` +
        data
            .replace(
                /export interface Entity\s*{[^}]*id\?: string;/g,
                "export interface Entity<TId = string> {\n    // The unique identifier for an entity. Read-only.\n    id?: TId;"
            )
            .replace(
                "export interface BaseItem extends Entity",
                "export interface BaseItem<TId = string> extends Entity<TId>"
            )
            .replace(
                "export interface Site extends BaseItem",
                "export interface Site extends BaseItem<SiteId>"
            )
            .replace(
                "export interface Drive extends BaseItem",
                "export interface Drive extends BaseItem<DriveId>"
            )
            .replace(
                "export interface DriveItem extends BaseItem",
                "export interface DriveItem extends BaseItem<DriveItemId>"
            )
            .replace(
                "export interface Workbook extends Entity",
                "export interface Workbook extends Entity<DriveItemId>"
            );
}

function fixNamespaces(data: string): string {
    return data
        .replace(/microsoftgraph\./g, "")
        .replace(/Partners\.Billing\.Billing/g, "unknown"); // Workaround possible incorrect ordering. Not worth time to investigate
}

let data = await downloadFile(inputUrl);
data = fixWhiteSpace(data);
data = fixAnyDataType(data);
data = fixLintDisables(data);
data = fixNamespaces(data);
data = linkStronglyTypedIds(data);
await writeFile(outputFilePath, data);

console.log(`File saved to ${outputFilePath}`);