export default class NotImplementedError extends Error {
    constructor() {
        super("Not implemented");
        this.name = 'NotImplementedError';
    }
}
