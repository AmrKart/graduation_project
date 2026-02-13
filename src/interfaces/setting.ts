import { JObject } from "@@/common/types/json";


export interface ISettings {
    id? : string;
    key?: string;
    type?: string;
    title?: string;
    value?: string;
}

export const jsonToISettings = (data : JObject) : ISettings => {
    return {
        id: data.id,
        key: data.key,
        type: data.type,
        title: data.title,
        value: data.value,
    }
}