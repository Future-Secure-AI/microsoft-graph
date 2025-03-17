export default function kebabToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (_: string, letter: string) => letter.toUpperCase());
}