export default class Money {
    static parse(value: number): Money {
        return new Money(value);
    }

    private constructor(private readonly value: number) {
        Object.freeze(this);
    }

    equals(other: Money): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return `$${this.value.toFixed(2)}`;
    }

    toJson(): string {
        return JSON.stringify(this.value);
    }
}