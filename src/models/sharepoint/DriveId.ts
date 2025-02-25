import ValidationError from "../../errors/ValidationError.js";

export default class DriveId {
    static parse(value: string): DriveId {
        if (!DriveId.isValid(value)) throw new ValidationError("Invalid DriveId");
        return new DriveId(value);
    }

    static tryParse(value: string): DriveId | undefined {
        if (!DriveId.isValid(value)) return undefined;
        return new DriveId(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(private readonly value: string) {
        Object.freeze(this);
    }

    equals(other: DriveId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

