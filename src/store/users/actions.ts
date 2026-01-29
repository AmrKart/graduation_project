import { JObject } from "@@/common/types/json"
import { ShamcarRequest } from "@@/common/types/axiosRequest"
import { actionsName, actionType } from "./actionTypes"
import { IUser } from "@@/interfaces/user"


export const getUsers = (data: any): actionType => {
    return {
        type: actionsName.GET_USERS,
        payload: data,
    }
}
export const getUsersSuccess = (data: any): actionType => {
    return {
        type: actionsName.GET_USERS_SUCCESS,
        payload: data,
    }
}
export const getUsersFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_USERS_FAILED,
        payload: data,
    }
}
export const getUsersCleanup = (): actionType => {
    return {
        type: actionsName.GET_USERS_CLEANUP,
        payload: {},
    }
}
//================================================================
export const getSingleUser = (data: any): actionType => {
    return {
        type: actionsName.GET_SINGLE_USER,
        payload: data,
    }
}
export const getSingleUserSuccess = (data: IUser): actionType => {
    return {
        type: actionsName.GET_SINGLE_USER_SUCCESS,
        payload: data,
    }
}
export const getSingleUserFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_SINGLE_USER_FAILED,
        payload: data,
    }
}
export const getSingleUserCleanup = (): actionType => {
    return {
        type: actionsName.GET_SINGLE_USER_CLEANUP,
        payload: {},
    }
}
//================================================================
export const createUser = (data: ShamcarRequest<IUser>): actionType => {
    return {
        type: actionsName.CREATE_USER,
        payload: data,
    }
}
export const createUserSuccess = (data: any): actionType => {
    return {
        type: actionsName.CREATE_USER_SUCCESS,
        payload: data,
    }
}
export const createUserFailed = (data: any): actionType => {
    return {
        type: actionsName.CREATE_USER_FAILED,
        payload: data,
    }
}
export const createUserCleanup = (): actionType => {
    return {
        type: actionsName.CREATE_USER_CLEANUP,
        payload: {},
    }
}
export const changeUserSuccess = (): any => {
    return {
        type: actionsName.CHANGE_USER_SUCCESS,
        payload: null,
    }
}
//================================================================
export const updateUser = (data: ShamcarRequest<IUser>): actionType => {
    return {
        type: actionsName.UPDATE_USER,
        payload: data,
    }
}
export const updateUserSuccess = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_USER_SUCCESS,
        payload: data,
    }
}
export const updateUserFailed = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_USER_FAILED,
        payload: data,
    }
}
export const updateUserCleanup = (): actionType => {
    return {
        type: actionsName.UPDATE_USER_CLEANUP,
        payload: {},
    }
}
//================================================================
export const deleteUser = (data: ShamcarRequest<JObject>): actionType => {
    return {
        type: actionsName.DELETE_USER,
        payload: data,
    }
}
export const deleteUserSuccess = (data: any): actionType => {
    return {
        type: actionsName.DELETE_USER_SUCCESS,
        payload: data,
    }
}
export const deleteUserFailed = (data: any): actionType => {
    return {
        type: actionsName.DELETE_USER_FAILED,
        payload: data,
    }
}
//================================================================
export const activateUser = (data: ShamcarRequest<JObject>): actionType => {
    return {
        type: actionsName.ACTIVATE_USER,
        payload: data,
    }
}
export const activateUserSuccess = (data: any): actionType => {
    return {
        type: actionsName.ACTIVATE_USER_SUCCESS,
        payload: data,
    }
}
export const activateUserFailed = (data: any): actionType => {
    return {
        type: actionsName.ACTIVATE_USER_FAILED,
        payload: data,
    }
}

//================================================================
export const deactivateUser = (data: ShamcarRequest<JObject>): actionType => {
    return {
        type: actionsName.DEACTIVATE_USER,
        payload: data,
    }
}
export const deactivateUserSuccess = (data: any): actionType => {
    return {
        type: actionsName.DEACTIVATE_USER_SUCCESS,
        payload: data,
    }
}
export const deactivateUserFailed = (data: any): actionType => {
    return {
        type: actionsName.DEACTIVATE_USER_FAILED,
        payload: data,
    }
}