// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import api from "../utils/api";
// import { FaKey, FaUsers, FaPlusCircle, FaLock } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// const Dashboard = () => {
//   const { user, isAdmin } = useAuth();
//   const [stats, setStats] = useState({
//     totalPasswords: 0,
//     totalUsers: 0,
//     recentPasswords: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // Получить статистику
//         const passwordsRes = await axios.get("/api/passwords");

//         let usersCount = 0;
//         if (isAdmin) {
//           const usersRes = await axios.get("/api/users");
//           usersCount = usersRes.data.length;
//         }

//         // Сортировка паролей по дате создания (от новых к старым)
//         const sortedPasswords = [...passwordsRes.data].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

//         setStats({
//           totalPasswords: passwordsRes.data.length,
//           totalUsers: usersCount,
//           recentPasswords: sortedPasswords.slice(0, 5),
//         });
//       } catch (error) {
//         console.error("Ошибка при получении статистики:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [isAdmin]);

//   if (loading) {
//     return <div>Загрузка статистики...</div>;
//   }

//   return (
//     <div>
//       <header>
//         <h1>Панель управления</h1>
//         <p className="subtitle">Добро пожаловать, {user?.username}!</p>
//       </header>

//       <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
//         <div className="card" style={{ flex: "1", minWidth: "250px" }}>
//           <div className="card-header">
//             <h2>Ваши пароли</h2>
//           </div>
//           <div className="card-body">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h3
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "bold",
//                     color: "var(--primary-color)",
//                   }}
//                 >
//                   {stats.totalPasswords}
//                 </h3>
//                 <p>Сохраненные пароли</p>
//               </div>
//               <FaKey size={40} color="var(--primary-color)" />
//             </div>
//             <Link to="/passwords" className="btn btn-primary">
//               Управление паролями
//             </Link>
//           </div>
//         </div>

//         {isAdmin && (
//           <div className="card" style={{ flex: "1", minWidth: "250px" }}>
//             <div className="card-header">
//               <h2>Пользователи</h2>
//             </div>
//             <div className="card-body">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h3
//                     style={{
//                       fontSize: "2rem",
//                       fontWeight: "bold",
//                       color: "var(--primary-color)",
//                     }}
//                   >
//                     {stats.totalUsers}
//                   </h3>
//                   <p>Зарегистрированные пользователи</p>
//                 </div>
//                 <FaUsers size={40} color="var(--primary-color)" />
//               </div>
//               <Link to="/users" className="btn btn-primary">
//                 Управление пользователями
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="card mt-4">
//         <div className="card-header">
//           <h2>Недавние пароли</h2>
//         </div>
//         <div className="card-body">
//           {stats.recentPasswords.length > 0 ? (
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Название</th>
//                     <th>Имя пользователя</th>
//                     <th>Дата создания</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {stats.recentPasswords.map((password) => (
//                     <tr key={password._id}>
//                       <td>{password.title}</td>
//                       <td>{password.username}</td>
//                       <td>
//                         {new Date(password.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-4">
//               <FaLock size={40} color="#ccc" />
//               <p className="mt-2">Нет сохраненных паролей</p>
//               <Link to="/passwords" className="btn btn-primary mt-2">
//                 <FaPlusCircle /> Добавить пароль
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { FaKey, FaUsers, FaPlusCircle, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalPasswords: 0,
    totalUsers: 0,
    recentPasswords: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Получить статистику
        const passwordsRes = await api.get("/api/passwords");

        let usersCount = 0;
        if (isAdmin) {
          const usersRes = await api.get("/api/users");
          usersCount = usersRes.data.length;
        }

        // Сортировка паролей по дате создания (от новых к старым)
        const sortedPasswords = [...passwordsRes.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setStats({
          totalPasswords: passwordsRes.data.length,
          totalUsers: usersCount,
          recentPasswords: sortedPasswords.slice(0, 5),
        });
      } catch (error) {
        console.error("Ошибка при получении статистики:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  if (loading) {
    return <div>Загрузка статистики...</div>;
  }

  return (
    <div>
      <header>
        <h1>Панель управления</h1>
        <p className="subtitle">Добро пожаловать, {user?.username}!</p>
      </header>

      <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
        <div className="card" style={{ flex: "1", minWidth: "250px" }}>
          <div className="card-header">
            <h2>Ваши пароли</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "var(--primary-color)",
                  }}
                >
                  {stats.totalPasswords}
                </h3>
                <p>Сохраненные пароли</p>
              </div>
              <FaKey size={40} color="var(--primary-color)" />
            </div>
            <Link to="/passwords" className="btn btn-primary">
              Управление паролями
            </Link>
          </div>
        </div>

        {isAdmin && (
          <div className="card" style={{ flex: "1", minWidth: "250px" }}>
            <div className="card-header">
              <h2>Пользователи</h2>
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "var(--primary-color)",
                    }}
                  >
                    {stats.totalUsers}
                  </h3>
                  <p>Зарегистрированные пользователи</p>
                </div>
                <FaUsers size={40} color="var(--primary-color)" />
              </div>
              <Link to="/users" className="btn btn-primary">
                Управление пользователями
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h2>Недавние пароли</h2>
        </div>
        <div className="card-body">
          {stats.recentPasswords.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Имя пользователя</th>
                    <th>Дата создания</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPasswords.map((password) => (
                    <tr key={password._id}>
                      <td>{password.title}</td>
                      <td>{password.username}</td>
                      <td>
                        {new Date(password.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <FaLock size={40} color="#ccc" />
              <p className="mt-2">Нет сохраненных паролей</p>
              <Link to="/passwords" className="btn btn-primary mt-2">
                <FaPlusCircle /> Добавить пароль
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
