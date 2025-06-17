/**
 * Your app has been throttled for exceeding the maximum bandwidth cap. Your app can retry the request again after more time has elapsed.
 * @module BandwidthLimitExceededError
 * @category Errors
 */
export default class BandwidthLimitExceededError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "BandwidthLimitExceededError";
	}
}
