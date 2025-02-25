import ValidationError from "../../errors/ValidationError.js";

export default class FilePath {
    public static parse(value: string): FilePath {
        ValidationError.throwIf(!FilePath.isValid(value), "FilePath");
        return new FilePath(value);
    }

    public static tryParse(value: string): FilePath | null {
        if (!FilePath.isValid(value)) return null;
        return new FilePath(value);
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(public readonly value: string) {
        Object.freeze(this);
    }

    public equals(other: FilePath): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }
}

