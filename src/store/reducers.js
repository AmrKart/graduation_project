import { combineReducers } from "redux"

// Front
import Authentication from "./authentication/reducer"
import Layout from "./layout/reducer"
import Users from "./users/reducer"
import CarModels from "./carModels/reducer"
import CarMakes from "./carMakes/reducer"

const rootReducer = combineReducers({
  // public

  Authentication,
  Layout,
  Users,
  CarModels,
  CarMakes,
  
  //dontRemoveMeReduxObject
})

export default rootReducer
