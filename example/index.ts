import { DidClient, DidEntity, BadAuthError, NetworkError, RateLimitError, BadQueryError } from "../dist";

const queryDid = async () => {
  const didClient: DidClient = new DidClient({ key: "test", secret: "secret" });
  try {
    const didEntity1: DidEntity = await didClient.queryDidEntity({ didName: "000" })
    const didEntity2: DidEntity = await didClient.queryDidEntity({ address: "0xa10d1c276bd34823cd789ec5d767050968a2fea1" })
    console.log(didEntity1)
    console.log(didEntity2)
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
}

queryDid()