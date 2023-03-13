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
export declare class NetworkError extends Error {
    constructor(message: any);
}
export declare class RateLimitError extends Error {
    constructor(message: any);
}
export declare class BadQueryError extends Error {
    constructor(message: any);
}
export declare class BadAuthError extends Error {
    constructor(message: any);
}
export declare class DidClient {
    private source;
    private graphqlClient;
    constructor(params: {
        key: string;
        secret: string;
        uri?: string;
        source?: DataSource;
    });
    queryDidEntity(queryParams: DidQueryParams): Promise<DidEntity>;
    private queryDidCenterServer;
    private queryArweave;
}
