# Request Retrying

Sometimes requests are rejected by GraphAPI:
* When [Graph API strict throttling limits are exceeded](https://learn.microsoft.com/en-us/graph/throttling)
* When there's a transient network failure (HTTP 503/504)
* When a resource is locked due to dangling effect (HTTP 423)

When these occur this library automatically and transparently retries the request a number of times. Where GraphAPI gives a backoff time, that is used and where it isn't an exponential backoff is used. 
