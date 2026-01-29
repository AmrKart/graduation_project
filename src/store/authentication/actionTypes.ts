import { ShamcarRequest } from "@@/common/types/axiosRequest"
import { JObject } from "@@/common/types/json"

export const actionsName = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",
  //================================================================

  REFRESH_TOKEN: "REFRESH_TOKEN",
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
  REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED",
  //================================================================  
  //dontRemoveMeNames
}

export type actionType =
  | { type: "LOGIN"; payload: ShamcarRequest<JObject> }
  | { type: "LOGIN_SUCCESS"; payload: any }

  | { type: "LOGIN_FAILED"; payload: any }
  | { type: "LOGOUT"; payload: ShamcarRequest<JObject> }
  | { type: "LOGOUT_SUCCESS"; payload: any }
  | { type: "LOGOUT_FAILED"; payload: any }
  //================================================================
  | { type: "REFRESH_TOKEN"; payload: any }
//================================================================

//dontRemoveMeType
