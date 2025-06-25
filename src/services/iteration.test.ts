import { describe, expect, it } from "vitest";
import { iterateToArray } from "./iteration";

describe("iterateToArray", () => {
	async function* asyncGen(values: number[]) {
		for (const v of values) {
			yield v;
		}
	}

	it("collects items without converter", async () => {
		const input = [1, 2, 3];
		const result = await iterateToArray(asyncGen(input));
		expect(result).toEqual(input);
	});

	it("collects items with converter", async () => {
		const input = [1, 2, 3];
		const converter = (x: number) => `num:${x}`;
		const result = await iterateToArray(asyncGen(input), converter);
		expect(result).toEqual(["num:1", "num:2", "num:3"]);
	});
});
