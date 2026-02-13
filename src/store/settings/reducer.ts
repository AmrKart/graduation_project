import { IAnswer, IQuestion, IReview } from "@@/interfaces/Q&A";
import { actionsName, actionType } from "./actionTypes";
import { ISettings } from "@@/interfaces/setting";


interface initState {
    settings:{
       loading : boolean,
       data?: Array<ISettings> 
    }
    actionLoader: boolean;
    actionSuccess: boolean;
}
const INIT_STATE: initState = {
    settings: {
        loading: false,
        data: [],
    },
    actionLoader: false,
    actionSuccess: false,
}

const SettingsReducer = (state = INIT_STATE, action: actionType) => {
    switch (action.type) {
        case actionsName.GET_SETTINGS:
            return (state = {
                ...state,
                settings: {
                    ...state.settings,
                    loading: true,
                    ...action.payload.data,

                },
            })
        case actionsName.GET_SETTINGS_SUCCESS:
            return (state = {
                ...state,
                settings: {
                    loading: false,
                    data: action.payload,
                },
            })
        case actionsName.GET_SETTINGS_FAILED:
            return (state = {
                ...state,
                settings: {
                    ...state.settings,
                    loading: false,
                },
            })
        case actionsName.GET_SETTINGS_CLEANUP:
            return (state = {
                ...state,
                settings: {
                    ...INIT_STATE.settings,
                },
            })
        case actionsName.UPDATE_SETTINGS:
            return (state = {
                ...state,
                actionLoader: true,
            })
        case actionsName.UPDATE_SETTINGS_SUCCESS:
            return (state = {
                ...state,
                actionLoader: false,
            })
        case actionsName.UPDATE_SETTINGS_FAILED:
            return (state = {
                ...state,
                actionLoader: false,
            })
        default:
            return state;
    }
}
export default SettingsReducer;