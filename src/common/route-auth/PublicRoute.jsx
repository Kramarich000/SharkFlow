import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from 'features/auth/store/authStore';

export function PublicRoute({ children }) {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}
