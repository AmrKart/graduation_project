import { all, fork } from "redux-saga/effects"


import authenticationSaga from "./authentication/saga"
import layoutSaga from "./layout/saga"
import usersSaga from "./users/saga"
import carMakesSaga from "./carMakes/saga"
import carModelsSaga from "./carModels/saga"

//dontRemoveMeSagaImport

export default function* rootSaga() {
  yield all([
    fork(authenticationSaga),
    fork(layoutSaga),
    fork(usersSaga),
    fork(carMakesSaga),
    fork(carModelsSaga),
  ])
}
