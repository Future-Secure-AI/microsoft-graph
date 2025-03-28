export default class InvalidArgumentError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "InvalidArgumentError";
	}

	public static throwIfOutside(value: number, min: number, max: number, message: string): void {
		if (value < min || value > max) {
			throw new InvalidArgumentError(message);
		}
	}

	public static throwIfGreater(value: number, max: number, message: string): void {
		if (value > max) {
			throw new InvalidArgumentError(message);
		}
	}

	public static throwIfFalsy(value: unknown, message: string): void {
		if (!value) {
			throw new InvalidArgumentError(message);
		}
	}
}
