import { NavigateFunction } from "react-router-dom";
import { JObject } from "./json";
import { ReactNode } from "react";

export type RequestMode = 'all' | 'error' | 'none';
export enum ErrorMode {
    message = "message",
    page = "page",
    none = "none"
}
export enum SuccessMode {
    message = "message",
    page = "page",
    none = "none"
}

/**
 * Shamcar request
 */
export type ShamcarRequest<T> = {

    data: T;
    history?: NavigateFunction
    route?: string;
    reFetch?: boolean,
    methods?: Array<{
        shamcarRequest: any; action: any, isDispatch: boolean, data: any, fromResponse?: boolean, additional?: JObject,
        Element?: React.ComponentType,
        modalFromResponse?: boolean
    }>
}

export type ShamcarPaginationAttributes = {
    sortBy?: string;
    isSortAscending?: boolean;
    pageSize: number;
    pageNumber: number;
    totalItems: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestParams = { [key: string]: any };


