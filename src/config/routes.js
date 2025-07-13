import { lazy } from 'react';

const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));

const LoginPage = lazy(() => import('@pages/auth/LoginPage'));

const DashboardPage = lazy(() => import('@pages/dashboard/DashboardPage'));

const ProfilePage = lazy(() => import('@pages/profile/ProfilePage'));

const HomePage = lazy(() => import('@pages/home/HomePage'));

const TermsPage = lazy(() => import('@pages/policy/TermsPage'));

const PrivacyPage = lazy(() => import('@pages/policy/PrivacyPage'));

const Error404 = lazy(() => import('@pages/errors/Error404'));

const GitHubOAuthProvider = lazy(
  () => import('@features/auth/api/github/GitHubOAuthProvider'),
);

const YandexOAuthProvider = lazy(
  () => import('@features/auth/api/yandex/yandexOAuthProvider'),
);

import { baseURL } from '@lib/http';

export const routes = [
  {
    path: '/register',
    component: RegisterPage,
    title: 'Регистрация',
    description: 'Регистрация',
    url: `${baseURL}/register`,
  },
  {
    path: '/login',
    component: LoginPage,
    title: 'Вход',
    description: 'Регистрация',
    url: `${baseURL}/login`,
    private: false,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    title: 'Мои доски',
    description: 'Регистрация',
    url: `${baseURL}/dashboard`,
    private: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    title: 'Профиль',
    description: 'Профиль',
    url: `${baseURL}/profile`,
    private: true,
  },
  {
    path: '/',
    component: HomePage,
    title: 'Главная',
    description: 'Регистрация',
    url: `${baseURL}/`,
    private: false,
  },
  {
    path: '/terms',
    component: TermsPage,
    title: 'Условия пользования',
    description: 'Регистрация',
    url: `${baseURL}/terms`,
    private: false,
  },
  {
    path: '/privacy',
    component: PrivacyPage,
    title: 'Политика конфиденциальности',
    description: 'Регистрация',
    url: `${baseURL}/privacy`,
    private: false,
  },
  {
    path: '/oauth/github/callback',
    component: GitHubOAuthProvider,
    title: 'Авторизация через GitHub',
    description: 'GitHub OAuth обработчик',
    url: `${baseURL}/oauth/github/callback`,
    private: false,
  },
  {
    path: '/oauth/yandex/callback',
    component: YandexOAuthProvider,
    title: 'Авторизация через Yandex',
    description: 'Yandex OAuth обработчик',
    url: `${baseURL}/oauth/yandex/callback`,
    private: false,
  },
  {
    path: '*',
    component: Error404,
    title: 'Ошибка - 404',
    description: 'Ошибка 404',
    url: `${baseURL}/*`,
    private: false,
  },
];
