# `calculateWorkbook()`

Here's a gotcha. If you write to a workbook and immediately afterwards read from it, the change you just wrote might not have taken effect yet. This is due to the eventual consistency model Sharepoint uses. To ensure consistency you must call `calculateWorkbook()` before your reads. You can use this as part of a `sequential` batch as follows for the best performance:

```typescript
await updateWorkbookRange(rangeRef, { values: values });
await calculateWorkbook(workbookRef); // IMPORTANT!!
const usedRange = await getWorkbookUsedRange(worksheetRef);
```

The same applies to the batch version:

```typescript
const [_, __, usedRange] = await sequential(
  updateWorkbookRange(rangeRef, {
    values: values,
  }),
  calculateWorkbook(workbookRef), // IMPORTANT!!
  getWorkbookUsedRange(worksheetRef)
);
```
