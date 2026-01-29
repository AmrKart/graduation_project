import { ICarModel } from "@@/interfaces/carModel"
import { actionsName, actionType } from "./actionTypes"
import { ShamcarRequest } from "@@/common/types/axiosRequest"
import { JObject } from "@@/common/types/json"




export const getCarModels = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MODELS,
        payload: data,
    }
}
export const getCarModelsSuccess = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MODELS_SUCCESS,
        payload: data,
    }
}
export const getCarModelsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MODELS_FAILED,
        payload: data,
    }
}
export const getCarModelsCleanUp = (): any => {
    return {
        type: actionsName.GET_CAR_MODELS_CLEANUP,
        payload: null,
    }
}
//===============================================================
export const getCarModelDetails = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MODEL_DETAILS,
        payload: data,
    }
}
export const getCarModelDetailsSuccess = (data: ICarModel): actionType => {
    return {
        type: actionsName.GET_CAR_MODEL_DETAILS_SUCCESS,
        payload: data,
    }
}
export const getCarModelDetailsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MODEL_DETAILS_FAILED,
        payload: data,
    }
}
//===============================================================
export const addCarModel = (data: ShamcarRequest<ICarModel>): actionType => {
    return {
        type: actionsName.ADD_CAR_MODEL,
        payload: data,
    }
}
export const addCarModelSuccess = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_MODEL_SUCCESS,
        payload: data,
    }
}
export const addCarModelFailed = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_MODEL_FAILED,
        payload: data,
    }
}
//===============================================================
export const updateCarModel = (data: ShamcarRequest<ICarModel>): actionType => {
    return {
        type: actionsName.UPDATE_CAR_MODEL,
        payload: data,
    }
}
export const updateCarModelSuccess = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_MODEL_SUCCESS,
        payload: data,
    }
}
export const updateCarModelFailed = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_MODEL_FAILED,
        payload: data,
    }
}
//===============================================================
export const deleteCarModel = (data: ShamcarRequest<JObject>): actionType => {
    return {
        type: actionsName.DELETE_CAR_MODEL,
        payload: data,
    }
}
export const deleteCarModelSuccess = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_MODEL_SUCCESS,
        payload: data,
    }
}
export const deleteCarModelFailed = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_MODEL_FAILED,
        payload: data,
    }
}
//==============================================================