import { actionsName, actionType } from "./actionTypes";


export const getAllSettings = (data : any) : actionType => {
    return {
        type : actionsName.GET_SETTINGS,
        payload: data,
    }
}
export const getAllSettingsSuccess = (data : any): actionType => {
    return {
        type: actionsName.GET_SETTINGS_SUCCESS,
        payload: data,
    }
}
export const getAllSettingsFailed= (data : any): actionType => {
    return {
        type: actionsName.GET_SETTINGS_FAILED,
        payload: data,
    }
}
export const getAllSettingsCleanUp = () : any => {
    return {
        type: actionsName.GET_SETTINGS_CLEANUP,
        payload: null,
    }
}
//======================================================================
export const updateSettings = (data : any) : actionType => {
    return {
        type: actionsName.UPDATE_SETTINGS,
        payload:data,
    }
}
export const updateSettingsSuccess = (data : any) : actionType => {
    return {
        type: actionsName.UPDATE_SETTINGS_SUCCESS,
        payload: data,
    }
}
export const updateSettingsFailed = (data : any) : actionType => {
    return {
        type: actionsName.UPDATE_SETTINGS_FAILED,
        payload: data,
    }
}