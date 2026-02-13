import React from 'react';
import { Navigate } from 'react-router-dom';
import { ShamcarRoutes } from './routeEnum';
import Login from '@@/pages/Authentication/Login';
import Logout from '@@/pages/Authentication/Logout';
import ErrorPage from '@@/pages/Authentication/Error';
import DashboardPage from '@@/pages/Dashboard';
import UsersPage from '@@/pages/users';
import AdminsPage from '@@/pages/Admins';
import CarMakesPage from '@@/pages/CarMakes';
import CarModelPage from '@@/pages/CarModels';
import QuestionsPage from '@@/pages/Community/questionsPage';
import ReviewsPage from '@@/pages/Community/reviewsPage';
import CarTrimsPage from '@@/pages/CarTrims';
import AddOrUpdatePage from '@@/pages/CarTrims/helperComponents/AddOrUpdatePage';
import StatisticsPage from '@@/pages/Statistics';
import SettingsPage from '@@/pages/Settings';
import ChangePasswordPage from '@@/pages/ChangePassword';


const authProtectedRoutes = [

  { path: ShamcarRoutes.Dashboard, component: <DashboardPage /> },
  { path: ShamcarRoutes.USERS, component: <UsersPage /> },
  { path: ShamcarRoutes.ADMINS, component: <AdminsPage /> },
  { path: ShamcarRoutes.CAR_MAKES, component: <CarMakesPage /> },
  { path: ShamcarRoutes.CAR_MODELS, component: <CarModelPage /> },
  { path: ShamcarRoutes.REVIEWS, component: <ReviewsPage /> },
  { path: ShamcarRoutes.QUESTIONS, component: <QuestionsPage /> },
  { path: ShamcarRoutes.CAR_TRIMS, component: <CarTrimsPage /> },
  { path: ShamcarRoutes.ADD_CAR_TRIM, component: <AddOrUpdatePage /> },
  { path: ShamcarRoutes.UPDATE_CAR_TRIM, component: <AddOrUpdatePage /> },
  { path: ShamcarRoutes.STATISTICS, component: <StatisticsPage /> },
  { path: ShamcarRoutes.SETTINGS, component: <SettingsPage /> },
  { path: ShamcarRoutes.CHANGE_PASSWORD, component: <ChangePasswordPage /> },
  {
    path: '/*',
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: ShamcarRoutes.Logut, component: <Logout /> },
];

const publicRoutes = [
  { path: ShamcarRoutes.Login, component: <Login /> },
  { path: ShamcarRoutes.ERROR, component: <ErrorPage /> },

  // { path: "/forgot-password", component: <ForgetPwd /> },
  // { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
