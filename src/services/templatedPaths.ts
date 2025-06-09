import BadPathTemplateError from "../errors/BadPathTemplateError.ts";
import type { GraphPath } from "../models/GraphOperation.ts";
import { kebabToCamelCase } from "./stringCaseConversion.ts";

const argumentPattern = /\{([a-z-]+)\}/g;

/**
 * Generates a HTTP path based on a template and arguments. Arguments are automatically escaped.
 * @param template - The path template, which must start with a slash.
 * @param args - A record of arguments to replace placeholders in the template.
 * @returns The generated Graph API path.
 * @throws BadTemplateError if the template is invalid or required arguments are missing.
 */
export function generatePath(template: string, args: Record<string, unknown>): GraphPath {
	if (!template.startsWith("/")) {
		throw new BadPathTemplateError(`Path template '${template}' must start with a slash.`);
	}
	if (template.includes("\n")) {
		throw new BadPathTemplateError("Path template must not contain newlines.");
	}

	return template.replace(argumentPattern, (_: string, match: string): string => {
		const camelCaseKey = kebabToCamelCase(match);
		const value = args[camelCaseKey as keyof typeof args];
		if (value === undefined || value === null) {
			throw new BadPathTemplateError(`Path template references argument '${camelCaseKey}' however no such argument provided.`);
		}
		if (typeof value !== "string" && typeof value !== "number") {
			throw new BadPathTemplateError(`Path template references argument '${camelCaseKey}' which is of type ${typeof value}, but only strings and numbers are allowed.`);
		}
		return encodeURIComponent(value.toString());
	}) as GraphPath;
}
