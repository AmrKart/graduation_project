import { call, put, takeEvery } from "redux-saga/effects"
import * as axios from "@@/helpers/api_helper"
import * as actions from "./actions"
import { actionsName } from "./actionTypes"
import { JObject } from "@@/common/types/json"
import { Response } from "@@/common/types/axiosResponse"
import * as url from "@@/helpers/url_helper"
import { SagaPayload } from "@@/common/types/sagaPayload"
import { getErrorMessage } from "@@/helpers/errorResponse"
import {
  authToken,
  getAuthObject,
  setAuthUser,
} from "@@/helpers/jwt-token-access/auth-token-header"
import { ShamcarRoutes } from "@@/routes/routeEnum"
import { ErrorMode, SuccessMode } from "@@/common/types/axiosRequest"

function* login(action: SagaPayload<JObject>) {
  try {
    localStorage.removeItem("authUser")
    const response: JObject = yield call(
      axios.post,
      url.LOGIN,
      action.payload.data,
      { error: ErrorMode.page, success: SuccessMode.none },
    )
    yield setAuthUser(response)
    yield put(actions.loginSuccess({}))
    window.document.location.href = ShamcarRoutes.Dashboard
  } catch (error: any) {
    yield put(actions.loginFailed(getErrorMessage(error)))
  }
}
function* logout(action: SagaPayload<JObject>) {
  try {
    const response: Response<JObject> = yield call(
      axios.post,
      url.LOGOUT,
      action.payload.data,
      { error: ErrorMode.none, success: SuccessMode.none },
    )
    yield localStorage.removeItem("authUser")
    yield put(actions.logoutSuccess(response.data))
    window.document.location.href = ShamcarRoutes.Login
  } catch (error: any) {
    yield localStorage.removeItem("authUser")
    yield put(actions.logoutFailed(getErrorMessage(error)))
    window.document.location.href = ShamcarRoutes.Login
  }
}

//================================================================


//dontRemoveMe
function* authenticationSaga() {
  yield takeEvery(actionsName.LOGIN, login)
  yield takeEvery(actionsName.LOGOUT, logout)
  //dontRemoveMeWatcher
}
export default authenticationSaga
