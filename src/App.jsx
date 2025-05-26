// // import React from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import { useAuth } from "./context/AuthContext";

// // // Pages
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import PasswordList from "./pages/PasswordList";
// // import UserManagement from "./pages/UserManagement";
// // import NotFound from "./pages/NotFound";

// // // Components
// // import Layout from "./components/Layout";
// // import PrivateRoute from "./components/PrivateRoute";
// // import AdminRoute from "./components/AdminRoute";

// // function App() {
// //   const { isAuthenticated } = useAuth();

// //   return (
// //     <Routes>
// //       {/* Public Routes */}
// //       <Route
// //         path="/"
// //         element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
// //       />
// //       <Route path="/login" element={<Login />} />

// //       {/* Protected Routes */}
// //       <Route element={<PrivateRoute />}>
// //         <Route element={<Layout />}>
// //           <Route path="/dashboard" element={<Dashboard />} />
// //           <Route path="/passwords" element={<PasswordList />} />

// //           {/* Admin Routes */}
// //           <Route element={<AdminRoute />}>
// //             <Route path="/users" element={<UserManagement />} />
// //           </Route>
// //         </Route>
// //       </Route>

// //       {/* 404 Page */}
// //       <Route path="*" element={<NotFound />} />
// //     </Routes>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// // Pages
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import PasswordList from "./pages/PasswordList";
// import Groups from "./pages/Groups"; // Nouvelle page
// import UserManagement from "./pages/UserManagement";
// import NotFound from "./pages/NotFound";

// // Composants
// import Layout from "./components/Layout";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./components/AdminRoute";

// function App() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Routes>
//       {/* Routes publiques */}
//       <Route
//         path="/"
//         element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
//       />
//       <Route path="/login" element={<Login />} />

//       {/* Routes protégées */}
//       <Route element={<PrivateRoute />}>
//         <Route element={<Layout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/passwords" element={<PasswordList />} />
//           <Route path="/groups" element={<Groups />} /> {/* Nouvelle route */}
//           {/* Routes administrateur */}
//           <Route element={<AdminRoute />}>
//             <Route path="/users" element={<UserManagement />} />
//           </Route>
//         </Route>
//       </Route>

//       {/* Page 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PasswordList from "./pages/PasswordList";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails"; // NOUVEL IMPORT : Ajoutez cette ligne
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

// Composants
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Routes publiques */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/login" element={<Login />} />

      {/* Routes protégées */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/passwords" element={<PasswordList />} />
          <Route path="/groups" element={<Groups />} />

          {/* NOUVELLE ROUTE : Ajoutez cette ligne pour la page de détails */}
          <Route path="/groups/:id" element={<GroupDetails />} />

          {/* Routes administrateur */}
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* Page 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
