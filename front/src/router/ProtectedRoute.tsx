import { Navigate,  useLocation } from "react-router-dom";
import { ReactElement } from "react";
// import { useAuthContext } from "../hooks/useAuthContext.hook";

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactElement;
}) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const userString = localStorage.getItem("user");

  if (userString === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = JSON.parse(userString);

  const isAuthenticated = token && user;

  if (isAuthenticated) {
    if (allowedRoles.includes(user.role)) {
      return children;
    } else {
      return <Navigate to={"/"} state={{ from: location }} replace />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
