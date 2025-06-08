[Microsoft Graph SDK](../modules.md) / models/Address

## Type Aliases

### Address

> **Address** = [`ColumnAddress`](#columnaddress) \| [`RowAddress`](#rowaddress) \| [`ColumnRangeAddress`](#columnrangeaddress) \| [`RowRangeAddress`](#rowrangeaddress) \| [`CellRangeAddress`](#cellrangeaddress) \| [`CellAddress`](#celladdress)

Defined in: [src/models/Address.ts:10](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L10)

***

### CellAddress

> **CellAddress** = `` `${ColumnAddress}${RowAddress}` ``

Defined in: [src/models/Address.ts:7](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L7)

***

### CellRangeAddress

> **CellRangeAddress** = `` `${CellAddress}:${CellAddress}` ``

Defined in: [src/models/Address.ts:8](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L8)

***

### ColumnAddress

> **ColumnAddress** = `` `${Uppercase<string>}` ``

Defined in: [src/models/Address.ts:1](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L1)

***

### ColumnRangeAddress

> **ColumnRangeAddress** = `` `${CellAddress}:${CellAddress}` ``

Defined in: [src/models/Address.ts:2](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L2)

***

### RowAddress

> **RowAddress** = `` `${number}` ``

Defined in: [src/models/Address.ts:4](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L4)

***

### RowRangeAddress

> **RowRangeAddress** = `` `${RowAddress}:${RowAddress}` ``

Defined in: [src/models/Address.ts:5](https://github.com/Future-Secure-AI/microsoft-graph/blob/6f587d043e8277194e9b2feca914ab2cba9d258d/src/models/Address.ts#L5)
