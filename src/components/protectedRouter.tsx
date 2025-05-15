import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
  isAuthenticated: boolean;
}

export const ProtectedRouter = ({  isAuthenticated }: Props) => {
  

    if (!isAuthenticated) {
        return <Navigate to="/auth/" />;
    }


  return <Outlet />;
};
