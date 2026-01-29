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
import { ICarMake, jsonToICarMake } from "@@/interfaces/carMake"

function* getCarMakes(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_CAR_MAKES,
      {success: SuccessMode.none, error: ErrorMode.message}
    )
    yield put(actions.getCarMakesSuccess(response.data?.map(jsonToICarMake)))
  } catch (error) {
    yield put(actions.getCarMakesFailed(error))
  }
}
//================================================================

function* addCarMake(action: SagaPayload<ICarMake>) {
  try {
    const response: Response<JObject> = yield call(
      axios.post,
      url.ADD_CAR_MAKE,
      action.payload.data,
      {success : SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.addCarMakeSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.addCarMakeFailed(error))
  }
}
//================================================================

function* getCarMakeDetails(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_CAR_MAKE_DETAILS.replace(":id", action.payload.data?.id ?? ""),
      {success: SuccessMode.none, error: ErrorMode.message}
    )
    yield put(actions.getCarMakeDetailsSuccess(jsonToICarMake(response?.data)))
  } catch (error) {
    yield put(actions.getCarMakeDetailsFailed(error))
  }
}
//================================================================

function* updateCarMake(action: SagaPayload<ICarMake>) {
  try {
    const response: Response<JObject> = yield call(
      axios.put,
      url.UPDATE_CAR_MAKE.replace(":id", action.payload.data?.id ?? ''),
      action.payload.data,
      {success: SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.updateCarMakeSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.updateCarMakeFailed(error))
  }
}
//================================================================

function* deleteCarMake(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.del,
      url.DELETE_CAR_MAKE.replace(":id", action.payload.data?.id ?? ""),      
      {success : SuccessMode.message, error: ErrorMode.message},
    )
    yield put(actions.deleteCarMakeSuccess(response.data))
    console.log("success");
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.deleteCarMakeFailed(error))
  }
}
//================================================================

//dontRemoveMe

function* carMakesSaga() {
  yield takeEvery(actionsName.GET_CAR_MAKES, getCarMakes)
  yield takeEvery(actionsName.ADD_CAR_MAKE, addCarMake)
  yield takeEvery(actionsName.GET_CAR_MAKE_DETAILS, getCarMakeDetails)
  yield takeEvery(actionsName.UPDATE_CAR_MAKE, updateCarMake)
  yield takeEvery(actionsName.DELETE_CAR_MAKE, deleteCarMake)  
  //dontRemoveMeWatcher
}
export default carMakesSaga
