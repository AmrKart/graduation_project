import { IUser } from "@@/interfaces/user"
import { actionType, actionsName } from "./actionTypes"

interface initSatte {    
  users: {
    loading: boolean,
    data?: Array<IUser>,
  },
  singleUser: {
    loading: boolean,
    data?: IUser,
  },
  actionLoader: boolean,
  actionSuccess: boolean,

}
const INIT_STATE: initSatte = {
  users: {
    loading: false,
    data: [],
  },
  singleUser: {
    loading: false,
    data: undefined,
  },
  actionLoader: false,
  actionSuccess: false,
}

const UsersReducer = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {    
    
    case actionsName.GET_USERS:
      return (state = { ...state, users: { ...state.users, loading: true, ...action.payload.data, } })
    case actionsName.GET_USERS_SUCCESS:
      return (state = { ...state, users: { ...state.users, loading: false, data: action.payload } })
    case actionsName.GET_USERS_FAILED:
      return (state = { ...state, users: { ...state.users, loading: false, } })
    case actionsName.GET_USERS_CLEANUP:
      return (state = { ...state, users: { ...INIT_STATE.users } })
    //================================================================

    case actionsName.CREATE_USER:
      return (state = { ...state, actionLoader: true, actionSuccess: false})
    case actionsName.CREATE_USER_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.CREATE_USER_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false })
    case actionsName.CHANGE_USER_SUCCESS:
      return (state = { ...state, actionSuccess: !state.actionSuccess })

    //================================================================

    case actionsName.GET_SINGLE_USER:
      return (state = { ...state, singleUser: { ...state.singleUser, loading: true } })
    case actionsName.GET_SINGLE_USER_SUCCESS:
      return (state = { ...state, singleUser: { ...state.singleUser, loading: false, data: action.payload } })
    case actionsName.GET_SINGLE_USER_FAILED:
      return (state = { ...state, singleUser: { ...state.singleUser, loading: false } })
    case actionsName.GET_SINGLE_USER_CLEANUP:
      return (state = { ...state, singleUser: { ...INIT_STATE.singleUser } })
    //================================================================

    case actionsName.UPDATE_USER:
      return (state = { ...state, actionLoader: true, actionSuccess: false })
    case actionsName.UPDATE_USER_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.UPDATE_USER_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false})

    //================================================================

    case actionsName.DELETE_USER:
      return (state = { ...state, actionLoader: true, actionSuccess: false })
    case actionsName.DELETE_USER_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.DELETE_USER_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false, })

    //================================================================
    case actionsName.ACTIVATE_USER:
      return (state = { ...state, actionLoader: true, actionSuccess: false, })
    case actionsName.ACTIVATE_USER_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true})
    case actionsName.ACTIVATE_USER_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false, })

    //================================================================
    case actionsName.DEACTIVATE_USER:
      return (state = { ...state, actionLoader: true, actionSuccess: false,})
    case actionsName.DEACTIVATE_USER_SUCCESS:
      return (state = { ...state, actionLoader: false, actionSuccess: true })
    case actionsName.DEACTIVATE_USER_FAILED:
      return (state = { ...state, actionLoader: false, actionSuccess: false, })

    //================================================================

    //dontRemoveMe

    default:
      return state
  }
}

export default UsersReducer
