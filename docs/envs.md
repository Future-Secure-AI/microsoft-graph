# Environment variables
Environment variables are read at startup. If a mandatory env is missing startup will be aborted.

| Env                           | Mandatory | Purpose                                                            |
| ----------------------------- | --------- | ------------------------------------------------------------------ |
| `AZURE_TENANT_ID`             | Y         | Entra Tenant ID, used for authentication                           |
| `AZURE_CLIENT_ID`             | Y         | Entra Client ID, used for authentication                           |
| `AZURE_CLIENT_SECRET`         | Y         | Entra Client secret, used for authentication                       |
| `SHAREPOINT_DEFAULT_SITE_ID`  | N         | ID of the Sharepoint site to use when none is specified otherwise. |
| `SHAREPOINT_DEFAULT_DRIVE_ID` | N         | ID of the Drive  to use when none is specified otherwise           |
| `HTTP_PROXY`                  | N         | HTTP proxy to route requests via. ie 'http://proxy:3128'           |