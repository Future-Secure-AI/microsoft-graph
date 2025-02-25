import ValidationError from "../../errors/ValidationError.js";

export default class SiteId {
    public static parse(value: string): SiteId {
        ValidationError.throwIf(!SiteId.isValid(value), "SiteId");
        return new SiteId(value);
    }

    public static tryParse(value: string): SiteId | null {
        if (!SiteId.isValid(value)) return null;
        return new SiteId(value);
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(public readonly value: string) {
        Object.freeze(this);
    }

    public equals(other: SiteId): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }
}

