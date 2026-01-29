import { JObject } from "@@/common/types/json";

export interface ICarModel{
    id?: string;
    name?: string;
    car_make?: number;
}

export const jsonToICarModel = (data: JObject) : ICarModel => {
    return{
        id: data.id,
        name: data.name,
        car_make: data.car_make,
    }
}