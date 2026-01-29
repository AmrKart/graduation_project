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


const authProtectedRoutes = [

  { path: ShamcarRoutes.Dashboard, component: <DashboardPage /> },
  { path: ShamcarRoutes.USERS, component: <UsersPage /> },
  { path: ShamcarRoutes.ADMINS, component: <AdminsPage /> },
  { path: ShamcarRoutes.CAR_MAKES, component: <CarMakesPage /> },
  { path: ShamcarRoutes.CAR_MODELS, component: <CarModelPage /> },

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
