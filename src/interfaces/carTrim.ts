import { JObject } from "@@/common/types/json";


export interface ICarTrim {
    id?: string;
    name?: string;
    car_model_id?: string;
    model_name?: string;
    make_name?: string;    
    car_type_id?: string;
    type_name?: string;
    start_production_year?: number;
    end_production_year?: number;
    price_min?: string;
    price_max?: string;
    currency?: string;    
    is_published?: boolean;
    description?: string;    
    images?: Array<JObject>;     
    specifications?: Array<JObject>;
}

export const jsonToICarTrim = (data: JObject): ICarTrim => {
    return {
        id: data.id,
        name: data.name,
        car_model_id: data.car_model_id,
        model_name: data.model_name,
        make_name: data.make_name,
        car_type_id: data.car_type_id,
        type_name: data.type_name,
        start_production_year: data.start_production_year,
        end_production_year: data.end_production_year,
        price_min: data.price_min,
        price_max: data.price_max,
        currency: data.currency,
        is_published: data.is_published,
        description: data.description,
        images: data.images,
        specifications: data.specifications ?? [],
    }
}