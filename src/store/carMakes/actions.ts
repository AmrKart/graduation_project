import { ICarMake } from "@@/interfaces/carMake"
import { actionsName, actionType } from "./actionTypes"
import { ShamcarRequest } from "@@/common/types/axiosRequest"
import { JObject } from "@@/common/types/json"




export const getCarMakes = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MAKES,
        payload: data,
    }
}
export const getCarMakesSuccess = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MAKES_SUCCESS,
        payload: data,
    }
}
export const getCarMakesFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MAKES_FAILED,
        payload: data,
    }
}
export const getCarMakesCleanUp = (): any => {
    return {
        type: actionsName.GET_CAR_MAKES_CLEANUP,
        payload: null,
    }
}
//===============================================================
export const getCarMakeDetails = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MAKE_DETAILS,
        payload: data,
    }
}
export const getCarMakeDetailsSuccess = (data: ICarMake): actionType => {
    return {
        type: actionsName.GET_CAR_MAKE_DETAILS_SUCCESS,
        payload: data,
    }
}
export const getCarMakeDetailsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_CAR_MAKE_DETAILS_FAILED,
        payload: data,
    }
}
//===============================================================
export const addCarMake = (data: ShamcarRequest<ICarMake>): actionType => {
    return {
        type: actionsName.ADD_CAR_MAKE,
        payload: data,
    }
}
export const addCarMakeSuccess = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_MAKE_SUCCESS,
        payload: data,
    }
}
export const addCarMakeFailed = (data: any): actionType => {
    return {
        type: actionsName.ADD_CAR_MAKE_FAILED,
        payload: data,
    }
}
//===============================================================
export const updateCarMake = (data: ShamcarRequest<ICarMake>): actionType => {
    return {
        type: actionsName.UPDATE_CAR_MAKE,
        payload: data,
    }
}
export const updateCarMakeSuccess = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_MAKE_SUCCESS,
        payload: data,
    }
}
export const updateCarMakeFailed = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_CAR_MAKE_FAILED,
        payload: data,
    }
}
//===============================================================
export const deleteCarMake = (data: ShamcarRequest<JObject>): actionType => {
    return {
        type: actionsName.DELETE_CAR_MAKE,
        payload: data,
    }
}
export const deleteCarMakeSuccess = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_MAKE_SUCCESS,
        payload: data,
    }
}
export const deleteCarMakeFailed = (data: any): actionType => {
    return {
        type: actionsName.DELETE_CAR_MAKE_FAILED,
        payload: data,
    }
}
//==============================================================