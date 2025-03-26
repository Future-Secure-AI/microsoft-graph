# Performance

If your particular use-case requires enhanced performance there are a couple of tools available to help.

## Sessions

If you have performing multiple operations on a workbook, first open a session using `createWorkbookSession` and close the session at the end with `closeWorkbookSession` (or it times out after 5mins or so). Without this GraphAPI effectively opens and closes the spreadsheet on every operation. With a session in place it keeps the document open.

## Parallel batch

If you have a number of operations that can be performed at the same time, use `await parallel(operation1(), operation2(), ...)`. This allows you to send up to 20 operations to GraphAPI in a single request and have them be performed in parallel.

## Sequential batch

Sometimes the order of operations are important. To facilitate this variant of a batch operation you can use `await sequential(operation1(), operation2(), ...)`.

```typescript
const [_, __, ___, clearedRange] = await sequential(
  updateWorkbookRange(rangeRef, {
    values: values,
  }),
  clearWorkbookRange(rangeRef),
  calculateWorkbook(workbookRef),
  getWorkbookRange(rangeRef)
);
```

While this allows for up to 20 operations to be submitted to GraphAPI in one request, it waits for the former operation to complete before starting the next.
