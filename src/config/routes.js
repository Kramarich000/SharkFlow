import { lazy } from 'react';

const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));

const LoginPage = lazy(() => import('@pages/auth/LoginPage'));

const DashboardPage = lazy(() => import('@pages/dashboard/DashboardPage'));

const ProfilePage = lazy(() => import('@pages/profile/ProfilePage'));

const HomePage = lazy(() => import('@pages/home/HomePage'));

const TermsPage = lazy(() => import('@pages/policy/TermsPage'));

const PrivacyPage = lazy(() => import('@pages/policy/PrivacyPage'));

const Error404 = lazy(() => import('@pages/errors/Error404'));

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
    path: '/github/callback',
    component: PrivacyPage,
    title: 'GithubAuth',
    description: 'GithubAuth',
    url: `${baseURL}/github/callback`,
    private: true,
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
