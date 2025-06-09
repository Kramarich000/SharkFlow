import { lazy } from 'react';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));

const LoginPage = lazy(() => import('../pages/LoginPage'));

const DashboardPage = lazy(() => import('../pages/DashboardPage'));

const SettingsPage = lazy(() => import('../pages/SettingsPage'));

const TaskListPage = lazy(() => import('../pages/TaskListPage'));

const HomePage = lazy(() => import('../pages/HomePage'));

const TermsPage = lazy(() => import('../pages/TermsPage'));

const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));

const Error404 = lazy(() => import('../pages/errors/Error404'));

const baseUrl = 'http://localhost:5173';

const routes = [
  {
    path: '/register',
    component: RegisterPage,
    title: 'Регистрация',
    description: 'Регистрация',
    url: `${baseUrl}/register`,
  },
  {
    path: '/login',
    component: LoginPage,
    title: 'Вход',
    description: 'Регистрация',
    url: `${baseUrl}/login`,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    title: 'Мои задачи',
    description: 'Регистрация',
    url: `${baseUrl}/dashboard`,
  },
  {
    path: '/settings',
    component: SettingsPage,
    title: 'Настройки',
    description: 'Регистрация',
    url: `${baseUrl}/settings`,
  },
  {
    path: '/task',
    component: TaskListPage,
    title: 'Список',
    description: 'Регистрация',
    url: `${baseUrl}/task`,
  },
  {
    path: '/',
    component: HomePage,
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseUrl}/`,
  },
  {
    path: '/terms',
    component: TermsPage,
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseUrl}/terms`,
  },
  {
    path: '/privacy',
    component: PrivacyPage,
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseUrl}/privacy`,
  },
  {
    path: '*',
    component: Error404,
    title: 'Ошибка - 404',
    descriptionKey: 'Ошибка 404',
    url: `${baseUrl}/*`,
  },
];

export default routes;
