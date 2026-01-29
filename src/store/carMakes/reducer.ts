import { ICarMake } from "@@/interfaces/carMake"
import { actionType, actionsName } from "./actionTypes"

interface initSatte {    
  carMakes: {
    loading: boolean,
    data?: Array<ICarMake>,
  },
  singleCarMake: {
    loading: boolean,
    data?: ICarMake,
  },
  actionLoader: boolean,
  actionSuccess: boolean,

}
const INIT_STATE: initSatte = {
    carMakes: {
    loading: false,
    data: [],
  },
  singleCarMake: {
    loading: false,
    data: undefined,
  },
  actionLoader: false,
  actionSuccess: false,
}

const CarMakesReducer = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {    
    
    case actionsName.GET_CAR_MAKES:
      return (state = { ...state, carMakes: { ...state.carMakes, loading: true, ...action.payload.data, } })
    case actionsName.GET_CAR_MAKES_SUCCESS:
      return (state = { ...state, carMakes: { ...state.carMakes, loading: false, data: action.payload } })
    case actionsName.GET_CAR_MAKES_FAILED:
      return (state = { ...state, carMakes: { ...state.carMakes, loading: false, } })
    case actionsName.GET_CAR_MAKES_CLEANUP:
      return (state = { ...state, carMakes: { ...INIT_STATE.carMakes } })
    //================================================================

    case actionsName.ADD_CAR_MAKE:
      return (state = { ...state, actionLoader: true, actionSuccess: false})
    case actionsName.ADD_CAR_MAKE_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.ADD_CAR_MAKE_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false })
    //================================================================

    case actionsName.GET_CAR_MAKE_DETAILS:
      return (state = { ...state, singleCarMake: { ...state.singleCarMake, loading: true } })
    case actionsName.GET_CAR_MAKE_DETAILS_SUCCESS:
      return (state = { ...state, singleCarMake: { ...state.singleCarMake, loading: false, data: action.payload } })
    case actionsName.GET_CAR_MAKE_DETAILS_FAILED:
      return (state = { ...state, singleCarMake: { ...state.singleCarMake, loading: false } })    
    //================================================================

    case actionsName.UPDATE_CAR_MAKE:
      return (state = { ...state, actionLoader: true, actionSuccess: false })
    case actionsName.UPDATE_CAR_MAKE_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.UPDATE_CAR_MAKE_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false})

    //================================================================

    case actionsName.DELETE_CAR_MAKE:
      return (state = { ...state, actionLoader: true, actionSuccess: false })
    case actionsName.DELETE_CAR_MAKE_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.DELETE_CAR_MAKE_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false, })

    //================================================================    
    //dontRemoveMe

    default:
      return state
  }
}

export default CarMakesReducer
