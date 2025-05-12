// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Vérifier si l'utilisateur est authentifié au chargement
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         try {
//           // Configurer les en-têtes pour les requêtes
//           axios.defaults.headers.common["x-auth-token"] = token;

//           // Récupérer les données de l'utilisateur
//           const response = await axios.get("/api/auth/me");

//           setUser(response.data);
//           setIsAuthenticated(true);
//         } catch (error) {
//           // Si le token est invalide, le supprimer
//           localStorage.removeItem("token");
//           delete axios.defaults.headers.common["x-auth-token"];

//           setUser(null);
//           setIsAuthenticated(false);
//         }
//       }

//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   // Fonction de connexion
//   const login = async (username, password) => {
//     try {
//       const response = await axios.post("/api/auth/login", {
//         username,
//         password,
//       });

//       const { token, user } = response.data;

//       // Sauvegarder le token dans le localStorage
//       localStorage.setItem("token", token);

//       // Configurer les en-têtes pour les requêtes futures
//       axios.defaults.headers.common["x-auth-token"] = token;

//       setUser(user);
//       setIsAuthenticated(true);

//       return { success: true };
//     } catch (error) {
//       let errorMsg = "Erreur de connexion";

//       if (error.response && error.response.data && error.response.data.msg) {
//         errorMsg = error.response.data.msg;
//       }

//       toast.error(errorMsg);
//       return { success: false, message: errorMsg };
//     }
//   };

//   // Fonction de déconnexion
//   const logout = () => {
//     // Supprimer le token du localStorage
//     localStorage.removeItem("token");

//     // Supprimer l'en-tête d'authentification
//     delete axios.defaults.headers.common["x-auth-token"];

//     setUser(null);
//     setIsAuthenticated(false);

//     toast.info("Vous avez été déconnecté");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         loading,
//         login,
//         logout,
//         isAdmin: user?.role === "admin",
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверить аутентификацию пользователя при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Настроить заголовки для запросов
          axios.defaults.headers.common["x-auth-token"] = token;

          // Получить данные пользователя
          const response = await axios.get("/api/auth/me");

          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Если токен недействителен, удалить его
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["x-auth-token"];

          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Функция входа
  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      // Сохранить токен в localStorage
      localStorage.setItem("token", token);

      // Настроить заголовки для будущих запросов
      axios.defaults.headers.common["x-auth-token"] = token;

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      let errorMsg = "Ошибка входа";

      if (error.response && error.response.data && error.response.data.msg) {
        errorMsg = error.response.data.msg;
      }

      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  // Функция выхода
  const logout = () => {
    // Удалить токен из localStorage
    localStorage.removeItem("token");

    // Удалить заголовок аутентификации
    delete axios.defaults.headers.common["x-auth-token"];

    setUser(null);
    setIsAuthenticated(false);

    toast.info("Вы вышли из системы");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
