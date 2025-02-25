import ValidationError from "../../errors/ValidationError.js";

export default class DriveId { 
    public static parse(value: string): DriveId {
        ValidationError.throwIf(!DriveId.isValid(value), "DriveId");
        return new DriveId(value);
    }

    public static tryParse(value: string): DriveId | null {
        if (!DriveId.isValid(value)) return null;
        return new DriveId(value);
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(public readonly value: string) {
        Object.freeze(this);
    }

    public equals(other: DriveId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }

}

