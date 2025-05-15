// AppRouter.tsx
import { AuthRoutes } from '@/auth/router/AuthRoutes';
import { ProtectedRouter } from '@/components/protectedRouter';
import { NexGestRouter } from '@/nexgest/router/NexGestRouter';
import { useAuthStore } from '@/store/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRouter = () => {

  const isAuth = useAuthStore((state) => state.isAuth);
  
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRouter isAuthenticated={isAuth} />}>
        <Route path="/" element={<NexGestRouter />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
