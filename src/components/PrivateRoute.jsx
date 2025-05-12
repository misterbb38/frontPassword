// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = () => {
//   const { isAuthenticated, loading } = useAuth();

//   // Pendant le chargement, afficher un écran de chargement
//   if (loading) {
//     return (
//       <div className="auth-page">
//         <div className="auth-card">
//           <div className="auth-body text-center">
//             <p>Chargement...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

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

  // Перенаправить на страницу входа, если пользователь не аутентифицирован
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
