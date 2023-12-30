import { ReactElement } from "react";
// import { useAuthContext } from "../hooks/useAuthContext.hook";

export const ProtectedComponent = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactElement;
}) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (userString === null) {
      return <></>;
  }

  const user = JSON.parse(userString);

  const isAuthenticated = token && user;

  if (isAuthenticated) {
    if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
      return children;
    } else {
      return <></>;
    }
  } else {
      return <></>;
  }
};
