import { MdHome } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { GiExitDoor } from 'react-icons/gi';
import { GoLock } from 'react-icons/go';

const HomeIcon = <MdHome />;
const DashBoardIcon = <FaClipboardList />;
const ProfileIcon = <CgProfile />;
const LoginIcon = <GiExitDoor />;
const RegisterIcon = <GoLock />;

export const navLinks = (token) =>
  token
    ? [
        { path: '/', label: 'Главная', icon: HomeIcon },
        { path: '/dashboard', label: 'Мои доски', icon: DashBoardIcon },
        { path: '/profile', label: 'Профиль', icon: ProfileIcon },
      ]
    : [
        { path: '/', label: 'Главная', icon: HomeIcon },
        { path: '/login', label: 'Вход', icon: LoginIcon },
        { path: '/register', label: 'Регистрация', icon: RegisterIcon },
      ];
