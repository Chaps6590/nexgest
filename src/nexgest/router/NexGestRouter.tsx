// NexGestRouter.tsx
import { Route, Routes, Navigate } from 'react-router-dom';
import { NexGestPage } from '../pages/NexGestPage';

export const NexGestRouter = () => (
  <Routes> {/* Rutas deben estar dentro de <Routes> */}
    <Route path="/" element={<NexGestPage />} />
    <Route path="/*" element={<Navigate to="/" />} />
  </Routes>
);
