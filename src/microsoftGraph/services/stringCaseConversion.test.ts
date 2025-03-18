import { describe, expect, it } from 'vitest';
import { kebabToCamelCase } from './stringCaseConversion.js';

describe('kebabToCamelCase', () => {
    it('should handle single word strings', () => {
        expect(kebabToCamelCase('single')).toBe('single');
    });

    it('should handle empty strings', () => {
        expect(kebabToCamelCase('')).toBe('');
    });

    it('should handle strings with multiple dashes', () => {
        expect(kebabToCamelCase('multiple-dashes-in-string')).toBe('multipleDashesInString');
    });

    it('should handle strings with leading and trailing dashes', () => {
        expect(kebabToCamelCase('-leading-and-trailing-')).toBe('leadingAndTrailing');
    });
});
