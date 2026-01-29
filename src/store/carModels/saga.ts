import { call, put, takeEvery } from "redux-saga/effects"
import * as axios from "@@/helpers/api_helper"
import * as actions from "./action"
import { actionsName } from "./actionTypes"
import { JObject } from "@@/common/types/json"
import { Response } from "@@/common/types/axiosResponse"
import * as url from "@@/helpers/url_helper"
import { SagaPayload } from "@@/common/types/sagaPayload"
import { ErrorMode, SuccessMode } from "@@/common/types/axiosRequest"
import { executeActions } from "@@/helpers/executeActionsHelper"
import { ICarModel, jsonToICarModel } from "@@/interfaces/carModel"

function* getCarModels(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_CAR_MODELS,
      {success: SuccessMode.none, error: ErrorMode.message}
    )
    yield put(actions.getCarModelsSuccess(response.data?.items?.map(jsonToICarModel)))
  } catch (error) {
    yield put(actions.getCarModelsFailed(error))
  }
}
//================================================================

function* addCarModel(action: SagaPayload<ICarModel>) {
  try {
    const response: Response<JObject> = yield call(
      axios.post,
      url.ADD_CAR_MODEL,
      action.payload.data,
      {success : SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.addCarModelSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.addCarModelFailed(error))
  }
}
//================================================================

function* getCarModelDetails(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_CAR_MODEL_DETAILS.replace(":id", action.payload.data?.id ?? ""),
      {success: SuccessMode.none, error: ErrorMode.message}
    )
    yield put(actions.getCarModelDetailsSuccess(jsonToICarModel(response?.data)))
  } catch (error) {
    yield put(actions.getCarModelDetailsFailed(error))
  }
}
//================================================================

function* updateCarModel(action: SagaPayload<ICarModel>) {
  try {
    const response: Response<JObject> = yield call(
      axios.put,
      url.UPDATE_CAR_MODEL.replace(":id", action.payload.data?.id ?? ''),
      action.payload.data,
      {success: SuccessMode.message, error: ErrorMode.message}
    )
    yield put(actions.updateCarModelSuccess(response.data))
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.updateCarModelFailed(error))
  }
}
//================================================================

function* deleteCarModel(action: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.del,
      url.DELETE_CAR_MODEL.replace(":id", action.payload.data?.id ?? ""),      
      {success : SuccessMode.message, error: ErrorMode.message},
    )
    yield put(actions.deleteCarModelSuccess(response.data))
    console.log("success");
    yield executeActions(action.payload?.methods || [])
  } catch (error) {
    yield put(actions.deleteCarModelFailed(error))
  }
}
//================================================================

//dontRemoveMe

function* carModelsSaga() {
  yield takeEvery(actionsName.GET_CAR_MODELS, getCarModels)
  yield takeEvery(actionsName.ADD_CAR_MODEL, addCarModel)
  yield takeEvery(actionsName.GET_CAR_MODEL_DETAILS, getCarModelDetails)
  yield takeEvery(actionsName.UPDATE_CAR_MODEL, updateCarModel)
  yield takeEvery(actionsName.DELETE_CAR_MODEL, deleteCarModel)  
  //dontRemoveMeWatcher
}
export default carModelsSaga
