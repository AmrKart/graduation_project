import { ShamcarRequest } from "@@/common/types/axiosRequest";
import { JObject } from "@@/common/types/json";
import { ICarMake } from "@@/interfaces/carMake"

// prettier-ignore
export enum actionsName {

    GET_CAR_MAKES = "GET_CAR_MAKES",
    GET_CAR_MAKES_SUCCESS = "GET_CAR_MAKES_SUCCESS",
    GET_CAR_MAKES_FAILED = "GET_CAR_MAKES_FAILED",
    GET_CAR_MAKES_CLEANUP = "GET_CAR_MAKES_CLEANUP",
    //========================================================
    GET_CAR_MAKE_DETAILS = "GET_CAR_MAKE_DETAILS",
    GET_CAR_MAKE_DETAILS_SUCCESS = "GET_CAR_MAKE_DETAILS_SUCCESS",
    GET_CAR_MAKE_DETAILS_FAILED = "GET_CAR_MAKE_DETAILS_FAILED",    
    //========================================================
    ADD_CAR_MAKE = "ADD_CAR_MAKE",
    ADD_CAR_MAKE_SUCCESS = "ADD_CAR_MAKE_SUCCESS",
    ADD_CAR_MAKE_FAILED = "ADD_CAR_MAKE_FAILED",
    //========================================================
    UPDATE_CAR_MAKE = "UPDATE_CAR_MAKE",
    UPDATE_CAR_MAKE_SUCCESS = "UPDATE_CAR_MAKE_SUCCESS",
    UPDATE_CAR_MAKE_FAILED = "UPDATE_CAR_MAKE_FAILED",
    //========================================================
    DELETE_CAR_MAKE = "DELETE_CAR_MAKE",    
    DELETE_CAR_MAKE_SUCCESS = "DELETE_CAR_MAKE_SUCCESS",    
    DELETE_CAR_MAKE_FAILED = "DELETE_CAR_MAKE_FAILED",    
    //========================================================

    //dontRemoveMeNames,
}

type Payloads = {
    
    GET_CAR_MAKE_DETAILS_SUCESS: ICarMake;
    ADD_CAR_MAKE: ShamcarRequest<ICarMake>;
    UPDATE_CAR_MAKE: ShamcarRequest<ICarMake>;
    DELETE_CAR_MAKE: ShamcarRequest<JObject>;

    //dontRemoveMePayload
}

export type actionName = typeof actionsName[keyof typeof actionsName]
export type actionType = {
    [K in keyof typeof actionsName]: {
        type: typeof actionsName[K]
        payload: K extends keyof Payloads ? Payloads[K] : any
    }
}[keyof typeof actionsName]
