import { combineReducers } from "redux"

// Front
import Authentication from "./authentication/reducer"
import Layout from "./layout/reducer"
import Users from "./users/reducer"
import CarModels from "./carModels/reducer"
import CarMakes from "./carMakes/reducer"
import QAReducer from "./Q&A/reducer"
import CarTrims from "./carTrims/reducer"
import Statisticses from "./Statisticses/reducer"

const rootReducer = combineReducers({
  // public

  Authentication,
  Layout,
  Users,
  CarModels,
  CarMakes,
  QAReducer,
  CarTrims,
  Statisticses,
  //dontRemoveMeReduxObject
})

export default rootReducer
