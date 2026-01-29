///<reference types='vite/client' />

import { JObject } from "./common/types/json";

export interface reduxAction {
    type: string;
    payload?: JObject
}