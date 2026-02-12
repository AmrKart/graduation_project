import { actionType, actionsName } from "./actionTypes"

interface StatisticsSlice<T> {
  loading: boolean
  data?: T
}

interface InitState {
  dashboard: StatisticsSlice<any>
  users: StatisticsSlice<any>
  cars: StatisticsSlice<any>
  community: StatisticsSlice<any>
  engagement: StatisticsSlice<any>
  activityCharts: StatisticsSlice<any>
}

const INIT_STATE: InitState = {
  dashboard: {
    loading: false,
    data: undefined,
  },
  users: {
    loading: false,
    data: undefined,
  },
  cars: {
    loading: false,
    data: undefined,
  },
  community: {
    loading: false,
    data: undefined,
  },
  engagement: {
    loading: false,
    data: undefined,
  },
  activityCharts: {
    loading: false,
    data: undefined,
  },
}

const StatisticsesReducer = (state = INIT_STATE, action: actionType): InitState => {
  switch (action.type) {
    case actionsName.GET_DASHBOARD_STATISTICS:
      return { ...state, dashboard: { ...state.dashboard, loading: true } }
    case actionsName.GET_DASHBOARD_STATISTICS_SUCCESS:
      return { ...state, dashboard: { loading: false, data: action.payload } }
    case actionsName.GET_DASHBOARD_STATISTICS_FAILED:
      return { ...state, dashboard: { ...state.dashboard, loading: false } }
    case actionsName.GET_DASHBOARD_STATISTICS_CLEANUP:
      return { ...state, dashboard: { ...INIT_STATE.dashboard } }

    case actionsName.GET_USER_STATISTICS:
      return { ...state, users: { ...state.users, loading: true } }
    case actionsName.GET_USER_STATISTICS_SUCCESS:
      return { ...state, users: { loading: false, data: action.payload } }
    case actionsName.GET_USER_STATISTICS_FAILED:
      return { ...state, users: { ...state.users, loading: false } }
    case actionsName.GET_USER_STATISTICS_CLEANUP:
      return { ...state, users: { ...INIT_STATE.users } }

    case actionsName.GET_CAR_STATISTICS:
      return { ...state, cars: { ...state.cars, loading: true } }
    case actionsName.GET_CAR_STATISTICS_SUCCESS:
      return { ...state, cars: { loading: false, data: action.payload } }
    case actionsName.GET_CAR_STATISTICS_FAILED:
      return { ...state, cars: { ...state.cars, loading: false } }
    case actionsName.GET_CAR_STATISTICS_CLEANUP:
      return { ...state, cars: { ...INIT_STATE.cars } }

    case actionsName.GET_COMMUNITY_STATISTICS:
      return { ...state, community: { ...state.community, loading: true } }
    case actionsName.GET_COMMUNITY_STATISTICS_SUCCESS:
      return { ...state, community: { loading: false, data: action.payload } }
    case actionsName.GET_COMMUNITY_STATISTICS_FAILED:
      return { ...state, community: { ...state.community, loading: false } }
    case actionsName.GET_COMMUNITY_STATISTICS_CLEANUP:
      return { ...state, community: { ...INIT_STATE.community } }

    case actionsName.GET_ENGAGEMENT_STATISTICS:
      return { ...state, engagement: { ...state.engagement, loading: true } }
    case actionsName.GET_ENGAGEMENT_STATISTICS_SUCCESS:
      return { ...state, engagement: { loading: false, data: action.payload } }
    case actionsName.GET_ENGAGEMENT_STATISTICS_FAILED:
      return { ...state, engagement: { ...state.engagement, loading: false } }
    case actionsName.GET_ENGAGEMENT_STATISTICS_CLEANUP:
      return { ...state, engagement: { ...INIT_STATE.engagement } }

    case actionsName.GET_ACTIVITY_CHARTS_STATISTICS:
      return { ...state, activityCharts: { ...state.activityCharts, loading: true } }
    case actionsName.GET_ACTIVITY_CHARTS_STATISTICS_SUCCESS:
      return { ...state, activityCharts: { loading: false, data: action.payload } }
    case actionsName.GET_ACTIVITY_CHARTS_STATISTICS_FAILED:
      return { ...state, activityCharts: { ...state.activityCharts, loading: false } }
    case actionsName.GET_ACTIVITY_CHARTS_STATISTICS_CLEANUP:
      return { ...state, activityCharts: { ...INIT_STATE.activityCharts } }

    //dontRemoveMe

    default:
      return state
  }
}

export default StatisticsesReducer

