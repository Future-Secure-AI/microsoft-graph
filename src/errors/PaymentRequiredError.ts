/**
 * The payment requirements for the API haven't been met.
 * @module PaymentRequiredError
 * @category Errors
 */
export default class PaymentRequiredError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "PaymentRequiredError";
	}
}
