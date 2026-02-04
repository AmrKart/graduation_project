import { ShamcarRequest } from "@@/common/types/axiosRequest";
import { JObject } from "@@/common/types/json";
import { IQuestion, IReview } from "@@/interfaces/Q&A";


// prettier-ignore
export enum actionsName {

    GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS",
    GET_ALL_QUESTIONS_SUCCESS = "GET_ALL_QUESTIONS_SUCCESS",
    GET_ALL_QUESTIONS_FAILED = "GET_ALL_QUESTIONS_FAILED",
    GET_ALL_QUESTIONS_CLEANUP = "GET_ALL_QUESTIONS_CLEANUP",
    //========================================================
    DELETE_QUESTION = "DELETE_QUESTION",
    DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS",
    DELETE_QUESTION_FAILED = "DELETE_QUESTION_FAILED",
    //========================================================
    DELETE_ANSWER = "DELETE_ANSWER",
    DELETE_ANSWER_SUCCESS = "DELETE_ANSWER_SUCCESS",
    DELETE_ANSWER_FAILED = "DELETE_ANSWER_FAILED",
    //========================================================
    GET_ALL_REVIEWS="GET_ALL_REVIEWS",
    GET_ALL_REVIEWS_SUCCESS="GET_ALL_REVIEWS_SUCCESS",
    GET_ALL_REVIEWS_FAILED="GET_ALL_REVIEWS_FAILED",
    GET_ALL_REVIEWS_CLEANUP="GET_ALL_REVIEWS_CLEANUP",
    //========================================================    
    UPDATE_REVIEW_STATUS="UPDATE_REVIEW_STATUS",
    UPDATE_REVIEW_STATUS_SUCCESS="UPDATE_REVIEW_STATUS_SUCCESS",
    UPDATE_REVIEW_STATUS_FAILED="UPDATE_REVIEW_STATUS_FAILED",
    //========================================================
    GET_ALL_ANSWERS = "GET_ALL_ANSWERS",
    GET_ALL_ANSWERS_SUCCESS = "GET_ALL_ANSWERS_SUCCESS",
    GET_ALL_ANSWERS_FAILED = "GET_ALL_ANSWERS_FAILED",
    GET_ALL_ANSWERS_CLEANUP = "GET_ALL_ANSWERS_CLEANUP",
    //========================================================
    ADD_ANSWER = "ADD_ANSWER",
    ADD_ANSWER_SUCCESS = "ADD_ANSWER_SUCCESS",
    ADD_ANSWER_FAILED = "ADD_ANSWER_FAILED",
    //========================================================

    //dontRemoveMeNames,
}

type Payloads = {
        
    GET_ALL_QUESTIONS_SUCCESS: Array<IQuestion>;
    DELETE_QUESTION: ShamcarRequest<JObject>;
    DELETE_ANSWER: ShamcarRequest<JObject>;
    GET_ALL_REVIEWS_SUCCESS: Array<IReview>;
    UPDATE_REVIEW_STATUS: ShamcarRequest<JObject>;

    //dontRemoveMePayload
}

export type actionName = typeof actionsName[keyof typeof actionsName]
export type actionType = {
    [K in keyof typeof actionsName]: {
        type: typeof actionsName[K]
        payload: K extends keyof Payloads ? Payloads[K] : any
    }
}[keyof typeof actionsName]
