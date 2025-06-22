import { useAuthStore } from 'features/auth/store/authStore';
import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
