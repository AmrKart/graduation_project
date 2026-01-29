import { put } from "redux-saga/effects"
import { buildShamcarRequest } from "./buildRequest"
import { JObject } from "@@/common/types/json"

export function*  executeActions (methods : Array<any> , data?:JObject){
    for (const nextAction of methods ?? []) {
        if (!nextAction.isDispatch) yield nextAction.action( nextAction?.fromResponse ? data : nextAction.data
          )
        else if (nextAction.shamcarRequest) {
          yield put(nextAction.action(buildShamcarRequest(nextAction?.fromResponse ? data : nextAction.data)))
        } else {
          yield put(nextAction.action(nextAction?.fromResponse ? data : nextAction.data))
  
        }
      }
}