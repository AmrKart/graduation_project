import { ShamcarRequest } from "@@/common/types/axiosRequest";
import { JObject } from "@@/common/types/json";
import { ICarModel } from "@@/interfaces/carModel"

// prettier-ignore
export enum actionsName {

    GET_CAR_MODELS = "GET_CAR_MODELS",
    GET_CAR_MODELS_SUCCESS = "GET_CAR_MODELS_SUCCESS",
    GET_CAR_MODELS_FAILED = "GET_CAR_MODELS_FAILED",
    GET_CAR_MODELS_CLEANUP = "GET_CAR_MODELS_CLEANUP",
    //========================================================
    GET_CAR_MODEL_DETAILS = "GET_CAR_MODEL_DETAILS",
    GET_CAR_MODEL_DETAILS_SUCCESS = "GET_CAR_MODEL_DETAILS_SUCCESS",
    GET_CAR_MODEL_DETAILS_FAILED = "GET_CAR_MODEL_DETAILS_FAILED",    
    //========================================================
    ADD_CAR_MODEL = "ADD_CAR_MODEL",
    ADD_CAR_MODEL_SUCCESS = "ADD_CAR_MODEL_SUCCESS",
    ADD_CAR_MODEL_FAILED = "ADD_CAR_MODEL_FAILED",
    //========================================================
    UPDATE_CAR_MODEL = "UPDATE_CAR_MODEL",
    UPDATE_CAR_MODEL_SUCCESS = "UPDATE_CAR_MODEL_SUCCESS",
    UPDATE_CAR_MODEL_FAILED = "UPDATE_CAR_MODEL_FAILED",
    //========================================================
    DELETE_CAR_MODEL = "DELETE_CAR_MODEL",    
    DELETE_CAR_MODEL_SUCCESS = "DELETE_CAR_MODEL_SUCCESS",    
    DELETE_CAR_MODEL_FAILED = "DELETE_CAR_MODEL_FAILED",    
    //========================================================

    //dontRemoveMeNames,
}

type Payloads = {
    
    GET_CAR_MODEL_DETAILS_SUCESS: ICarModel;
    ADD_CAR_MODEL: ShamcarRequest<ICarModel>;
    UPDATE_CAR_MODEL: ShamcarRequest<ICarModel>;
    DELETE_CAR_MODEL: ShamcarRequest<JObject>;

    //dontRemoveMePayload
}

export type actionName = typeof actionsName[keyof typeof actionsName]
export type actionType = {
    [K in keyof typeof actionsName]: {
        type: typeof actionsName[K]
        payload: K extends keyof Payloads ? Payloads[K] : any
    }
}[keyof typeof actionsName]
