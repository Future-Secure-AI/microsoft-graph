export function indexesToAddress(row: number, col: number): string {
	return `${String.fromCharCode(65 + col)}${row + 1}`;
}
