export default class NotImplementedError extends Error {
    public constructor() {
        super("Not implemented");
        this.name = 'NotImplementedError';
    }
}
