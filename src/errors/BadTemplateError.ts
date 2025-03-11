export default class BadTemplateError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = 'BadTemplateError';
    }
}
