
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthMainPage } from '../pages/AuthMainPage'


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="main" element={<AuthMainPage />} />
        <Route path="/*" element={ <Navigate to="/auth/main" /> } />
    </Routes>
  )
}
