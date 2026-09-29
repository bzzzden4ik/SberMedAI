import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '@/entities/session';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <div></div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <div></div>;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" replace />;
}