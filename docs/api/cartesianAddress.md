[Microsoft Graph SDK](README.md) / cartesianAddress

# cartesianAddress

Utilities for converting between A1 addresses and Cartesian coordinates.

## Functions

### addressToCartesian()

> **addressToCartesian**(`address`): [`Cartesian`](Cartesian.md#cartesian)

Defined in: [src/services/cartesianAddress.ts:19](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/cartesianAddress.ts#L19)

Converts a cell range address to Cartesian coordinates.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](Address.md#address) | The cell range address (e.g., "A1:C3"). |

#### Returns

[`Cartesian`](Cartesian.md#cartesian)

The Cartesian representation of the address, with start and end coordinates.

***

### cartesianToAddress()

> **cartesianToAddress**(`cartesian`): [`Address`](Address.md#address)

Defined in: [src/services/cartesianAddress.ts:49](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/cartesianAddress.ts#L49)

Converts Cartesian coordinates to a cell range address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cartesian` | [`Cartesian`](Cartesian.md#cartesian) | The Cartesian coordinates, including start (ax, ay) and end (bx, by). |

#### Returns

[`Address`](Address.md#address)

The cell range address (e.g., "A1:C3").
