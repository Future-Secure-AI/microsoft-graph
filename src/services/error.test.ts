import { describe, expect, it } from "vitest";
import { isErrorWithName } from "./error";

describe("isErrorWithName", () => {
	it("returns true if error has the specified name", () => {
		const error = { name: "MyError" };
		expect(isErrorWithName(error, "MyError")).toBe(true);
	});

	it("returns false if error does not have the specified name", () => {
		const error = { name: "OtherError" };
		expect(isErrorWithName(error, "MyError")).toBe(false);
	});

	it("returns false if error is not an object", () => {
		expect(isErrorWithName(null, "MyError")).toBe(false);
		expect(isErrorWithName(undefined, "MyError")).toBe(false);
	});

	it("returns false if error object does not have a name property", () => {
		const error = { message: "No name" };
		expect(isErrorWithName(error, "MyError")).toBe(false);
	});

	it("works with real Error objects", () => {
		const error = new Error("fail");
		error.name = "CustomError";
		expect(isErrorWithName(error, "CustomError")).toBe(true);
		expect(isErrorWithName(error, "OtherError")).toBe(false);
	});
});
