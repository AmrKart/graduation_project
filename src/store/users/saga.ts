import { call, put, takeEvery } from "redux-saga/effects"
import * as axios from "@@/helpers/api_helper"
import * as actions from "./actions"
import { actionsName } from "./actionTypes"
import { JObject } from "@@/common/types/json"
import { Response } from "@@/common/types/axiosResponse"
import * as url from "@@/helpers/url_helper"
import { SagaPayload } from "@@/common/types/sagaPayload"
import { ErrorMode, SuccessMode } from "@@/common/types/axiosRequest"
import { executeActions } from "@@/helpers/executeActionsHelper"
import { IUser, jsonToIUser } from "@@/interfaces/user"

function* getUsers(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_USERS,
      {success: SuccessMode.none, error: ErrorMode.message}
    )
    yield put(actions.getUsersSuccess(response.data?.items?.map(jsonToIUser)))
  } catch (error) {
    yield put(actions.getUsersFailed(error))
  }
}
//================================================================

function* createUser(action: SagaPayload<IUser>) {
  try {
    const response: Response<JObject> = yield call(
      axios.post,
      url.CREATE_USER,
      action.payload.data,
      {success : SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.createUserSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.createUserFailed(error))
  }
}
//================================================================

function* getSingleUser(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_SINGLE_USER.replace(":id", action.payload.data?.id ?? ""),
      {success: SuccessMode.none, error: ErrorMode.message}
    )
    yield put(actions.getSingleUserSuccess(jsonToIUser(response?.data)))
  } catch (error) {
    yield put(actions.getSingleUserFailed(error))
  }
}
//================================================================

function* updateUser(action: SagaPayload<IUser>) {
  try {
    const response: Response<JObject> = yield call(
      axios.put,
      url.UPDATE_USER.replace(":id", action.payload.data?.id ?? ''),
      action.payload.data,
      {success: SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.updateUserSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.updateUserFailed(error))
  }
}
//================================================================

function* deleteUser(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.del,
      url.DELETE_USER.replace(":id", action.payload.data?.id ?? ""),      
      {success : SuccessMode.message, error: ErrorMode.message},
    )
    yield put(actions.deleteUserSuccess(response.data))
    console.log("success");
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.deleteUserFailed(error))
  }
}
//================================================================

function* activateUser(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.post,
      url.ACTIVATE_USER.replace(":id", action.payload.data?.id ?? ""),
      action.payload.data,
      {success: SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.activateUserSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.activateUserFailed(error))
  }
}
//================================================================

function* deactivateUser(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.post,
      url.DEACTIVATE_USER.replace(":id", action.payload.data?.id ?? ""),
      action.payload.data,
      {success: SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.deactivateUserSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.deactivateUserFailed(error))
  }
}
//================================================================

//dontRemoveMe

function* usersSaga() {
  yield takeEvery(actionsName.GET_USERS, getUsers)
  yield takeEvery(actionsName.CREATE_USER, createUser)
  yield takeEvery(actionsName.GET_SINGLE_USER, getSingleUser)
  yield takeEvery(actionsName.UPDATE_USER, updateUser)
  yield takeEvery(actionsName.DELETE_USER, deleteUser)
  yield takeEvery(actionsName.ACTIVATE_USER, activateUser)
  yield takeEvery(actionsName.DEACTIVATE_USER, deactivateUser)
  //dontRemoveMeWatcher
}
export default usersSaga
