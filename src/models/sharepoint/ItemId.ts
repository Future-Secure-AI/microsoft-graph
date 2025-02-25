import { ValidationError } from "../../errors/ValidationError.js";

export default class ItemId {
    static parse(value: string): ItemId {
        if (!ItemId.isValid(value)) throw new ValidationError("Invalid ItemId");
        return new ItemId(value);
    }

    static tryParse(value: string): ItemId | undefined {
        if (!ItemId.isValid(value)) return undefined;
        return new ItemId(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(private readonly value: string) {
        Object.freeze(this);
    }

    equals(other: ItemId): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

