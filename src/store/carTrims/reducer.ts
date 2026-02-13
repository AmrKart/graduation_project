import { ICarTrim } from "@@/interfaces/carTrim";
import { actionsName, actionType } from "./actionTypes";
import { JObject } from "@@/common/types/json";


interface initSatte {    
  carTrims: {
    loading: boolean,
    data?: Array<ICarTrim>,
  },
  singleCarTrim: {
    loading: boolean,
    data?: ICarTrim,
  },
  carSpecifications: {
    loading: boolean,
    data?: Array<JObject>,
  },
  actionLoader: boolean,
  actionSuccess: boolean,
}
const INIT_STATE: initSatte = {
    carTrims: {
    loading: false,
    data: [],
  },
  singleCarTrim: {
    loading: false,
    data: undefined,
  },
  carSpecifications: {
    loading: false,
    data: [],
  },
  actionLoader: false,
  actionSuccess: false,
}

const CarTrimsReducer = (state = INIT_STATE, action: actionType) => {
    switch (action.type) {
        case actionsName.GET_CAR_TRIMS:
            return (state = { ...state, carTrims: { ...state.carTrims, loading: true, ...action.payload.data, } })
        case actionsName.GET_CAR_TRIMS_SUCCESS:
            return (state = { ...state, carTrims: { ...state.carTrims, loading: false, data: action.payload } })
        case actionsName.GET_CAR_TRIMS_FAILED:
            return (state = { ...state, carTrims: { ...state.carTrims, loading: false, } })
        case actionsName.GET_CAR_TRIMS_CLEANUP:
            return (state = { ...state, carTrims: { ...INIT_STATE.carTrims } })
        //================================================================

        case actionsName.GET_CAR_TRIM_DETAILS:
            return (state = { ...state, singleCarTrim: { ...state.singleCarTrim, loading: true } })
        case actionsName.GET_CAR_TRIM_DETAILS_SUCCESS:
            return (state = { ...state, singleCarTrim: { ...state.singleCarTrim, loading: false, data: action.payload } })
        case actionsName.GET_CAR_TRIM_DETAILS_FAILED:
            return (state = { ...state, singleCarTrim: { ...state.singleCarTrim, loading: false } })
        case actionsName.GET_CAR_TRIM_DETAILS_CLEANUP:
            return (state = { ...state, singleCarTrim: { ...INIT_STATE.singleCarTrim } })
        //================================================================

        case actionsName.ADD_CAR_TRIM:
            return (state = { ...state, actionLoader: true })
        case actionsName.ADD_CAR_TRIM_SUCCESS:
            return (state = { ...state, actionLoader: false, })
        case actionsName.ADD_CAR_TRIM_FAILED:
            return (state = { ...state, actionLoader: false })
        //================================================================
        case actionsName.UPDATE_CAR_TRIM:
            return (state = { ...state, actionLoader: true })
        case actionsName.UPDATE_CAR_TRIM_SUCCESS:
            return (state = { ...state, actionLoader: false })
        case actionsName.UPDATE_CAR_TRIM_FAILED:
            return (state = { ...state, actionLoader: false })
        //================================================================
        case actionsName.DELETE_CAR_TRIM:
            return (state = { ...state, actionLoader: true })
        case actionsName.DELETE_CAR_TRIM_SUCCESS:
            return (state = { ...state, actionLoader: false })
        case actionsName.DELETE_CAR_TRIM_FAILED:
            return (state = { ...state, actionLoader: false })
        //================================================================
        case actionsName.UPDATE_CAR_TRIM_PUBLISHED:
            return (state = { ...state, actionLoader: true })
        case actionsName.UPDATE_CAR_TRIM_PUBLISHED_SUCCESS:
            return (state = { ...state, actionLoader: false })
        case actionsName.UPDATE_CAR_TRIM_PUBLISHED_FAILED:
            return (state = { ...state, actionLoader: false })
        //================================================================
        case actionsName.GET_CAR_SPECIFICATIONS:
            return (state = { ...state, carSpecifications: { ...state.carSpecifications, loading: true } })
        case actionsName.GET_CAR_SPECIFICATIONS_SUCCESS:
            return (state = { ...state, carSpecifications: { ...state.carSpecifications, loading: false, data: action.payload } })
        case actionsName.GET_CAR_SPECIFICATIONS_FAILED:
            return (state = { ...state, carSpecifications: { ...state.carSpecifications, loading: false } })
        //================================================================
        default:
            return state;
    }
}
export default CarTrimsReducer;