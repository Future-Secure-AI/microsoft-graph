# Performance

For enhanced performance with the Graph API, use the following techniques:

## Workbook Sessions
When performing more than a single operations on a workbook, there are significant performance benefits to use workbook sessions. To do this first open a session with `createWorkbookSession` and close it with `closeWorkbookSession` when done. This keeps the workbook open, reducing overhead from repeatedly opening and closing the document. Be sure to close sessions otherwise they linger for a number of minutes preventing worksheets from being deleted or moved.

**Recommended pattern:**

```typescript
const workbook = await createWorkbookSession(driveItemRef);
try {
    // Perform multiple operations
    const rangeRef = createWorkbookRangeRef(worksheetRef, "A1:B3");
    await writeWorkbookRows(rangeRef, [
        [{ value: 1 }, { value: 2 }],
        [{ value: 3 }, { value: 4 }],
        [{ value: 5 }, { value: 6 }],
    ]);
    // ...more operations
} finally {
    await closeWorkbookSession(workbook);
}
```

## Batching Requests
Batching allows up to 20 operations in a single network request. Use batching for performance, but be aware:
- Debugging failures is harder (which operation failed?).
- Concurrency issues may arise if multiple operations modify the same resource.

### Parallel Batch
Use `await parallel(operation1(), operation2(), ...)` for independent operations that can run at the same time.

**Example:**
```typescript
await parallel(
    updateWorkbookRange(rangeRef1, { values: values1 }),
    updateWorkbookRange(rangeRef2, { values: values2 }),
    clearWorkbookRange(rangeRef3)
);
```

### Sequential Batch
If order matters, use `await sequential(operation1(), operation2(), ...)`. Each operation waits for the previous one to finish.

**Example:**
```typescript
const [updated, cleared, calculated, result] = await sequential(
    updateWorkbookRange(rangeRef, { values }),
    clearWorkbookRange(rangeRef),
    calculateWorkbook(workbookRef),
    getWorkbookRange(rangeRef)
);
```

**Summary:**
- Use sessions for multiple workbook operations.
- Use batching for up to 20 operations per request.
- Use `parallel` for independent operations, `sequential` for ordered ones.