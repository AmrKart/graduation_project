import { JObject } from "@@/common/types/json";

export interface ICarMake {
    id?: string;
    name?: string;
    logo?: string;
}


export const jsonToICarMake = (data: JObject): ICarMake => {
    return {
        id: data.id,
        name: data.name,
        logo: data.logo,
    }
}