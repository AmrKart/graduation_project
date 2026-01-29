import { JActions } from "./json";

export interface PaginationPayload<T> {
    totalItems: number;
    items: Array<T>;
    availableActions?:Array<number>;
}