import { actionType, actionsName } from "./actionTypes"
import { ICarModel } from "@@/interfaces/carModel"

interface initSatte {    
  carModels: {
    loading: boolean,
    data?: Array<ICarModel>,
  },
  singleCarModel: {
    loading: boolean,
    data?: ICarModel,
  },
  actionLoader: boolean,
  actionSuccess: boolean,

}
const INIT_STATE: initSatte = {
    carModels: {
    loading: false,
    data: [],
  },
  singleCarModel: {
    loading: false,
    data: undefined,
  },
  actionLoader: false,
  actionSuccess: false,
}

const CarModelsReducer = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {    
    
    case actionsName.GET_CAR_MODELS:
      return (state = { ...state, carModels: { ...state.carModels, loading: true, ...action.payload.data, } })
    case actionsName.GET_CAR_MODELS_SUCCESS:
      return (state = { ...state, carModels: { ...state.carModels, loading: false, data: action.payload } })
    case actionsName.GET_CAR_MODELS_FAILED:
      return (state = { ...state, carModels: { ...state.carModels, loading: false, } })
    case actionsName.GET_CAR_MODELS_CLEANUP:
      return (state = { ...state, carModels: { ...INIT_STATE.carModels } })
    //================================================================

    case actionsName.ADD_CAR_MODEL:
      return (state = { ...state, actionLoader: true, actionSuccess: false})
    case actionsName.ADD_CAR_MODEL_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.ADD_CAR_MODEL_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false })
    //================================================================

    case actionsName.GET_CAR_MODEL_DETAILS:
      return (state = { ...state, singleCarModel: { ...state.singleCarModel, loading: true } })
    case actionsName.GET_CAR_MODEL_DETAILS_SUCCESS:
      return (state = { ...state, singleCarModel: { ...state.singleCarModel, loading: false, data: action.payload } })
    case actionsName.GET_CAR_MODEL_DETAILS_FAILED:
      return (state = { ...state, singleCarModel: { ...state.singleCarModel, loading: false } })    
    //================================================================

    case actionsName.UPDATE_CAR_MODEL:
      return (state = { ...state, actionLoader: true, actionSuccess: false })
    case actionsName.UPDATE_CAR_MODEL_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.UPDATE_CAR_MODEL_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false})

    //================================================================

    case actionsName.DELETE_CAR_MODEL:
      return (state = { ...state, actionLoader: true, actionSuccess: false })
    case actionsName.DELETE_CAR_MODEL_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.DELETE_CAR_MODEL_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false, })

    //================================================================    
    //dontRemoveMe

    default:
      return state
  }
}

export default CarModelsReducer
