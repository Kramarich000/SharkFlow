export const navLinks = (token) =>
  token
    ? [
        { path: '/', label: 'Главная' },
        { path: '/dashboard', label: 'Мои доски' },
        { path: '/profile', label: 'Профиль' },
      ]
    : [
        { path: '/', label: 'Главная' },
        { path: '/register', label: 'Регистрация' },
        { path: '/login', label: 'Вход' },
      ];
