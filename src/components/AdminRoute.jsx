import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Во время загрузки показывать экран загрузки
  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-body text-center">
            <p>Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  // Перенаправить на панель управления, если пользователь не является администратором
  return isAuthenticated && user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AdminRoute;
