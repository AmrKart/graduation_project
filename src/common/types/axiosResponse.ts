import { JActions } from "./json";

export enum ResponseStatusCode {
    Success = 200,
    Error = 400,
    Unauthorized = 401,
    ServerError = 500,
    BadGateway = 504,
}

/**
 *  response
 */
export type Response<T> = {

    /**
     * status
     */
    status: number;

    /**
     * message
     */
    messages?: string;

    /**
     * data
     */
    data: T;
}
export type ResponsePagination<T> = {
    status: number;

    /**
     * message
     */
    message?: Array<string>;

    /**
     * data
     */
    data: {
        totalItems: number;
        items: Array<T>;
        availableActions?: Array<number>;

    }
}

export type ResponsePaginationWithActions<T> = {
    status: number;

    /**
     * message
     */
    message?: Array<string>;

    /**
     * data
     */
    result?: {
        totalItems: number;
        items: Array<T>;
        actions: JActions;
    }

}

