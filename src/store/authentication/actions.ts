import { actionsName, actionType } from "./actionTypes"
import { ShamcarRequest } from "@@/common/types/axiosRequest"
import { JObject } from "@@/common/types/json"

export const login = (data: ShamcarRequest<JObject>): actionType => {
  return {
    type: "LOGIN",
    payload: data,
  }
}
export const loginSuccess = (data: any): actionType => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  }
}
export const loginFailed = (data: string): actionType => {
  return {
    type: "LOGIN_FAILED",
    payload: data,
  }
}
//================================================================
export const logout = (data: ShamcarRequest<JObject>): actionType => {
  return {
    type: "LOGOUT",
    payload: data,
  }
}
export const logoutSuccess = (data: any): actionType => {
  return {
    type: "LOGOUT_SUCCESS",
    payload: data,
  }
}
export const logoutFailed = (data: string): actionType => {
  return {
    type: "LOGOUT_FAILED",
    payload: data,
  }
}

//================================================================

export const refreshAccessToken = (): actionType => {
  return {
    type: "REFRESH_TOKEN",
    payload: "",
  }
}

//================================================================

export const changePassword = (data : any): actionType => {
  return {
    type: "CHANGE_PASSWORD",
    payload: data,
  }
}
export const changePasswordSuccess = (data : any): actionType => {
  return {
    type: "CHANGE_PASSWORD_SUCCESS",
    payload: data,
  }
}
export const changePasswordFailed = (data : any): actionType => {
  return {
    type: "CHANGE_PASSWORD_FAILED",
    payload: data,
  }
}
export const changePasswordCleanUp = () : actionType => {
  return {
    type: "CHANGE_PASSWORD_CLEANUP",
    payload: null,
  }
}

//dontRemoveMe
