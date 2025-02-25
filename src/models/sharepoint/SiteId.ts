import { ValidationError } from "../../errors/ValidationError.js";

export default class SiteId {
    static parse(value: string): SiteId {
        if (!SiteId.isValid(value)) throw new ValidationError("Invalid SiteId");
        return new SiteId(value);
    }

    static tryParse(value: string): SiteId | undefined {
        if (!SiteId.isValid(value)) return undefined;
        return new SiteId(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(private readonly value: string) {
        Object.freeze(this);
    }

    equals(other: SiteId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

