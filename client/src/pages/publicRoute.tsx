import { Navigate, useLocation, Outlet } from "react-router";

export default function PublicRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={"/dashboard"} />;
  }
  return <Outlet />;
}
