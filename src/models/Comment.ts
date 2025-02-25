import ValidationError from "../errors/ValidationError.js";

export default class Comment {
    public static parse(value: string): Comment {
        ValidationError.throwIf(!Comment.isValid(value), "Comment");
        return new Comment(value);
    }

    public static tryParse(value: string): Comment | null {
        if (!Comment.isValid(value)) return null;
        return new Comment(value);
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return true;
    }

    private constructor(public readonly value: string) {
        Object.freeze(this);
    }

    public equals(other: Comment): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }
}

