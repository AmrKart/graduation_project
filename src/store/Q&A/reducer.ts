import { IQuestion, IReview } from "@@/interfaces/Q&A";
import { actionsName, actionType } from "./actionTypes";


interface initState {
    questions: {
        loading: boolean;
        data?: Array<IQuestion>;
    },    
    reviews: {
        loading: boolean;
        data?: Array<IReview>;
    },
    actionLoader: boolean;
    actionSuccess: boolean;
}
const INIT_STATE: initState = {
    questions: {
        loading: false,
        data: [],
    },
    reviews: {
        loading: false,
        data: [],
    },
    actionLoader: false,
    actionSuccess: false,
}

const QAReducer = (state = INIT_STATE, action: actionType) => {
    switch (action.type) {
        case actionsName.GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: {
                    ...state.questions,
                    loading: true,
                    ...action.payload.data,
                    
                },
            }
        case actionsName.GET_ALL_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: {
                    loading: false,
                    data: action.payload,
                },
            }
        case actionsName.GET_ALL_QUESTIONS_FAILED:
            return {
                ...state,
                questions: {
                    ...state.questions,
                    loading: false,                    
                },
            }
        case actionsName.GET_ALL_QUESTIONS_CLEANUP:
            return {
                ...state,
                questions: {
                    ...INIT_STATE.questions,
                },
            }
        case actionsName.DELETE_QUESTION:
            return {
                ...state,
                actionLoader: true,                
            }
        case actionsName.DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                actionLoader: false,                
            }
        case actionsName.DELETE_QUESTION_FAILED:
            return {
                ...state,
                actionLoader: false,
            }
        case actionsName.DELETE_ANSWER:
            return {
                ...state,
                actionLoader: true,                
            }
        case actionsName.DELETE_ANSWER_SUCCESS:
            return {
                ...state,
                actionLoader: false,                
            }
        case actionsName.DELETE_ANSWER_FAILED:
            return {
                ...state,
                actionLoader: false,
            }
        case actionsName.GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    loading: true,
                    ...action.payload.data,
                },
            }
        case actionsName.GET_ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: {                    
                    loading: false,
                    data: action.payload,
                },
            }
        case actionsName.GET_ALL_REVIEWS_FAILED:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    loading: false,                    
                },
            }
        case actionsName.GET_ALL_REVIEWS_CLEANUP:
            return {
                ...state,
                reviews: {
                    ...INIT_STATE.reviews,
                },
            }
        case actionsName.UPDATE_REVIEW_STATUS:
            return {
                ...state,
                actionLoader: true,                
            }
        case actionsName.UPDATE_REVIEW_STATUS_SUCCESS:
            return {
                ...state,
                actionLoader: false,                
            }
        case actionsName.UPDATE_REVIEW_STATUS_FAILED:
            return {
                ...state,
                actionLoader: false,
            }
        default:
            return state;
    }
}
export default QAReducer;