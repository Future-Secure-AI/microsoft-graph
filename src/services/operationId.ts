export function operationIndexToId(index: number): string {
	return index.toString();
}

export function operationIdToIndex(id: string): number {
	return Number.parseInt(id, 10);
}
