import { JObject } from "@@/common/types/json";

export enum ReviewStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export interface IQuestion {
    id?: string;
    title?: string;
    body?: string;
    created_at?: string;
    user_name?: string;
    car_model_name?: string;
    answers_count?: number;
}

export const jsonToIQuestion = (data: JObject): IQuestion => {
    return {
        id: data.id,
        title: data.title,
        body: data.body,
        created_at: data.created_at,
        user_name: data.user_name,
        car_model_name: data.car_model_name,
        answers_count: data.answers_count,
    }
}

export interface IReview {
    id?: string;
    rating?: number;
    comment?: string;
    status?: ReviewStatus;
    user_name?: string;
    car_name?: string;
    trim_name?: string;
    created_at?: string;
}

export const jsonToIReview = (data: JObject): IReview => {
    return {
        id: data.id,
        rating: data.rating,
        comment: data.comment,
        status: data.status,
        user_name: data.user_name,
        car_name: data.car_name,
        trim_name: data.trim_name,
        created_at: data.created_at,
    }
}