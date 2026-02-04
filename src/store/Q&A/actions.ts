import { IAnswer, IQuestion, IReview } from "@@/interfaces/Q&A"
import { actionsName, actionType } from "./actionTypes"
import { ShamcarRequest } from "@@/common/types/axiosRequest"
import { JObject } from "@@/common/types/json"



export const getAllQuestions = (data: any): actionType => {
    return {
        type: actionsName.GET_ALL_QUESTIONS,
        payload: data,
    }
}
export const getAllQuestionsSuccess = (data: Array<IQuestion>): actionType => {
    return {
        type: actionsName.GET_ALL_QUESTIONS_SUCCESS,
        payload: data,
    }
}
export const getAllQuestionsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_ALL_QUESTIONS_FAILED,
        payload: data,
    }
}
export const getAllQuestionsCleanUp = () : any => {
    return {
        type : actionsName.GET_ALL_QUESTIONS_CLEANUP,
        payload: null,
    }
}
//============================================================================
export const deleteQuestion = (data : ShamcarRequest<JObject>): actionType => {
    return {
        type : actionsName.DELETE_QUESTION,
        payload: data,
    }
}
export const deleteQuestionSuccess = (data: any): actionType => {
    return {
        type: actionsName.DELETE_QUESTION_SUCCESS,
        payload: data,
    }
}
export const deleteQuestionFailed = (data: any): actionType => {
    return {
        type: actionsName.DELETE_QUESTION_FAILED,
        payload: data,
    }
}
//============================================================================
export const deleteAnswer = (data : ShamcarRequest<JObject>): actionType => {
    return {
        type : actionsName.DELETE_ANSWER,
        payload: data,
    }
}
export const deleteAnswerSuccess = (data: any): actionType => {
    return {
        type: actionsName.DELETE_ANSWER_SUCCESS,
        payload: data,
    }
}
export const deleteAnswerFailed = (data: any): actionType => {
    return {
        type: actionsName.DELETE_ANSWER_FAILED,
        payload: data,
    }
}
//============================================================================
export const getAllReviews = (data: any): actionType => {
    return {
        type: actionsName.GET_ALL_REVIEWS,
        payload: data,
    }
}
export const getAllReviewsSuccess = (data: Array<IReview>): actionType => {
    return {
        type: actionsName.GET_ALL_REVIEWS_SUCCESS,
        payload: data,
    }
}
export const getAllReviewsFailed = (data: any): actionType => {
    return {
        type: actionsName.GET_ALL_REVIEWS_FAILED,
        payload: data,
    }
}
export const getAllReviewsCleanUp = () : any => {
    return {
        type: actionsName.GET_ALL_REVIEWS_CLEANUP,
        payload: null,
    }
}
//============================================================================
export const updateReviewStatus = (data : ShamcarRequest<JObject>): actionType => {
    return {
        type: actionsName.UPDATE_REVIEW_STATUS,
        payload: data,
    }
}
export const updateReviewStatusSuccess = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_REVIEW_STATUS_SUCCESS,
        payload: data,
    }
}
export const updateReviewStatusFailed = (data: any): actionType => {
    return {
        type: actionsName.UPDATE_REVIEW_STATUS_FAILED,
        payload: data,
    }
}
//============================================================================
export const getAllAnswers = (data : any): actionType => {
    return {
        type : actionsName.GET_ALL_ANSWERS,
        payload: data,
    }
}
export const getAllAnswersSuccess = (data : Array<IAnswer>): actionType => {
    return {
        type: actionsName.GET_ALL_ANSWERS_SUCCESS,
        payload: data,
    }
}
export const getAllAnswersFailed = (data : any) : actionType => {
    return {
        type: actionsName.GET_ALL_ANSWERS_FAILED,
        payload: data,
    }
}
export const getAllAnswersCleanUp = () : any => {
    return {
        type: actionsName.GET_ALL_ANSWERS_CLEANUP,
        payload: null,
    }    
}
//============================================================================
export const addAnswer = (data : ShamcarRequest<JObject>): actionType => {
    return{
        type: actionsName.ADD_ANSWER,
        payload: data,
    }
}
export const addAnswerSuccess = (data : any) : actionType => {
    return {
        type: actionsName.ADD_ANSWER_SUCCESS,
        payload: data,
    }
}
export const addAnswerFailed = (data : any) : actionType => {
    return {
        type: actionsName.ADD_ANSWER_FAILED,
        payload: data,
    }
}
//============================================================================