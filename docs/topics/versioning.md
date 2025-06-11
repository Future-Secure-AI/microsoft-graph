# Versioning

Each release of this library has a version in the format `{major}.{minor}.{patch}`

| Part      | When incremented  |
| --------- | ----------------- |
| `{patch}` | bug fix           |
| `{minor}` | new functionality |
| `{major}` | breaking change   |

So upgrading from `2.30.0` to `2.30.1` is a bug fix, upgrading from `2.30.1`  to `2.31.0` is a new feature (but not a breaking change), but upgrading from `2.31.0` to `3.0.1` involves a breaking change.

This applies since 2.26.0.

## Versioning pinning
It is recommended therefore either pin to `{major}` or `{major}.{minor}` to still receive critical updates without receiving breaking changes.

