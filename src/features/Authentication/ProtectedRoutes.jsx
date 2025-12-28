// ProtectedRoute.js
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import Unauthorized from "../../pages/Unauthorized";

export default function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  // Check if there's a pending doctor
  const pendingDoctor = localStorage.getItem("pendingDoctor");

  // If pending doctor exists, redirect to wait page
  if (pendingDoctor) {
    return <Navigate to="/wait" replace />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Unauthorized />;
  }

  const authState = authUser();
  const user = authState?.user;
  // If role is restricted and user doesn't have required role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    console.log("Unauthorized access attempt by user:", user);
    return <Unauthorized />;
  }

  return children;
}
