// import React, { createContext, useState, useEffect, useContext } from "react";
// import api from "../utils/api";
// import { toast } from "react-toastify";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Проверить аутентификацию пользователя при загрузке
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         try {
//           // Настроить заголовки для запросов
//           axios.defaults.headers.common["x-auth-token"] = token;

//           // Получить данные пользователя
//           const response = await axios.get("/api/auth/me");

//           setUser(response.data);
//           setIsAuthenticated(true);
//         } catch (error) {
//           // Если токен недействителен, удалить его
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

//   // Функция входа
//   const login = async (username, password) => {
//     try {
//       const response = await axios.post("/api/auth/login", {
//         username,
//         password,
//       });

//       const { token, user } = response.data;

//       // Сохранить токен в localStorage
//       localStorage.setItem("token", token);

//       // Настроить заголовки для будущих запросов
//       axios.defaults.headers.common["x-auth-token"] = token;

//       setUser(user);
//       setIsAuthenticated(true);

//       return { success: true };
//     } catch (error) {
//       let errorMsg = "Ошибка входа";

//       if (error.response && error.response.data && error.response.data.msg) {
//         errorMsg = error.response.data.msg;
//       }

//       toast.error(errorMsg);
//       return { success: false, message: errorMsg };
//     }
//   };

//   // Функция выхода
//   const logout = () => {
//     // Удалить токен из localStorage
//     localStorage.removeItem("token");

//     // Удалить заголовок аутентификации
//     delete axios.defaults.headers.common["x-auth-token"];

//     setUser(null);
//     setIsAuthenticated(false);

//     toast.info("Вы вышли из системы");
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
import api from "../utils/api"; // Utilisez l'instance api au lieu d'axios

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
          // Получить данные пользователя (utilisez api au lieu de axios)
          const response = await api.get("/api/auth/me");

          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Если токен недействителен, удалить его
          localStorage.removeItem("token");

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
      // Utilisez api au lieu de axios
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      // Сохранить токен в localStorage
      localStorage.setItem("token", token);

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
