import ValidationError from "../../errors/ValidationError.js";

export default class FilePath {
    static parse(value: string): FilePath {
        if (!FilePath.isValid(value)) throw new ValidationError("Invalid FilePath");
        return new FilePath(value);
    }

    static tryParse(value: string): FilePath | undefined {
        if (!FilePath.isValid(value)) return undefined;
        return new FilePath(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(private readonly value: string) {
        Object.freeze(this);
    }

    equals(other: FilePath): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

