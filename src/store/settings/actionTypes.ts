

// prettier-ignore
export enum actionsName {

    GET_SETTINGS = "GET_SETTINGS",
    GET_SETTINGS_SUCCESS = "GET_SETTINGS_SUCCESS",
    GET_SETTINGS_FAILED = "GET_SETTINGS_FAILED",
    GET_SETTINGS_CLEANUP = "GET_SETTINGS_CLEANUP",
    //========================================================
    UPDATE_SETTINGS = "UPDATE_SETTINGS",
    UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS",
    UPDATE_SETTINGS_FAILED = "UPDATE_SETTINGS_FAILED",
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
