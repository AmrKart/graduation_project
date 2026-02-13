//============================Moi===============================

export const LOGIN = "/admin/login"
// export const PROFILE = "/auth/profile"
export const REFRESH_TOKEN = "/auth/refresh-token"
export const LOGOUT = "/admin/logout"
export const CHANGEPASSWORD = "/admin/change-password"

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

//============================Car-Trims===============================
export const GET_CAR_TRIMS = "/admin/car-trims";
export const GET_CAR_TRIM_DETAILS = "/admin/car-trims/:id";
export const ADD_CAR_TRIM = "/admin/car-trims";
export const UPDATE_CAR_TRIM = "/admin/car-trims/:id";
export const DELETE_CAR_TRIM = "/admin/car-trims/:id";
export const UPDATE_CAR_TRIM_PUBLISHED = "/admin/car-trims/:id/toggle-published";
//============================Car-Trims===============================

//============================Support===============================
export const GET_CAR_TYPES = "/admin/support/types";
export const GET_CAR_SPECIFICATIONS = "/admin/support/specifications";
//============================Support===============================
//============================Dashboard Statistics===============================
export const GET_DASHBOARD_STATISTICS = "/admin/stats";
export const GET_USER_STATISTICS = "/admin/stats/users";
export const GET_CAR_STATISTICS = "/admin/stats/cars";
export const GET_COMMUNITY_STATISTICS = "/admin/stats/community";
export const GET_ENGAGEMENT_STATISTICS = "/admin/stats/engagement";
export const GET_ACTIVITY_CHARTS_STATISTICS = "/admin/stats/charts";
//============================Dashboard Statistics===============================

//============================Settings===============================
export const GET_ALL_SETTINGS = '/admin/settings';
export const UPDATE_SETTING = '/admin/settings';
//============================Setiings===============================


//dontRemoveMeUrl


export const getEndPoint = (endPointName) => {
    const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

    return API_URL+endPointName;
}
