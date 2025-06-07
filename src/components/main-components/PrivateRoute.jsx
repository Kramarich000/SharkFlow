import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAuthenticated = true;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
