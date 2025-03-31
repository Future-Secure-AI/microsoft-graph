export function indexesToCell(row: number, col: number): string {
	return `${indexToColumn(col)}${indexToRow(row)}`;
}

export function columnToIndex(column: string): number {
	let index = 0;
	for (let i = 0; i < column.length; i++) {
		index = index * 26 + (column.charCodeAt(i) - 65 + 1);
	}
	return index - 1;
}

export function indexToColumn(index: number): string {
	let result = "";
	let currentIndex = index + 1;
	while (currentIndex > 0) {
		currentIndex -= 1;
		result = String.fromCharCode((currentIndex % 26) + 65) + result;
		currentIndex = Math.floor(currentIndex / 26);
	}
	return result;
}

export function rowToIndex(row: number): number {
	return row - 1;
}

export function indexToRow(index: number): number {
	return index + 1;
}
