//============================Moi===============================

export const LOGIN = "/admin/login"
// export const PROFILE = "/auth/profile"
export const REFRESH_TOKEN = "/auth/refresh-token"
export const LOGOUT = "/admin/logout"

//============================Users===============================
export const GET_USERS = "/admin/users"
export const CREATE_USER = "/admin/users"
export const GET_SINGLE_USER = "/admin/users/:id"
export const UPDATE_USER = "/admin/users/:id"
export const DELETE_USER = "/admin/users/:id"
//============================Users===============================
export const ACTIVATE_USER = "/admin/user/active/:id"
export const DEACTIVATE_USER = "/admin/user/disable/:id"

//============================Admins===============================
export const GET_ADMINS = "/admin/admins"
//============================Admins===============================

//============================Car-Makes===============================
export const GET_CAR_MAKES = "/admin/car-makes";
export const GET_CAR_MAKE_DETAILS = "/admin/car-makes/:id";
export const ADD_CAR_MAKE = "/admin/car-makes";
export const UPDATE_CAR_MAKE = "/admin/car-makes/:id";
export const DELETE_CAR_MAKE = "/admin/car-makes/:id";
//============================Car-Makes===============================

//============================Car-Models===============================
export const GET_CAR_MODELS = "/admin/car-models";
export const GET_CAR_MODEL_DETAILS = "/admin/car-models/:id";
export const ADD_CAR_MODEL = "/admin/car-models";
export const UPDATE_CAR_MODEL = "/admin/car-models/:id";
export const DELETE_CAR_MODEL = "/admin/car-models/:id";
//============================Car-Models===============================

//============================Q&A===============================
export const GET_ALL_QUESTIONS = "/admin/community/questions";
export const DELETE_QUESTION = "/admin/community/questions/:id";
export const DELETE_ANSWER = "/admin/community/answers/:id";
export const GET_ALL_REVIEWS = "/admin/community/reviews";
export const GET_ALL_ANSWERS = "/admin/community/questions/:id/answers";
export const ADD_ANSWER = "/admin/community/questions/:id/answers";
export const UPDATE_REVIEW_STATUS = "/admin/community/reviews/:id/status";
//============================Q&A===============================
//dontRemoveMeUrl


export const getEndPoint = (endPointName) => {
    const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

    return API_URL+endPointName;
}
