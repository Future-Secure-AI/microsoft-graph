import ValidationError from "../../errors/ValidationError.js";

export default class WorksheetName {
    static parse(value: string): WorksheetName {
        ValidationError.throwIf(!WorksheetName.isValid(value), "WorksheetName");
        return new WorksheetName(value);
    }

    static tryParse(value: string): WorksheetName | undefined {
        if (!WorksheetName.isValid(value)) return undefined;
        return new WorksheetName(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(private readonly value: string) {
        Object.freeze(this);
    }

    equals(other: WorksheetName): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

