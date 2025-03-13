# Azure Entra integration
## Overview
This is a place for Azure Entra logic. At this stage it just has the logic for getting cached access tokens, but may be expanded as required.

## Usage

1) Make sure the enviuronment variables `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET` are set.
2) Make a call for an access token for a given scope. Note that these tokens are cached until expiry.
   
```typescript
const scope = "https://graph.microsoft.com/.default" as Scope;
const accessToken = getCurrentAccessToken(scope);
```