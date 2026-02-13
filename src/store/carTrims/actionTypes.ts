
// prettier-ignore
export enum actionsName {

    GET_CAR_TRIMS = "GET_CAR_TRIMS",
    GET_CAR_TRIMS_SUCCESS = "GET_CAR_TRIMS_SUCCESS",
    GET_CAR_TRIMS_FAILED = "GET_CAR_TRIMS_FAILED",
    GET_CAR_TRIMS_CLEANUP = "GET_CAR_TRIMS_CLEANUP",
    //========================================================
    GET_CAR_TRIM_DETAILS = "GET_CAR_TRIM_DETAILS",
    GET_CAR_TRIM_DETAILS_SUCCESS = "GET_CAR_TRIM_DETAILS_SUCCESS",
    GET_CAR_TRIM_DETAILS_FAILED = "GET_CAR_TRIM_DETAILS_FAILED",    
    GET_CAR_TRIM_DETAILS_CLEANUP = "GET_CAR_TRIM_DETAILS_CLEANUP",
    //========================================================
    ADD_CAR_TRIM = "ADD_CAR_TRIM",
    ADD_CAR_TRIM_SUCCESS = "ADD_CAR_TRIM_SUCCESS",
    ADD_CAR_TRIM_FAILED = "ADD_CAR_TRIM_FAILED",
    //========================================================
    UPDATE_CAR_TRIM = "UPDATE_CAR_TRIM",
    UPDATE_CAR_TRIM_SUCCESS = "UPDATE_CAR_TRIM_SUCCESS",
    UPDATE_CAR_TRIM_FAILED = "UPDATE_CAR_TRIM_FAILED",
    //========================================================
    DELETE_CAR_TRIM = "DELETE_CAR_TRIM",
    DELETE_CAR_TRIM_SUCCESS = "DELETE_CAR_TRIM_SUCCESS",
    DELETE_CAR_TRIM_FAILED = "DELETE_CAR_TRIM_FAILED",
    //========================================================
    UPDATE_CAR_TRIM_PUBLISHED = "UPDATE_CAR_TRIM_PUBLISHED",
    UPDATE_CAR_TRIM_PUBLISHED_SUCCESS = "UPDATE_CAR_TRIM_PUBLISHED_SUCCESS",
    UPDATE_CAR_TRIM_PUBLISHED_FAILED = "UPDATE_CAR_TRIM_PUBLISHED_FAILED",
    //========================================================
    GET_CAR_SPECIFICATIONS = "GET_CAR_SPECIFICATIONS",
    GET_CAR_SPECIFICATIONS_SUCCESS = "GET_CAR_SPECIFICATIONS_SUCCESS",
    GET_CAR_SPECIFICATIONS_FAILED = "GET_CAR_SPECIFICATIONS_FAILED",
    //========================================================

    //dontRemoveMeNames,
}

type Payloads = {
    
    

    //dontRemoveMePayload
}

export type actionName = typeof actionsName[keyof typeof actionsName]
export type actionType = {
    [K in keyof typeof actionsName]: {
        type: typeof actionsName[K]
        payload: K extends keyof Payloads ? Payloads[K] : any
    }
}[keyof typeof actionsName]
