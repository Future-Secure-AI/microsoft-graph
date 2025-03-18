import { describe, expect, it } from 'vitest';
import BadTemplateError from '../errors/BadTemplateError.js';
import { generatePath } from './templatedPaths.js';

describe('generatePath', () => {
    it('should generate a valid path with correct arguments', () => {
        const template = '/me/drive/items/{item-id}/children';
        const args = { itemId: '123' };
        const result = generatePath(template, args);
        expect(result).toBe('/me/drive/items/123/children');
    });

    it('should throw BadTemplateError if template does not start with a slash', () => {
        const template = 'me/drive/items/{item-id}/children';
        const args = { itemId: '123' };
        expect(() => generatePath(template, args)).toThrow(BadTemplateError);
    });

    it('should throw BadTemplateError if template contains newlines', () => {
        const template = '/me/drive/items/{item-id}/children\n';
        const args = { itemId: '123' };
        expect(() => generatePath(template, args)).toThrow(BadTemplateError);
    });

    it('should throw BadTemplateError if argument is missing', () => {
        const template = '/me/drive/items/{item-id}/children';
        const args = {};
        expect(() => generatePath(template, args)).toThrow(BadTemplateError);
    });

    it('should encode URI components', () => {
        const template = '/me/drive/items/{item-id}/children';
        const args = { itemId: 'item name with spaces' };
        const result = generatePath(template, args);
        expect(result).toBe('/me/drive/items/item%20name%20with%20spaces/children');
    });

    it('should generate a valid path when the same argument is used twice', () => {
        const template = '/me/drive/items/{item-id}/children/{item-id}';
        const args = { itemId: '123' };
        const result = generatePath(template, args);
        expect(result).toBe('/me/drive/items/123/children/123');
    });

    it('should throw BadTemplateError if template has an argument that is not matched', () => {
        const template = '/me/drive/items/{item-id}/children/{child-id}';
        const args = { itemId: '123' };
        expect(() => generatePath(template, args)).toThrow(BadTemplateError);
    });

    it('should generate a valid path with multiple arguments', () => {
        const template = '/users/{user-id}/messages/{message-id}/attachments/{attachment-id}';
        const args = { userId: 'user123', messageId: 'msg456', attachmentId: 'att789' };
        const result = generatePath(template, args);
        expect(result).toBe('/users/user123/messages/msg456/attachments/att789');
    });
});
