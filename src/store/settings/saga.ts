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
import { jsonToISettings } from "@@/interfaces/setting"


function* getAllSettings(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_ALL_SETTINGS,
            {success: SuccessMode.none, error: ErrorMode.page}
        )
        yield put(actions.getAllSettingsSuccess(response.data?.items?.map(jsonToISettings)))
    } catch (error) {
        yield put(actions.getAllSettingsFailed(error))
    }
}
//============================================================================
//============================================================================
function* updateSetting(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.post,
            url.UPDATE_SETTING,
            action.payload.data,
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.updateSettingsSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.updateSettingsFailed(error))
    }
}
//============================================================================



function* settingsSaga() {
    yield takeEvery(actionsName.GET_SETTINGS, getAllSettings)
    yield takeEvery(actionsName.UPDATE_SETTINGS, updateSetting)
    
}
export default settingsSaga