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

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://taskflow-blyt.onrender.com'
    : 'http://localhost:5173';

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
    private: false,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    title: 'Мои задачи',
    description: 'Регистрация',
    url: `${baseUrl}/dashboard`,
    private: true,
  },
  {
    path: '/settings',
    component: SettingsPage,
    title: 'Настройки',
    description: 'Регистрация',
    url: `${baseUrl}/settings`,
    private: true,
  },
  {
    path: '/task',
    component: TaskListPage,
    title: 'Список',
    description: 'Регистрация',
    url: `${baseUrl}/task`,
    private: true,
  },
  {
    path: '/',
    component: HomePage,
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseUrl}/`,
    private: false,
  },
  {
    path: '/terms',
    component: TermsPage,
    title: 'Условия пользования',
    description: 'Регистрация',
    url: `${baseUrl}/terms`,
    private: false,
  },
  {
    path: '/privacy',
    component: PrivacyPage,
    title: 'Политика конфиденциальности',
    description: 'Регистрация',
    url: `${baseUrl}/privacy`,
    private: false,
  },
  {
    path: '*',
    component: Error404,
    title: 'Ошибка - 404',
    description: 'Ошибка 404',
    url: `${baseUrl}/*`,
    private: false,
  },
];

export default routes;
