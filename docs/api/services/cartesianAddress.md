[Microsoft Graph SDK](../README.md) / services/cartesianAddress

## Functions

### addressToCartesian()

> **addressToCartesian**(`address`): [`Cartesian`](../models/Cartesian.md#cartesian)

Defined in: [src/services/cartesianAddress.ts:13](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/cartesianAddress.ts#L13)

Converts a cell range address to Cartesian coordinates.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | [`Address`](../Address.md#address) | The cell range address (e.g., "A1:C3"). |

#### Returns

[`Cartesian`](../models/Cartesian.md#cartesian)

The Cartesian representation of the address, with start and end coordinates.

***

### cartesianToAddress()

> **cartesianToAddress**(`cartesian`): [`Address`](../Address.md#address)

Defined in: [src/services/cartesianAddress.ts:31](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/cartesianAddress.ts#L31)

Converts Cartesian coordinates to a cell range address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cartesian` | [`Cartesian`](../models/Cartesian.md#cartesian) | The Cartesian coordinates, including start (ax, ay) and end (bx, by). |

#### Returns

[`Address`](../Address.md#address)

The cell range address (e.g., "A1:C3").
