# Request Retrying

[Microsoft Graph API enforces strict throttling limits](https://learn.microsoft.com/en-us/graph/throttling). If the rate of requests exceeds these predefined limits, the API will reject requests with an HTTP 429 (Too Many Requests) response. There are both general rate limits and more restrictive limits for workbook manipulation.

To handle these limits and a number of other transient failure scenarios this library automatically retries appropriate requests with an exponential backoff.