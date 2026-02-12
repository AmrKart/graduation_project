import { actionsName, actionType } from "./actionTypes"

// Dashboard (all) statistics
export const getDashboardStatistics = (): actionType => ({
  type: actionsName.GET_DASHBOARD_STATISTICS,
  payload: {},
})

export const getDashboardStatisticsSuccess = (data: any): actionType => ({
  type: actionsName.GET_DASHBOARD_STATISTICS_SUCCESS,
  payload: data,
})

export const getDashboardStatisticsFailed = (error: any): actionType => ({
  type: actionsName.GET_DASHBOARD_STATISTICS_FAILED,
  payload: error,
})

export const getDashboardStatisticsCleanup = (): actionType => ({
  type: actionsName.GET_DASHBOARD_STATISTICS_CLEANUP,
  payload: {},
})

// User statistics
export const getUserStatistics = (): actionType => ({
  type: actionsName.GET_USER_STATISTICS,
  payload: {},
})

export const getUserStatisticsSuccess = (data: any): actionType => ({
  type: actionsName.GET_USER_STATISTICS_SUCCESS,
  payload: data,
})

export const getUserStatisticsFailed = (error: any): actionType => ({
  type: actionsName.GET_USER_STATISTICS_FAILED,
  payload: error,
})

export const getUserStatisticsCleanup = (): actionType => ({
  type: actionsName.GET_USER_STATISTICS_CLEANUP,
  payload: {},
})

// Car statistics
export const getCarStatistics = (): actionType => ({
  type: actionsName.GET_CAR_STATISTICS,
  payload: {},
})

export const getCarStatisticsSuccess = (data: any): actionType => ({
  type: actionsName.GET_CAR_STATISTICS_SUCCESS,
  payload: data,
})

export const getCarStatisticsFailed = (error: any): actionType => ({
  type: actionsName.GET_CAR_STATISTICS_FAILED,
  payload: error,
})

export const getCarStatisticsCleanup = (): actionType => ({
  type: actionsName.GET_CAR_STATISTICS_CLEANUP,
  payload: {},
})

// Community statistics
export const getCommunityStatistics = (): actionType => ({
  type: actionsName.GET_COMMUNITY_STATISTICS,
  payload: {},
})

export const getCommunityStatisticsSuccess = (data: any): actionType => ({
  type: actionsName.GET_COMMUNITY_STATISTICS_SUCCESS,
  payload: data,
})

export const getCommunityStatisticsFailed = (error: any): actionType => ({
  type: actionsName.GET_COMMUNITY_STATISTICS_FAILED,
  payload: error,
})

export const getCommunityStatisticsCleanup = (): actionType => ({
  type: actionsName.GET_COMMUNITY_STATISTICS_CLEANUP,
  payload: {},
})

// Engagement statistics
export const getEngagementStatistics = (): actionType => ({
  type: actionsName.GET_ENGAGEMENT_STATISTICS,
  payload: {},
})

export const getEngagementStatisticsSuccess = (data: any): actionType => ({
  type: actionsName.GET_ENGAGEMENT_STATISTICS_SUCCESS,
  payload: data,
})

export const getEngagementStatisticsFailed = (error: any): actionType => ({
  type: actionsName.GET_ENGAGEMENT_STATISTICS_FAILED,
  payload: error,
})

export const getEngagementStatisticsCleanup = (): actionType => ({
  type: actionsName.GET_ENGAGEMENT_STATISTICS_CLEANUP,
  payload: {},
})

// Activity charts statistics
export const getActivityChartsStatistics = (): actionType => ({
  type: actionsName.GET_ACTIVITY_CHARTS_STATISTICS,
  payload: {},
})

export const getActivityChartsStatisticsSuccess = (data: any): actionType => ({
  type: actionsName.GET_ACTIVITY_CHARTS_STATISTICS_SUCCESS,
  payload: data,
})

export const getActivityChartsStatisticsFailed = (error: any): actionType => ({
  type: actionsName.GET_ACTIVITY_CHARTS_STATISTICS_FAILED,
  payload: error,
})

export const getActivityChartsStatisticsCleanup = (): actionType => ({
  type: actionsName.GET_ACTIVITY_CHARTS_STATISTICS_CLEANUP,
  payload: {},
})

