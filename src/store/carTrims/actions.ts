import { ICarTrim } from "@@/interfaces/carTrim"
import { actionsName, actionType } from "./actionTypes"


export const getCarTrims = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_TRIMS,
        payload: data,
    }
}
export const getCarTrimsSuccess = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_TRIMS_SUCCESS,
        payload: data,
    }
}
export const getCarTrimsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_TRIMS_FAILED,
        payload: data,
    }
}
export const getCarTrimsCleanUp = (): actionType => {
    return {
        type: actionsName.GET_CAR_TRIMS_CLEANUP,
        payload: null,
    }
}
export const getCarTrimDetails = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_TRIM_DETAILS,
        payload: data,
    }
}
export const getCarTrimDetailsSuccess = (data: ICarTrim): actionType => {
    return {
        type: actionsName.GET_CAR_TRIM_DETAILS_SUCCESS,
        payload: data,
    }
}
export const getCarTrimDetailsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_TRIM_DETAILS_FAILED,
        payload: data,
    }
}
export const getCarTrimDetailsCleanUp = (): actionType => {
    return {
        type: actionsName.GET_CAR_TRIM_DETAILS_CLEANUP,
        payload: null,
    }
}
export const addCarTrim = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_TRIM,
        payload: data,
    }
}
export const addCarTrimSuccess = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_TRIM_SUCCESS,
        payload: data,
    }
}
export const addCarTrimFailed = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_TRIM_FAILED,
        payload: data,
    }
}
export const updateCarTrim = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_TRIM,
        payload: data,
    }
}
export const updateCarTrimSuccess = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_TRIM_SUCCESS,
        payload: data,
    }
}
export const updateCarTrimFailed = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_TRIM_FAILED,
        payload: data,
    }
}
export const deleteCarTrim = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_TRIM,
        payload: data,
    }
}
export const deleteCarTrimSuccess = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_TRIM_SUCCESS,
        payload: data,
    }
}
export const deleteCarTrimFailed = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_TRIM_FAILED,
        payload: data,
    }
}
export const updateCarTrimPublished = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_TRIM_PUBLISHED,
        payload: data,
    }
}
export const updateCarTrimPublishedSuccess = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_TRIM_PUBLISHED_SUCCESS,
        payload: data,
    }
}
export const updateCarTrimPublishedFailed = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_TRIM_PUBLISHED_FAILED,
        payload: data,
    }
}
export const getCarSpecifications = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_SPECIFICATIONS,
        payload: data,
    }
}
export const getCarSpecificationsSuccess = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_SPECIFICATIONS_SUCCESS,
        payload: data,
    }
}
export const getCarSpecificationsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_SPECIFICATIONS_FAILED,
        payload: data,
    }
}