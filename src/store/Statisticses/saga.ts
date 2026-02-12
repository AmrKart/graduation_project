import { call, put, takeEvery } from "redux-saga/effects"
import * as axios from "@@/helpers/api_helper"
import * as actions from "./actions"
import { actionsName } from "./actionTypes"
import { JObject } from "@@/common/types/json"
import { Response } from "@@/common/types/axiosResponse"
import * as url from "@@/helpers/url_helper"
import { SagaPayload } from "@@/common/types/sagaPayload"
import { ErrorMode, SuccessMode } from "@@/common/types/axiosRequest"

function* getDashboardStatistics(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_DASHBOARD_STATISTICS,
      { success: SuccessMode.none, error: ErrorMode.message },
    )
    yield put(actions.getDashboardStatisticsSuccess(response.data))
  } catch (error) {
    yield put(actions.getDashboardStatisticsFailed(error))
  }
}

function* getUserStatistics(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_USER_STATISTICS,
      { success: SuccessMode.none, error: ErrorMode.message },
    )
    yield put(actions.getUserStatisticsSuccess(response.data))
  } catch (error) {
    yield put(actions.getUserStatisticsFailed(error))
  }
}

function* getCarStatistics(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_CAR_STATISTICS,
      { success: SuccessMode.none, error: ErrorMode.message },
    )
    yield put(actions.getCarStatisticsSuccess(response.data))
  } catch (error) {
    yield put(actions.getCarStatisticsFailed(error))
  }
}

function* getCommunityStatistics(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_COMMUNITY_STATISTICS,
      { success: SuccessMode.none, error: ErrorMode.message },
    )
    yield put(actions.getCommunityStatisticsSuccess(response.data))
  } catch (error) {
    yield put(actions.getCommunityStatisticsFailed(error))
  }
}

function* getEngagementStatistics(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_ENGAGEMENT_STATISTICS,
      { success: SuccessMode.none, error: ErrorMode.message },
    )
    yield put(actions.getEngagementStatisticsSuccess(response.data))
  } catch (error) {
    yield put(actions.getEngagementStatisticsFailed(error))
  }
}

function* getActivityChartsStatistics(_: SagaPayload<any>) {
  try {
    const response: Response<JObject> = yield call(
      axios.get,
      url.GET_ACTIVITY_CHARTS_STATISTICS,
      { success: SuccessMode.none, error: ErrorMode.message },
    )
    yield put(actions.getActivityChartsStatisticsSuccess(response.data))
  } catch (error) {
    yield put(actions.getActivityChartsStatisticsFailed(error))
  }
}

//dontRemoveMe

function* statisticsesSaga() {
  yield takeEvery(actionsName.GET_DASHBOARD_STATISTICS, getDashboardStatistics)
  yield takeEvery(actionsName.GET_USER_STATISTICS, getUserStatistics)
  yield takeEvery(actionsName.GET_CAR_STATISTICS, getCarStatistics)
  yield takeEvery(actionsName.GET_COMMUNITY_STATISTICS, getCommunityStatistics)
  yield takeEvery(actionsName.GET_ENGAGEMENT_STATISTICS, getEngagementStatistics)
  yield takeEvery(actionsName.GET_ACTIVITY_CHARTS_STATISTICS, getActivityChartsStatistics)
  //dontRemoveMeWatcher
}

export default statisticsesSaga

