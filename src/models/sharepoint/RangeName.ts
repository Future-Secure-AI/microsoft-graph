import ValidationError from "../../errors/ValidationError.js";

export default class RangeName {
    static parse(value: string): RangeName {
        ValidationError.throwIf(!RangeName.isValid(value), "RangeName");
        return new RangeName(value);
    }

    static tryParse(value: string): RangeName | undefined {
        if (!RangeName.isValid(value)) return undefined;
        return new RangeName(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(private readonly value: string) {
        Object.freeze(this);
    }

    equals(other: RangeName): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

