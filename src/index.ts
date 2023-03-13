import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject, ApolloQueryResult } from '@apollo/client/core';

const DEFAULT_URIS = {
  arweave: "",
  center: "https://graph-api.bi.social/graphql"
}

// type DataSource = 'arweave' | 'center';
export type DataSource = 'center';

export interface DidEntity {
  didName: string;
  address: string;
  avatar?: string;
}

export interface DidQueryParams {
  didName?: string;
  address?: string;
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

export class RateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = "RateLimitError";
  }
}

export class BadQueryError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadQueryError";
  }
}

export class BadAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadAuthError";
  }
}

export class DidClient {
  private source: DataSource;
  private graphqlClient: ApolloClient<NormalizedCacheObject>;

  constructor(params: { key: string, secret: string, uri?: string, source?: DataSource }) {
    const { key, secret } = params
    this.source = params.source || 'center'
    this.graphqlClient = new ApolloClient({
      headers: { key, secret },
      uri: params.uri || DEFAULT_URIS[this.source],
      cache: new InMemoryCache(),
    })
  }

  async queryDidEntity(queryParams: DidQueryParams): Promise<DidEntity> {
    if (!queryParams.didName && !queryParams.address)
    {
      throw new BadQueryError("Need to specify at least one query parameter: didName, address")
    }

    const didEntity = this.source === "center" ? await this.queryDidCenterServer(queryParams) : await this.queryArweave(queryParams);
    return didEntity;
  }

  private async queryDidCenterServer(variables: DidQueryParams): Promise<DidEntity> {
    let result: ApolloQueryResult<any>
    const query = gql`
      query DidEntity($didName: String, $address: String) {
        didEntity(didName: $didName, address: $address) {
          didName
          address
          avatar
        }
      }
    `
    try
    {
      result = await this.graphqlClient.query({ query, variables });
      const { didName, address, avatar } = result.data.didEntity;
      return { didName, address, avatar };
    } catch (err)
    {
      if (err.message === 'fetch failed')
      {
        throw new NetworkError(err);
      } else if (err.message.startsWith('Too many requests, please try again'))
      {
        throw new RateLimitError(err);
      } else if (err.message === 'BAD_KEY_OR_SECRET')
      {
        throw new BadAuthError(err);
      } else if (err.message === 'INVALID_ARGUMENTS')
      {
        throw new BadQueryError(err);
      } else
      {
        throw err;
      }
    }

  }

  private async queryArweave(variables: DidQueryParams): Promise<DidEntity> {
    const query = gql``
    const result: ApolloQueryResult<any> = await this.graphqlClient.query({ query });

    const { didName, address, avatar } = result.data.didEntity
    return { didName, address, avatar };
  }
}