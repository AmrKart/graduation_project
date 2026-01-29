import { actionType } from "./actionTypes"

interface initSatte {
  loading: boolean;
  user?: any;
  error?: string;
  isStarted: boolean;
  actionLoading: boolean;
  resetStep: number;
  registerStep: number;
  changePasswordStep: number;
  changeEmailStep: number;
}
const INIT_STATE: initSatte = {
  loading: false,
  user: undefined,
  resetStep: 0,
  error: "",
  changePasswordStep: 0,
  changeEmailStep: 0,
  registerStep: 0,
  isStarted: false,
  actionLoading: false,
}

const AuthenticationReducer = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {
    case "LOGIN":
      return (state = { ...INIT_STATE, loading: true })
    case "LOGIN_SUCCESS":
      return (state = {
        ...state,
        loading: false,
        user: { ...state.user, ...action.payload },
        isStarted: true,
      })
    case "LOGIN_FAILED":
      return (state = {
        ...state,
        loading: false,
        user: undefined,
        error: action.payload,
      })
    case "LOGOUT":
      return (state = { ...INIT_STATE })
    //================================================================

    case "REFRESH_TOKEN":
      return (state = { ...state, loading: true })
    //================================================================


    //dontRemoveMe

    default:
      return state
  }
}

export default AuthenticationReducer
