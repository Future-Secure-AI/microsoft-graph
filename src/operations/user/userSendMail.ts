/**
 * Send an email.
 * @module userSendMail
 * @category Operations
 */

import type { Message } from "@microsoft/microsoft-graph-types";
import InvalidArgumentError from "../../errors/InvalidArgumentError.ts";
import { operation } from "../../graphApi.ts";
import type { Context } from "../../models/Context.ts";
import type { GraphOperation } from "../../models/GraphOperation.ts";
import type { HttpPath } from "../../models/Http.ts";

// Overview of SendMail process: https://learn.microsoft.com/en-us/graph/outlook-things-to-know-about-send-mail

const emailPattern = /^[a-zA-Z0-9._\-@]+$/; // Basic, but intended just to avoid URL escaping issues

/**
 * Send an email.
 *
 * @param context Reference to the context.
 * @param sender - The email address of the sender or NULL for the current user. Must match a valid email address in this tenant.
 * @param message - The email message to be sent.
 *  * @throws InvalidArgumentError if the sender email address does not match the required pattern.
 * @see https://learn.microsoft.com/en-us/graph/api/user-sendmail
 */
export default function userSendMail(context: Context, sender: string | null, message: Message): GraphOperation<void> {
	if (sender && !emailPattern.test(sender)) {
		throw new InvalidArgumentError(`Invalid email address. Must match pattern '${emailPattern}'`);
	}

	const path = sender ? `/users/${sender}/sendMail` : "/me/sendMail";

	return operation({
		context,
		method: "POST",
		path: path as HttpPath,
		headers: {
			"content-type": "application/json",
		},
		body: {
			message,
		},
		responseTransform: () => undefined,
	});
}
