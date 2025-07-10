[Microsoft Graph SDK](../README.md) / services/usedAddress

# services/usedAddress

## Functions

### resolveUsedAddress()

> **resolveUsedAddress**(`address`, `usedRange`): `null` \| [`Address`](../Address.md#address)

Defined in: [src/services/usedAddress.ts:30](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/usedAddress.ts#L30)

Resolves a used range address (which may use partial or open-ended A1 notation, e.g., ":D5", "C:", etc.) against a concrete used range.

This function fills in any missing start/end columns or rows in the `usedRangeAddress` using the corresponding values from the provided `usedRange`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](../Address.md#address) \| [`UsedAddress`](../Address.md#usedaddress) | The used range address (may be open-ended, e.g., ":D5", "C:", etc.). |
| `usedRange` | `` `${Uppercase<string>}${number}:${Uppercase<string>}${number}` `` | The concrete used range address to resolve against (e.g., "B2:E10"). |

#### Returns

`null` \| [`Address`](../Address.md#address)

The resolved address as a concrete A1 range (e.g., "C2:E10"), or null if there is no overlap.

#### Throws

If the used range address is invalid or cannot be resolved.

#### Example

```ts
// If usedRange is "B2:E10":
//   resolveUsedRangeAddress("C:", usedRange)   // "C2:E10"
//   resolveUsedRangeAddress(":D", usedRange)   // "B2:D10"
//   resolveUsedRangeAddress("3:", usedRange)   // "B3:E10"
//   resolveUsedRangeAddress(":5", usedRange)   // "B2:E5"
//   resolveUsedRangeAddress("C3:", usedRange)  // "C3:E10"
//   resolveUsedRangeAddress(":D5", usedRange)  // "B2:D5"
//   resolveUsedRangeAddress(":", usedRange)    // "B2:E10"
//   resolveUsedRangeAddress("Z100:Z200", usedRange) // null (no overlap)
//   resolveUsedRangeAddress("A1:A1", usedRange) // null (no overlap)
```
