import { lazy } from 'react';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));

const LoginPage = lazy(() => import('../pages/LoginPage'));

const DashboardPage = lazy(() => import('../pages/DashboardPage'));

const SettingsPage = lazy(() => import('../pages/SettingsPage'));

const TaskListPage = lazy(() => import('../pages/TaskListPage'));

const HomePage = lazy(() => import('../pages/HomePage'));

const baseUrl = 'http://localhost:5173';

const routes = [
  {
    path: '/register',
    component: RegisterPage,
    importFunc: () => import('../pages/RegisterPage'),
    title: 'Регистрация',
    description: 'Регистрация',
    url: `${baseUrl}/register`,
  },
  {
    path: '/login',
    component: LoginPage,
    importFunc: () => import('../pages/LoginPage'),
    title: 'Вход',
    description: 'Регистрация',
    url: `${baseUrl}/login`,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    importFunc: () => import('../pages/DashboardPage'),
    title: 'Мои задачи',
    description: 'Регистрация',
    url: `${baseUrl}/dashboard`,
  },
  {
    path: '/settings',
    component: SettingsPage,
    importFunc: () => import('../pages/SettingsPage'),
    title: 'Настройки',
    description: 'Регистрация',
    url: `${baseUrl}/settings`,
  },
  {
    path: '/task',
    component: TaskListPage,
    importFunc: () => import('../pages/TaskListPage'),
    title: 'Список',
    description: 'Регистрация',
    url: `${baseUrl}/task`,
  },
  {
    path: '/',
    component: HomePage,
    importFunc: () => import('../pages/HomePage'),
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseUrl}/`,
  },
];

export default routes;
