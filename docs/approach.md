# Justification/Approach

Why not just use the default SDK for this? Well - there isn't really one. Sure, there is [`@microsoft/microsoft-graph-client`](https://www.npmjs.com/package/@microsoft/microsoft-graph-client), however it's thin and doesn't define
individual methods we can call. And there's also [`msgraph-typescript-typings`](https://github.com/microsoftgraph/msgraph-typescript-typings) which defines
the models, however nothing appears to exist to pull these basic concepts together into a SDK.

This project implements `msgraph-typescript-typings` DTOs without using `@microsoft/microsoft-graph-client` as it added negligible value.
