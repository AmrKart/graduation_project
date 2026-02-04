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
import { jsonToIAnswer, jsonToIQuestion, jsonToIReview } from "@@/interfaces/Q&A"


function* getAllQuestions(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_ALL_QUESTIONS,
            {success: SuccessMode.none, error: ErrorMode.page}
        )
        yield put(actions.getAllQuestionsSuccess(response.data?.items?.map(jsonToIQuestion)))
    } catch (error) {
        yield put(actions.getAllQuestionsFailed(error))
    }
}
//============================================================================
function* deleteQuestion(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.del,
            url.DELETE_QUESTION.replace(":id", action.payload.data.id),
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.deleteQuestionSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.deleteQuestionFailed(error))
    }
}
//============================================================================
function* deleteAnswer(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.del,
            url.DELETE_ANSWER.replace(":id", action.payload.data.id),
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.deleteAnswerSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.deleteAnswerFailed(error))
    }
}
//============================================================================
function* getAllReviews(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_ALL_REVIEWS,
            {success: SuccessMode.none, error: ErrorMode.page}
        )
        yield put(actions.getAllReviewsSuccess(response.data?.items?.map(jsonToIReview)))
    } catch (error) {
        yield put(actions.getAllReviewsFailed(error))
    }
}
//============================================================================
function* updateReviewStatus(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.post,
            url.UPDATE_REVIEW_STATUS.replace(":id", action.payload?.data?.id ?? ""),
            action.payload.data,
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.updateReviewStatusSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.updateReviewStatusFailed(error))
    }
}
//============================================================================

function* getAllAnswers(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.get,
            url.GET_ALL_ANSWERS.replace(":id",action.payload?.data?.id ?? ''),
            {success: SuccessMode.none, error: ErrorMode.page}
        )
        yield put(actions.getAllAnswersSuccess(response.data?.items?.map(jsonToIAnswer)))
    } catch (error) {
        yield put(actions.getAllAnswersFailed(error))
    }
}
//============================================================================
function* addAnswer(action: SagaPayload<any>) {
    try {
        const response: Response<JObject> = yield call(
            axios.post,
            url.ADD_ANSWER.replace(":id", action.payload?.data?.id ?? ""),
            action.payload.data,
            {success: SuccessMode.message, error: ErrorMode.message}
        )
        yield put(actions.addAnswerSuccess(response.data))
        yield executeActions(action.payload?.methods || [])
    } catch (error) {
        yield put(actions.addAnswerFailed(error))
    }
}
//============================================================================


function* qaSaga() {
    yield takeEvery(actionsName.GET_ALL_QUESTIONS, getAllQuestions)
    yield takeEvery(actionsName.DELETE_QUESTION, deleteQuestion)
    yield takeEvery(actionsName.DELETE_ANSWER, deleteAnswer)
    yield takeEvery(actionsName.GET_ALL_REVIEWS, getAllReviews)
    yield takeEvery(actionsName.UPDATE_REVIEW_STATUS, updateReviewStatus)
    yield takeEvery(actionsName.GET_ALL_ANSWERS, getAllAnswers)
    yield takeEvery(actionsName.ADD_ANSWER, addAnswer)
}
export default qaSaga