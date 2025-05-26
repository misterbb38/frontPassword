// import React from "react";
// import { Link } from "react-router-dom";
// import { FaHome, FaExclamationTriangle } from "react-icons/fa";

// const NotFound = () => {
//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <div className="auth-header">
//           <FaExclamationTriangle size={40} color="#ef476f" />
//           <h1 style={{ color: "#ef476f" }}>404</h1>
//           <p className="subtitle">Page non trouvée</p>
//         </div>
//         <div className="auth-body text-center">
//           <p className="mb-4">
//             La page que vous recherchez n'existe pas ou a été déplacée.
//           </p>
//           <Link to="/" className="btn btn-primary">
//             <FaHome /> Retour à l'accueil
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;

import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <FaExclamationTriangle size={40} color="#ef476f" />
          <h1 style={{ color: "#ef476f" }}>404</h1>
          <p className="subtitle">Страница не найдена</p>
        </div>
        <div className="auth-body text-center">
          <p className="mb-4">
            Страница, которую вы ищете, не существует или была перемещена.
          </p>
          <Link to="/" className="btn btn-primary">
            <FaHome /> Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
