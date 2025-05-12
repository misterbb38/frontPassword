// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaPlus, FaEdit, FaTrash, FaUserShield, FaUser } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// // Composants
// import UserModal from "../components/UserModal";
// import ConfirmModal from "../components/ConfirmModal";

// const UserManagement = () => {
//   const { user: authUser } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   // États pour les modales
//   const [modalOpen, setModalOpen] = useState(false);
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Récupérer tous les utilisateurs
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/users");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Erreur lors de la récupération des utilisateurs");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filtrer les utilisateurs en fonction de la recherche
//   const filteredUsers = users.filter(
//     (user) =>
//       user.username.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase()) ||
//       user.role.toLowerCase().includes(search.toLowerCase())
//   );

//   // Ouvrir la modale pour ajouter un utilisateur
//   const openAddModal = () => {
//     setCurrentUser(null);
//     setModalOpen(true);
//   };

//   // Ouvrir la modale pour éditer un utilisateur
//   const openEditModal = (user) => {
//     setCurrentUser(user);
//     setModalOpen(true);
//   };

//   // Ouvrir la modale de confirmation pour supprimer un utilisateur
//   const openDeleteModal = (user) => {
//     setCurrentUser(user);
//     setConfirmModalOpen(true);
//   };

//   // Gérer l'ajout ou la modification d'un utilisateur
//   const handleSaveUser = async (userData) => {
//     try {
//       if (currentUser) {
//         // Mise à jour
//         await axios.put(`/api/users/${currentUser.id}`, userData);
//         toast.success("Utilisateur mis à jour avec succès");
//       } else {
//         // Ajout
//         await axios.post("/api/users", userData);
//         toast.success("Utilisateur ajouté avec succès");
//       }

//       fetchUsers();
//       setModalOpen(false);
//     } catch (error) {
//       let errorMessage = "Erreur lors de l'enregistrement de l'utilisateur";
//       if (error.response && error.response.data && error.response.data.msg) {
//         errorMessage = error.response.data.msg;
//       }
//       toast.error(errorMessage);
//       console.error(error);
//     }
//   };

//   // Gérer la suppression d'un utilisateur
//   const handleDeleteUser = async () => {
//     try {
//       await axios.delete(`/api/users/${currentUser.id}`);

//       toast.success("Utilisateur supprimé avec succès");
//       fetchUsers();
//       setConfirmModalOpen(false);
//     } catch (error) {
//       let errorMessage = "Erreur lors de la suppression de l'utilisateur";
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
//           <h1>Gestion des utilisateurs</h1>
//           <p className="subtitle">
//             Gérez les utilisateurs du gestionnaire de mots de passe
//           </p>
//         </div>
//         <button className="btn btn-primary" onClick={openAddModal}>
//           <FaPlus /> Ajouter un utilisateur
//         </button>
//       </div>

//       <div className="card">
//         <div className="card-header">
//           <h2>Liste des utilisateurs</h2>
//         </div>
//         <div className="card-body">
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Rechercher un utilisateur..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full"
//             />
//           </div>

//           {loading ? (
//             <div className="text-center py-4">Chargement...</div>
//           ) : filteredUsers.length > 0 ? (
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Nom d'utilisateur</th>
//                     <th>Email</th>
//                     <th>Rôle</th>
//                     <th>Date de création</th>
//                     <th>Actions</th>
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
//                               <FaUserShield /> Admin
//                             </>
//                           ) : (
//                             <>
//                               <FaUser /> Utilisateur
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
//                             title="Modifier"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={() => openDeleteModal(user)}
//                             title="Supprimer"
//                             disabled={user.id === authUser.id} // Empêcher de se supprimer soi-même
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
//               <p>Aucun utilisateur trouvé</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modale d'ajout/édition d'utilisateur */}
//       {modalOpen && (
//         <UserModal
//           user={currentUser}
//           onSave={handleSaveUser}
//           onClose={() => setModalOpen(false)}
//         />
//       )}

//       {/* Modale de confirmation de suppression */}
//       {confirmModalOpen && (
//         <ConfirmModal
//           title="Supprimer l'utilisateur"
//           message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${currentUser?.username}" ?`}
//           confirmLabel="Supprimer"
//           onConfirm={handleDeleteUser}
//           onCancel={() => setConfirmModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
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
      const res = await axios.get("/api/users");
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
        await axios.put(`/api/users/${currentUser.id}`, userData);
        toast.success("Пользователь успешно обновлен");
      } else {
        // Добавление
        await axios.post("/api/users", userData);
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
      await axios.delete(`/api/users/${currentUser.id}`);

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
