// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { FaPlus, FaEdit, FaTrash, FaUserShield, FaUser } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// // Компоненты
// import UserModal from "../components/UserModal";
// import ConfirmModal from "../components/ConfirmModal";

// const UserManagement = () => {
//   const { user: authUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   // Состояния для модальных окон
//   const [modalOpen, setModalOpen] = useState(false);
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Получить всех пользователей
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/users");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Ошибка при получении списка пользователей");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Фильтровать пользователей в соответствии с поиском
//   const filteredUsers = users.filter(
//     (user) =>
//       user.username.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase()) ||
//       user.role.toLowerCase().includes(search.toLowerCase())
//   );

//   // Открыть модальное окно для добавления пользователя
//   const openAddModal = () => {
//     setCurrentUser(null);
//     setModalOpen(true);
//   };

//   // Открыть модальное окно для редактирования пользователя
//   const openEditModal = (user) => {
//     setCurrentUser(user);
//     setModalOpen(true);
//   };

//   // Открыть модальное окно подтверждения для удаления пользователя
//   const openDeleteModal = (user) => {
//     setCurrentUser(user);
//     setConfirmModalOpen(true);
//   };

//   // Обработать добавление или изменение пользователя
//   const handleSaveUser = async (userData) => {
//     try {
//       if (currentUser) {
//         // Обновление
//         await axios.put(`/api/users/${currentUser.id}`, userData);
//         toast.success("Пользователь успешно обновлен");
//       } else {
//         // Добавление
//         await axios.post("/api/users", userData);
//         toast.success("Пользователь успешно добавлен");
//       }

//       fetchUsers();
//       setModalOpen(false);
//     } catch (error) {
//       let errorMessage = "Ошибка при сохранении пользователя";
//       if (error.response && error.response.data && error.response.data.msg) {
//         errorMessage = error.response.data.msg;
//       }
//       toast.error(errorMessage);
//       console.error(error);
//     }
//   };

//   // Обработать удаление пользователя
//   const handleDeleteUser = async () => {
//     try {
//       await axios.delete(`/api/users/${currentUser.id}`);

//       toast.success("Пользователь успешно удален");
//       fetchUsers();
//       setConfirmModalOpen(false);
//     } catch (error) {
//       let errorMessage = "Ошибка при удалении пользователя";
//       if (error.response && error.response.data && error.response.data.msg) {
//         errorMessage = error.response.data.msg;
//       }
//       toast.error(errorMessage);
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="user-list-header">
//         <div>
//           <h1>Управление пользователями</h1>
//           <p className="subtitle">
//             Управляйте пользователями менеджера паролей
//           </p>
//         </div>
//         <button className="btn btn-primary" onClick={openAddModal}>
//           <FaPlus /> Добавить пользователя
//         </button>
//       </div>

//       <div className="card">
//         <div className="card-header">
//           <h2>Список пользователей</h2>
//         </div>
//         <div className="card-body">
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Поиск пользователя..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full"
//             />
//           </div>

//           {loading ? (
//             <div className="text-center py-4">Загрузка...</div>
//           ) : filteredUsers.length > 0 ? (
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Имя пользователя</th>
//                     <th>Email</th>
//                     <th>Роль</th>
//                     <th>Дата создания</th>
//                     <th>Действия</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUsers.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.username}</td>
//                       <td>{user.email}</td>
//                       <td>
//                         <span className={`user-role ${user.role}`}>
//                           {user.role === "admin" ? (
//                             <>
//                               <FaUserShield /> Администратор
//                             </>
//                           ) : (
//                             <>
//                               <FaUser /> Пользователь
//                             </>
//                           )}
//                         </span>
//                       </td>
//                       <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         <div className="flex gap-1">
//                           <button
//                             className="btn btn-sm btn-secondary"
//                             onClick={() => openEditModal(user)}
//                             title="Изменить"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => openDeleteModal(user)}
//                             title="Удалить"
//                             disabled={user.id === authUser.id} // Запретить удаление самого себя
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-4">
//               <p>Пользователи не найдены</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Модальное окно добавления/редактирования пользователя */}
//       {modalOpen && (
//         <UserModal
//           user={currentUser}
//           onSave={handleSaveUser}
//           onClose={() => setModalOpen(false)}
//         />
//       )}

//       {/* Модальное окно подтверждения удаления */}
//       {confirmModalOpen && (
//         <ConfirmModal
//           title="Удалить пользователя"
//           message={`Вы уверены, что хотите удалить пользователя "${currentUser?.username}"?`}
//           confirmLabel="Удалить"
//           onConfirm={handleDeleteUser}
//           onCancel={() => setConfirmModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaUserShield, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// Компоненты
import UserModal from "../components/UserModal";
import ConfirmModal from "../components/ConfirmModal";

const UserManagement = () => {
  const { user: authUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Состояния для модальных окон
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Получить всех пользователей
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Ошибка при получении списка пользователей");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Фильтровать пользователей в соответствии с поиском
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  // Открыть модальное окно для добавления пользователя
  const openAddModal = () => {
    setCurrentUser(null);
    setModalOpen(true);
  };

  // Открыть модальное окно для редактирования пользователя
  const openEditModal = (user) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  // Открыть модальное окно подтверждения для удаления пользователя
  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setConfirmModalOpen(true);
  };

  // Обработать добавление или изменение пользователя
  const handleSaveUser = async (userData) => {
    try {
      if (currentUser) {
        // Обновление
        await api.put(`/api/users/${currentUser.id}`, userData);
        toast.success("Пользователь успешно обновлен");
      } else {
        // Добавление
        await api.post("/api/users", userData);
        toast.success("Пользователь успешно добавлен");
      }

      fetchUsers();
      setModalOpen(false);
    } catch (error) {
      let errorMessage = "Ошибка при сохранении пользователя";
      if (error.response && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      }
      toast.error(errorMessage);
      console.error(error);
    }
  };

  // Обработать удаление пользователя
  const handleDeleteUser = async () => {
    try {
      await api.delete(`/api/users/${currentUser.id}`);

      toast.success("Пользователь успешно удален");
      fetchUsers();
      setConfirmModalOpen(false);
    } catch (error) {
      let errorMessage = "Ошибка при удалении пользователя";
      if (error.response && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      }
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="user-list-header">
        <div>
          <h1>Управление пользователями</h1>
          <p className="subtitle">
            Управляйте пользователями менеджера паролей
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Добавить пользователя
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Список пользователей</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              placeholder="Поиск пользователя..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          {loading ? (
            <div className="text-center py-4">Загрузка...</div>
          ) : filteredUsers.length > 0 ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Имя пользователя</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Дата создания</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`user-role ${user.role}`}>
                          {user.role === "admin" ? (
                            <>
                              <FaUserShield /> Администратор
                            </>
                          ) : (
                            <>
                              <FaUser /> Пользователь
                            </>
                          )}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-1">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => openEditModal(user)}
                            title="Изменить"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => openDeleteModal(user)}
                            title="Удалить"
                            disabled={user.id === authUser.id} // Запретить удаление самого себя
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p>Пользователи не найдены</p>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно добавления/редактирования пользователя */}
      {modalOpen && (
        <UserModal
          user={currentUser}
          onSave={handleSaveUser}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {confirmModalOpen && (
        <ConfirmModal
          title="Удалить пользователя"
          message={`Вы уверены, что хотите удалить пользователя "${currentUser?.username}"?`}
          confirmLabel="Удалить"
          onConfirm={handleDeleteUser}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
