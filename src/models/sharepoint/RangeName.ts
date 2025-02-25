import ValidationError from "../../errors/ValidationError.js";

export default class RangeName {
    public static parse(value: string): RangeName {
        ValidationError.throwIf(!RangeName.isValid(value), "RangeName");
        return new RangeName(value);
    }

    public static tryParse(value: string): RangeName | null {
        if (!RangeName.isValid(value)) return null;
        return new RangeName(value);
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(public readonly value: string) {
        Object.freeze(this);
    }

    public equals(other: RangeName): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }
}

