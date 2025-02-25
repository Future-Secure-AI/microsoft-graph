export default class ValidationError extends Error {
    public static throwIf(condition: boolean, valueObject: string): void {
        if (condition) throw new ValidationError(`Value for '${valueObject}' is not valid`);
    }
    
    public constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
