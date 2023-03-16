BiDID Resolver
==============

Overview
--

This SDK provides resolution services for BiDID, allowing you to query detailed information about a specific user and return their DID name, avatar, and address.

> Users need to set their DID names on [https://bi.social](https://bi.social) to use this resolution service.

Installation
--

It is recommended to install using npm:


```bash
npm install bidid-sdk
```

> You can also download our sdk from [here](https://github.com/bitislands/bidid-sdk)

Authorization
--

This API requires authentication to ensure that only authorized parties can access user information. Users need to provide a valid key and secret for authentication:


```js
import { DidClient } from "bidid-sdk";

const didClient = new DidClient({ key: "key", secret: "secret" });
```

> If you wish to connect to our resolution service, please contact us via dev@bi.social.

APIs
--

### Resolve DID Name (Forward Resolution)

Get the DID name of the specified address.

```js
const didEntity2 = await didClient.queryDidEntity({ address: "0x1234..." })
```

#### Request Parameters

*   `{address}`：The address of the specified user to query.

#### Response

##### Success

```js
{
  didName: '000',
  address: '0x1234...',
  avatar: 'xx://avatar.imageUrl'
}
```

##### Failure

If the request fails, the API will return the following error messages:

*   `BadQueryError`: Invalid or missing request parameters.
*   `BadAuthError`: Unauthenticated. The authentication credentials in the request are invalid. Please use the correct authentication credentials we provide.
*   `RateLimitError`: Traffic limit exceeded. Too many requests were made within a short period of time (default set to 20 times/second).
*   `NetworkError`: Resource not found. API connection error. Please check if the URI you initialized didClient with is correct.

### Resolve Address (Reverse Resolution)

Get the user address corresponding to the specified DID name.

```js
const didEntity1 = await didClient.queryDidEntity({ didName: "000" })
```

#### Request Parameters

*   `{didName}`：The DID name to query.

#### Response

##### Success

```js
{
  didName: 'didName',
  address: '0x1234...',
  avatar: 'xx://avatar.imageUrl'
}
```

##### Failure

If the request fails, the API will return the following error messages:

*   `BadQueryError`: Invalid or missing request parameters.
*   `BadAuthError`: Unauthenticated. The authentication credentials in the request are invalid. Please use the correct authentication credentials we provide.
*   `RateLimitError`: Traffic limit exceeded. Too many requests were made within a short period of time (default set to 20 times/second).
*   `NetworkError`: Resource not found. API connection error. Please check if the URI you initialized didClient with is correct.


### Note

**If you provide both didName and address at the same time, the resolution will be based on the address only.**


## Examples


#### Request


```js
import { DidClient, BadAuthError, NetworkError, RateLimitError, BadQueryError } from "bidid-sdk";

const didClient = new DidClient({ key: "key", secret: "secret" });

try {
  const didEntity1 = await didClient.queryDidEntity({ didName: "000" })
  const didEntity2 = await didClient.queryDidEntity({ address: "0x1234..." })
  console.log("didEntity1: ", didEntity1)
  console.log("didEntity2: ", didEntity2)
} catch (err) {
  if (err instanceof BadAuthError)
  {
    console.error("Please correct the key and secret for accessing API")
  } else if (err instanceof NetworkError)
  {
    console.error("Can't connect to API with URI: ")
  } else if (err instanceof RateLimitError)
  {
    console.error(err.message)
  } else if (err instanceof BadQueryError)
  {
    console.error(err.message)
  }
}
```

#### Response


```js
const didEntity1 = {
  didName: '000',
  address: null,
  avatar: null
};

const didEntity2 = {
  didName: 'didName',
  address: '0x1234...',
  avatar: 'xx://avatar.imageUrl'
};
```
> A result like `didEntity1` means that the DID name has been registered but has not been resolved to any address.

You can refer to full sample code [here](https://github.com).