import { ValidationError } from "../errors/ValidationError.js";

export default class Email {
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    static parse(value: string): Email {
        if (!Email.isValid(value)) throw new ValidationError("Invalid email");
        return new Email(value);
    }

    static tryParse(value: string): Email | undefined {
        if (!Email.isValid(value)) return undefined;
        return new Email(value);
    }

    static isValid(value: string): boolean {
        if (!value) return false;
        if (!Email.EMAIL_REGEX.test(value)) return false;
        return true;
    }

    private readonly value: string;

    private constructor(value: string) {
        this.value = value.toLocaleLowerCase();
        Object.freeze(this);
    }

    equals(other: Email): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}

