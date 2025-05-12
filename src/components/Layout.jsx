// import React from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { FaHome, FaKey, FaUsers, FaSignOutAlt } from "react-icons/fa";

// const Layout = () => {
//   const { user, logout, isAdmin } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="layout">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <NavLink to="/dashboard" className="sidebar-logo">
//             <span>Twowin</span>
//           </NavLink>
//           <div className="mt-2 text-center">
//             <small>{user?.username}</small>
//             <br />
//             <small className={`user-role ${user?.role}`}>{user?.role}</small>
//           </div>
//         </div>

//         <ul className="sidebar-menu">
//           <li className="sidebar-menu-item">
//             <NavLink to="/dashboard">
//               <FaHome />
//               <span>Tableau de bord</span>
//             </NavLink>
//           </li>
//           <li className="sidebar-menu-item">
//             <NavLink to="/passwords">
//               <FaKey />
//               <span>Mots de passe</span>
//             </NavLink>
//           </li>

//           {isAdmin && (
//             <li className="sidebar-menu-item">
//               <NavLink to="/users">
//                 <FaUsers />
//                 <span>Utilisateurs</span>
//               </NavLink>
//             </li>
//           )}

//           <li className="sidebar-menu-item mt-4">
//             <a href="#" onClick={handleLogout}>
//               <FaSignOutAlt />
//               <span>Déconnexion</span>
//             </a>
//           </li>
//         </ul>
//       </aside>

//       <main className="main-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaKey, FaUsers, FaSignOutAlt } from "react-icons/fa";

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-logo">
            <span>Twowin</span>
          </NavLink>
          <div className="mt-2 text-center">
            <small>{user?.username}</small>
            <br />
            <small className={`user-role ${user?.role}`}>{user?.role}</small>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <NavLink to="/dashboard">
              <FaHome />
              <span>Панель управления</span>
            </NavLink>
          </li>
          <li className="sidebar-menu-item">
            <NavLink to="/passwords">
              <FaKey />
              <span>Пароли</span>
            </NavLink>
          </li>

          {isAdmin && (
            <li className="sidebar-menu-item">
              <NavLink to="/users">
                <FaUsers />
                <span>Пользователи</span>
              </NavLink>
            </li>
          )}

          <li className="sidebar-menu-item mt-4">
            <a href="#" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Выйти</span>
            </a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
