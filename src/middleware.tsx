import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: Readonly<{ children: ReactNode }>) {
  if (!localStorage.getItem("access_token")) {
    return <Navigate to={"/login"} />;
  }

  return children;
}

export function AuthRoute({ children }: { children: ReactNode }) {
  if (localStorage.getItem("access_token")) {
    <Navigate to={"/login"} />;
  }
  return children;
}
