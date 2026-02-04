import { IAnswer, IQuestion, IReview } from "@@/interfaces/Q&A";
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
    answers: {
        loading: boolean,
        data?: Array<IAnswer>,
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
    answers: {
        loading: false,
        data: [],
    },
    actionLoader: false,
    actionSuccess: false,
}

const QAReducer = (state = INIT_STATE, action: actionType) => {
    switch (action.type) {
        case actionsName.GET_ALL_QUESTIONS:
            return (state = {
                ...state,
                questions: {
                    ...state.questions,
                    loading: true,
                    ...action.payload.data,

                },
            })
        case actionsName.GET_ALL_QUESTIONS_SUCCESS:
            return (state = {
                ...state,
                questions: {
                    loading: false,
                    data: action.payload,
                },
            })
        case actionsName.GET_ALL_QUESTIONS_FAILED:
            return (state = {
                ...state,
                questions: {
                    ...state.questions,
                    loading: false,
                },
            })
        case actionsName.GET_ALL_QUESTIONS_CLEANUP:
            return (state = {
                ...state,
                questions: {
                    ...INIT_STATE.questions,
                },
            })
        case actionsName.DELETE_QUESTION:
            return (state = {
                ...state,
                actionLoader: true,
            })
        case actionsName.DELETE_QUESTION_SUCCESS:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.DELETE_QUESTION_FAILED:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.DELETE_ANSWER:
            return (state = {
                ...state,
                actionLoader: true,
            })
        case actionsName.DELETE_ANSWER_SUCCESS:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.DELETE_ANSWER_FAILED:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.GET_ALL_REVIEWS:
            return (state = {
                ...state,
                reviews: {
                    ...state.reviews,
                    loading: true,
                    ...action.payload.data,
                },
            })
        case actionsName.GET_ALL_REVIEWS_SUCCESS:
            return (state = {
                ...state,
                reviews: {
                    loading: false,
                    data: action.payload,
                },
            })
        case actionsName.GET_ALL_REVIEWS_FAILED:
            return (state = {
                ...state,
                reviews: {
                    ...state.reviews,
                    loading: false,
                },
            })
        case actionsName.GET_ALL_REVIEWS_CLEANUP:
            return (state = {
                ...state,
                reviews: {
                    ...INIT_STATE.reviews,
                },
            })
        case actionsName.UPDATE_REVIEW_STATUS:
            return (state = {
                ...state,
                actionLoader: true,
            })
        case actionsName.UPDATE_REVIEW_STATUS_SUCCESS:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.UPDATE_REVIEW_STATUS_FAILED:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.GET_ALL_ANSWERS:
            return (state = {
                ...state,
                answers: {
                    ...state.answers,
                    loading: true,
                    ...action.payload.data,
                }
            })
        case actionsName.GET_ALL_ANSWERS_SUCCESS:
            return (state = {
                ...state,
                answers: {
                    ...state.answers,
                    loading: false,
                    data: action.payload
                }
            })
        case actionsName.GET_ALL_ANSWERS_FAILED:
            return (state = {
                ...state,
                answers: {
                    ...state.answers,
                    loading: false,
                }
            })
        case actionsName.GET_ALL_ANSWERS_CLEANUP:
            return (state = {
                ...state,
                answers: { ...INIT_STATE.answers }
            })
        case actionsName.ADD_ANSWER:
            return (state = {
                ...state,
                actionLoader: true,
            })
        case actionsName.ADD_ANSWER_SUCCESS:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.ADD_ANSWER_FAILED:
            return (state = {
                ...state,
                actionLoader: false,
            })
        default:
            return state;
    }
}
export default QAReducer;