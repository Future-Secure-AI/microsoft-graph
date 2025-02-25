import ValidationError from "../../errors/ValidationError.js";

export default class WorksheetName {
    public static parse(value: string): WorksheetName {
        ValidationError.throwIf(!WorksheetName.isValid(value), "WorksheetName");
        return new WorksheetName(value);
    }

    public static tryParse(value: string): WorksheetName | null {
        if (!WorksheetName.isValid(value)) return null;
        return new WorksheetName(value);
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(public readonly value: string) {
        Object.freeze(this);
    }

    public equals(other: WorksheetName): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }
}

