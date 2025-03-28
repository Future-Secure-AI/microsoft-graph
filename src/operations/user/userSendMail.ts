import type { Message } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { ContextRef } from "../../models/ContextRef.ts";
import type { GraphOperation, GraphPath } from "../../models/GraphOperation.ts";

// Overview of SendMail process: https://learn.microsoft.com/en-us/graph/outlook-things-to-know-about-send-mail

const emailPattern = /^[a-zA-Z0-9._\-@]+$/; // Basic, but intended just to avoid URL escaping issues

/** Send an email from the current or a specified user. @see https://learn.microsoft.com/en-us/graph/api/user-sendmail */
export default function userSendMail(contextRef: ContextRef, sender: string | null, message: Message): GraphOperation<void> {
	if (sender && !emailPattern.test(sender)) {
		throw new InvalidArgumentError(`Invalid email address. Must match pattern '${emailPattern}'`);
	}

	const path = sender ? `/users/${sender}/sendMail` : "/me/sendMail";

	return operation({
		contextId: contextRef.contextId,
		method: "POST",
		path: path as GraphPath,
		headers: {
			"content-type": "application/json",
		},
		body: {
			message,
		},
		responseTransform: () => undefined,
	});
}
