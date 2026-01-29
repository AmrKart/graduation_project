///<reference types='vite/client' />

export interface JObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
interface action {
    type: string
    payload?: JObject | Array<JObject>
}
export enum ResponseStatusCode {
    Success = 200,
    Error = 400,
    Unauthorized = 401,
    ServerError = 500,
    BadGateway = 504,
}

/**
 * Tawreed response
 */
type Response<T> = {

    /**
     * status
     */
    status: ResponseStatusCode;

    /**
     * message
     */
    message?: string;

    /**
     * data
     */
    data?: T;

    /**
     * error
     */
    error?: Error;
}
