[Microsoft Graph SDK](../README.md) / services/batch

## Variables

### maxCellsPerRequest

> `const` **maxCellsPerRequest**: `10000` = `10000`

Defined in: [src/services/batch.ts:7](https://github.com/Future-Secure-AI/microsoft-graph/blob/main/src/services/batch.ts#L7)

Maximum number of cells that can be retrieved in a single request, unless overwritten.

#### Remarks

The Microsoft Graph API documentation does not specify a fixed maximum number of cells that can be retrieved in a single request.
However, it mentions that large ranges may result in errors due to resource constraints. Additionally, discussions in developer
communities suggest that requests exceeding 10,000 cells may encounter issues.
