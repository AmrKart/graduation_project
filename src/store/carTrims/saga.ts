import { ErrorMode, SuccessMode } from "@@/common/types/axiosRequest"
import * as axios from "@@/helpers/api_helper"
import * as actions from "./actions"
import { actionsName } from "./actionTypes"
import { JObject } from "@@/common/types/json"
import { Response } from "@@/common/types/axiosResponse"
import * as url from "@@/helpers/url_helper"
import { SagaPayload } from "@@/common/types/sagaPayload"
import { call, put, takeEvery } from "redux-saga/effects"
import { ICarTrim, jsonToICarTrim } from "@@/interfaces/carTrim"
import { executeActions } from "@@/helpers/executeActionsHelper"


const buildCarTrimFormData = (data: any): FormData => {
    const formData = new FormData()
    const entries = Object.entries(data || {})

    console.log("dataForm = ", data);

    for (const [key, value] of entries) {
        if (value === undefined || value === null) continue

        if (key === "imageFile" && value instanceof File) {
            // backend can read this as "image"
            formData.append("image", value)
        } else if (Array.isArray(value) || typeof value === "object") {
            formData.append(key, JSON.stringify(value))
        } else {
            formData.append(key, String(value))
        }
    }

    console.log("formDataamr = ");
    for (const value of Array.from(formData.values())) {
        console.log(value);
      }

    return formData
}


function* getCarTrims(_: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_CAR_TRIMS,
            {success: SuccessMode.none, error: ErrorMode.message}
        )
        yield put(actions.getCarTrimsSuccess(response.data?.map(jsonToICarTrim)))
    } catch (error) {
    yield put(actions.getCarTrimsFailed(error))
    }
}
//================================================================

function* getCarTrimDetails(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_CAR_TRIM_DETAILS.replace(":id", action.payload.data?.id ?? ""),
            {success: SuccessMode.none, error: ErrorMode.message}
        )
        yield put(actions.getCarTrimDetailsSuccess(jsonToICarTrim(response?.data)))
    } catch (error) {
    yield put(actions.getCarTrimDetailsFailed(error))
    }
}
//================================================================

function* addCarTrim(action: SagaPayload<ICarTrim>) {
    try {
        const formData = buildCarTrimFormData(action.payload.data)
        const response: Response<JObject> = yield call(
            axios.post,
            url.ADD_CAR_TRIM,
            formData,
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.addCarTrimSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.addCarTrimFailed(error))
    }
}
//================================================================
function* updateCarTrim(action: SagaPayload<ICarTrim>) {
    try {
        const formData = buildCarTrimFormData(action.payload.data)
        const response: Response<JObject> = yield call(
            axios.put,
            url.UPDATE_CAR_TRIM.replace(":id", action.payload.data?.id ?? ""),
            formData,
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.updateCarTrimSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.updateCarTrimFailed(error))
    }
}
//================================================================
function* deleteCarTrim(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.del,
            url.DELETE_CAR_TRIM.replace(":id", action.payload.data?.id ?? ""),
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.deleteCarTrimSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.deleteCarTrimFailed(error))
    }
}
//================================================================
function* updateCarTrimPublished(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.post,
            url.UPDATE_CAR_TRIM_PUBLISHED.replace(":id", action.payload.data?.id ?? ""),
            action.payload.data,
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.updateCarTrimPublishedSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.updateCarTrimPublishedFailed(error))
    }
}
//================================================================
function* getCarSpecifications(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_CAR_SPECIFICATIONS,            
            {success: SuccessMode.none, error: ErrorMode.message},
            action.payload.data,
        )
        yield put(actions.getCarSpecificationsSuccess(response.data))
    } catch (error) {
        yield put(actions.getCarSpecificationsFailed(error))
    }
}
function* carTrimsSaga() {
    yield takeEvery(actionsName.GET_CAR_TRIMS, getCarTrims)
    yield takeEvery(actionsName.GET_CAR_TRIM_DETAILS, getCarTrimDetails)
    yield takeEvery(actionsName.ADD_CAR_TRIM, addCarTrim)
    yield takeEvery(actionsName.UPDATE_CAR_TRIM, updateCarTrim)
    yield takeEvery(actionsName.DELETE_CAR_TRIM, deleteCarTrim)    
    yield takeEvery(actionsName.UPDATE_CAR_TRIM_PUBLISHED, updateCarTrimPublished)
    yield takeEvery(actionsName.GET_CAR_SPECIFICATIONS, getCarSpecifications)
    //dontRemoveMeWatcher
}
export default carTrimsSaga;