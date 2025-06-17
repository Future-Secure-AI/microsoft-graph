/**
 * The content type of the request is a format that isn't supported by the service.
 * @module UnsupportedMediaTypeError
 * @category Errors
 */
export default class UnsupportedMediaTypeError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "UnsupportedMediaTypeError";
	}
}
