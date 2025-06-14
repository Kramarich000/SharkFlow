export const navLinks = (token) =>
  token
    ? [
        { path: '/', label: 'Главная' },
        { path: '/dashboard', label: 'Мои доски' },
        { path: '/settings', label: 'Настройки' },
      ]
    : [
        { path: '/', label: 'Главная' },
        { path: '/register', label: 'Регистрация' },
        { path: '/login', label: 'Вход' },
      ];
