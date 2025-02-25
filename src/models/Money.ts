export default class Money {
    public readonly value;
    private readonly decimalPlaces = 2;

    public static parse(value: number): Money {
        return new Money(value);
    }

    private constructor(value: number) {
        this.value = Math.round(value * (10 ** this.decimalPlaces)) / (10 ** this.decimalPlaces);
        Object.freeze(this);
    }

    public equals(other: Money): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return `$${this.value.toFixed(this.decimalPlaces)}`;
    }

    public ofValue(): number {
        return this.value;
    }

    public toJson(): string {
        return JSON.stringify(this.value);
    }
}