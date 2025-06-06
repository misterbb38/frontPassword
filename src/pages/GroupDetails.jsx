// // // // src/pages/GroupDetails.jsx

// // // import React, { useState, useEffect } from "react";
// // // import { useParams, Link } from "react-router-dom";
// // // import api from "../utils/api";
// // // import { toast } from "react-toastify";
// // // import {
// // //   FaPlus,
// // //   FaEdit,
// // //   FaTrash,
// // //   FaEye,
// // //   FaEyeSlash,
// // //   FaCopy,
// // //   FaFolder,
// // //   FaArrowLeft,
// // //   FaListUl, // Nouvelle icône
// // // } from "react-icons/fa";
// // // import PasswordModal from "../components/PasswordModal";
// // // import ConfirmModal from "../components/ConfirmModal";
// // // // Importez la nouvelle modale
// // // import AddPasswordsToGroupModal from "../components/AddPasswordsToGroupModal";

// // // const GroupDetails = () => {
// // //   const { id } = useParams();
// // //   const [group, setGroup] = useState(null);
// // //   const [passwords, setPasswords] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // États pour les modales
// // //   const [passwordModalOpen, setPasswordModalOpen] = useState(false);
// // //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// // //   const [addPasswordsModalOpen, setAddPasswordsModalOpen] = useState(false); // État pour la nouvelle modale

// // //   const [currentPassword, setCurrentPassword] = useState(null);
// // //   const [showPasswordId, setShowPasswordId] = useState(null);

// // //   useEffect(() => {
// // //     fetchGroupDetails();
// // //   }, [id]);

// // //   const fetchGroupDetails = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await api.get(`/api/groups/${id}`);
// // //       setGroup(res.data);
// // //       setPasswords(res.data.passwords || []);
// // //     } catch (error) {
// // //       toast.error("Erreur lors du chargement des détails du groupe.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handlePasswordsAdded = () => {
// // //     setAddPasswordsModalOpen(false);
// // //     fetchGroupDetails(); // Rafraîchir les données
// // //   };

// // //   // ... (vos autres fonctions : copyToClipboard, toggleShowPassword, etc. restent identiques)
// // //   const openAddModal = () => {
// // //     setCurrentPassword(null);
// // //     setPasswordModalOpen(true);
// // //   };

// // //   const openEditModal = (password) => {
// // //     setCurrentPassword(password);
// // //     setPasswordModalOpen(true);
// // //   };

// // //   const openDeleteModal = (password) => {
// // //     setCurrentPassword(password);
// // //     setConfirmModalOpen(true);
// // //   };

// // //   const handleSavePassword = async (passwordData) => {
// // //     try {
// // //       const dataToSend = { ...passwordData, groupId: id };
// // //       if (currentPassword && currentPassword._id) {
// // //         await api.put(`/api/passwords/${currentPassword._id}`, dataToSend);
// // //         toast.success("Mot de passe mis à jour.");
// // //       } else {
// // //         await api.post("/api/passwords", dataToSend);
// // //         toast.success("Mot de passe ajouté.");
// // //       }
// // //       fetchGroupDetails();
// // //       setPasswordModalOpen(false);
// // //     } catch (error) {
// // //       toast.error("Erreur lors de la sauvegarde du mot de passe.");
// // //     }
// // //   };

// // //   const handleDeletePassword = async () => {
// // //     try {
// // //       if (!currentPassword || !currentPassword._id) return;
// // //       await api.delete(`/api/passwords/${currentPassword._id}`);
// // //       toast.success("Mot de passe supprimé.");
// // //       fetchGroupDetails();
// // //       setConfirmModalOpen(false);
// // //     } catch (error) {
// // //       toast.error("Erreur lors de la suppression du mot de passe.");
// // //     }
// // //   };

// // //   if (loading) return <div className="text-center p-4">Chargement...</div>;
// // //   if (!group)
// // //     return (
// // //       <div className="text-center p-4">Groupe non trouvé ou accès refusé.</div>
// // //     );

// // //   return (
// // //     <div>
// // //       <Link to="/groups" className="btn btn-secondary mb-4">
// // //         <FaArrowLeft /> Retour aux groupes
// // //       </Link>

// // //       <div className="password-list-header">
// // //         <div className="flex items-center gap-3">
// // //           <FaFolder size={40} style={{ color: group.color }} />
// // //           <div>
// // //             <h1>{group.name}</h1>
// // //             <p className="subtitle">
// // //               {group.description || "Mots de passe de ce groupe"}
// // //             </p>
// // //           </div>
// // //         </div>
// // //         <div className="flex gap-2">
// // //           <button
// // //             className="btn btn-secondary"
// // //             onClick={() => setAddPasswordsModalOpen(true)}
// // //           >
// // //             <FaListUl /> Gérer les mots de passe
// // //           </button>
// // //           <button className="btn btn-primary" onClick={openAddModal}>
// // //             <FaPlus /> Créer un mot de passe
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Le reste de la page (la liste des mots de passe) reste identique */}
// // //       <div className="card" style={{ borderTop: `3px solid ${group.color}` }}>
// // //         {/* ... */}
// // //       </div>

// // //       {/* Modales */}
// // //       {passwordModalOpen && (
// // //         <PasswordModal
// // //           password={currentPassword || { groupId: id }}
// // //           onSave={handleSavePassword}
// // //           onClose={() => setPasswordModalOpen(false)}
// // //         />
// // //       )}

// // //       {confirmModalOpen && (
// // //         <ConfirmModal
// // //           title="Supprimer le mot de passe"
// // //           message={`Êtes-vous sûr de vouloir supprimer le mot de passe "${currentPassword?.title}" ?`}
// // //           confirmLabel="Supprimer"
// // //           onConfirm={handleDeletePassword}
// // //           onCancel={() => setConfirmModalOpen(false)}
// // //         />
// // //       )}

// // //       {/* Affichez la nouvelle modale ici */}
// // //       {addPasswordsModalOpen && (
// // //         <AddPasswordsToGroupModal
// // //           groupId={id}
// // //           onSave={handlePasswordsAdded}
// // //           onClose={() => setAddPasswordsModalOpen(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default GroupDetails;

// // // src/pages/GroupDetails.jsx

// // import React, { useState, useEffect } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import api from "../utils/api";
// // import { toast } from "react-toastify";
// // import {
// //   FaPlus,
// //   FaEdit,
// //   FaTrash,
// //   FaEye,
// //   FaEyeSlash,
// //   FaCopy,
// //   FaFolder,
// //   FaArrowLeft,
// // } from "react-icons/fa";
// // import PasswordModal from "../components/PasswordModal";
// // import ConfirmModal from "../components/ConfirmModal";

// // // Composant pour une seule ligne de mot de passe
// // const PasswordRow = ({
// //   password,
// //   onEdit,
// //   onDelete,
// //   onCopy,
// //   onToggleShow,
// //   isVisible,
// // }) => (
// //   <div className="card password-card mb-3">
// //     <div className="card-body">
// //       <div className="password-card-header mb-3">
// //         <div className="password-info">
// //           <h3 className="password-title">{password.title}</h3>
// //           <p className="password-username">{password.username}</p>
// //         </div>
// //         <div className="password-actions">
// //           <button
// //             className="btn btn-sm btn-secondary"
// //             onClick={() => onToggleShow(password._id)}
// //           >
// //             {isVisible ? <FaEyeSlash /> : <FaEye />}
// //           </button>
// //           <button
// //             className="btn btn-sm btn-secondary"
// //             onClick={() => onCopy(password.password)}
// //           >
// //             <FaCopy />
// //           </button>
// //           <button
// //             className="btn btn-sm btn-secondary"
// //             onClick={() => onEdit(password)}
// //           >
// //             <FaEdit />
// //           </button>
// //           <button
// //             className="btn btn-sm btn-danger"
// //             onClick={() => onDelete(password)}
// //           >
// //             <FaTrash />
// //           </button>
// //         </div>
// //       </div>
// //       <div className="password-field">
// //         <div className="password-field-label">Passe:</div>
// //         <div
// //           className={`password-field-value ${
// //             !isVisible ? "password-hidden" : ""
// //           }`}
// //         >
// //           {password.password}
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const GroupDetails = () => {
// //   const { id: groupId } = useParams();
// //   const [group, setGroup] = useState(null);
// //   const [passwordsInGroup, setPasswordsInGroup] = useState([]);
// //   const [availablePasswords, setAvailablePasswords] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // États pour les modales et la visibilité
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// //   const [currentPassword, setCurrentPassword] = useState(null);
// //   const [showPasswordId, setShowPasswordId] = useState(null);

// //   useEffect(() => {
// //     fetchGroupData();
// //   }, [groupId]);

// //   const fetchGroupData = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get(`/api/groups/${groupId}`);
// //       setGroup(res.data);
// //       setPasswordsInGroup(res.data.passwords || []);
// //       setAvailablePasswords(res.data.availablePasswords || []);
// //     } catch (error) {
// //       toast.error("Erreur lors du chargement du groupe.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fonctions de gestion des mots de passe
// //   const copyToClipboard = (text) =>
// //     navigator.clipboard.writeText(text).then(() => toast.success("Copié !"));
// //   const toggleShowPassword = (id) =>
// //     setShowPasswordId((prev) => (prev === id ? null : id));

// //   const openEditModal = (password) => {
// //     setCurrentPassword(password);
// //     setModalOpen(true);
// //   };

// //   const openDeleteModal = (password) => {
// //     setCurrentPassword(password);
// //     setConfirmModalOpen(true);
// //   };

// //   const handleSavePassword = async (passwordData) => {
// //     try {
// //       await api.put(`/api/passwords/${currentPassword._id}`, passwordData);
// //       toast.success("Mot de passe mis à jour.");
// //       fetchGroupData();
// //       setModalOpen(false);
// //     } catch (error) {
// //       toast.error("Erreur lors de la sauvegarde.");
// //     }
// //   };

// //   const handleDeletePassword = async () => {
// //     try {
// //       await api.delete(`/api/passwords/${currentPassword._id}`);
// //       toast.success("Mot de passe supprimé.");
// //       fetchGroupData();
// //       setConfirmModalOpen(false);
// //     } catch (error) {
// //       toast.error("Erreur lors de la suppression.");
// //     }
// //   };

// //   const handleAddPasswordToGroup = async (passwordId) => {
// //     try {
// //       await api.put(`/api/groups/${groupId}/add-password`, { passwordId });
// //       toast.success("Mot de passe ajouté au groupe !");
// //       fetchGroupData(); // Rafraîchit les deux listes
// //     } catch (error) {
// //       toast.error("Impossible d'ajouter le mot de passe.");
// //     }
// //   };

// //   if (loading) return <div className="text-center p-4">Chargement...</div>;

// //   return (
// //     <div>
// //       <Link to="/groups" className="btn btn-secondary mb-4">
// //         <FaArrowLeft /> Retour aux groupes
// //       </Link>

// //       <div className="password-list-header mb-4">
// //         <div className="flex items-center gap-3">
// //           <FaFolder size={40} style={{ color: group?.color }} />
// //           <div>
// //             <h1>{group?.name}</h1>
// //             <p className="subtitle">{group?.description}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Section des mots de passe dans le groupe */}
// //       <div
// //         className="card mb-4"
// //         style={{ borderTop: `3px solid ${group?.color}` }}
// //       >
// //         <div className="card-header">
// //           <h2>Mots de passe dans ce groupe ({passwordsInGroup.length})</h2>
// //         </div>
// //         <div className="card-body">
// //           {passwordsInGroup.length > 0 ? (
// //             passwordsInGroup.map((p) => (
// //               <PasswordRow
// //                 key={p._id}
// //                 password={p}
// //                 onEdit={openEditModal}
// //                 onDelete={openDeleteModal}
// //                 onCopy={copyToClipboard}
// //                 onToggleShow={toggleShowPassword}
// //                 isVisible={showPasswordId === p._id}
// //               />
// //             ))
// //           ) : (
// //             <p>Ce groupe ne contient aucun mot de passe.</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Section pour ajouter des mots de passe existants */}
// //       <div className="card">
// //         <div className="card-header">
// //           <h2>Mots de passe disponibles ({availablePasswords.length})</h2>
// //         </div>
// //         <div className="card-body">
// //           {availablePasswords.length > 0 ? (
// //             <div className="table-container">
// //               <table>
// //                 <thead>
// //                   <tr>
// //                     <th>Titre</th>
// //                     <th>Nom d'utilisateur</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {availablePasswords.map((p) => (
// //                     <tr key={p._id}>
// //                       <td>{p.title}</td>
// //                       <td>{p.username}</td>
// //                       <td>
// //                         <button
// //                           className="btn btn-sm btn-primary"
// //                           onClick={() => handleAddPasswordToGroup(p._id)}
// //                         >
// //                           <FaPlus /> Ajouter
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ) : (
// //             <p>Aucun autre mot de passe n'est disponible pour être ajouté.</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Modales */}
// //       {modalOpen && (
// //         <PasswordModal
// //           password={currentPassword}
// //           onSave={handleSavePassword}
// //           onClose={() => setModalOpen(false)}
// //         />
// //       )}
// //       {confirmModalOpen && (
// //         <ConfirmModal
// //           title="Supprimer le mot de passe"
// //           message={`Voulez-vous vraiment supprimer "${currentPassword?.title}" ? Cette action est irréversible.`}
// //           confirmLabel="Supprimer"
// //           onConfirm={handleDeletePassword}
// //           onCancel={() => setConfirmModalOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default GroupDetails;

// // src/pages/GroupDetails.jsx

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaEyeSlash,
//   FaCopy,
//   FaFolder,
//   FaArrowLeft,
// } from "react-icons/fa";
// import PasswordModal from "../components/PasswordModal";
// import ConfirmModal from "../components/ConfirmModal";

// // Компонент для одной строки пароля
// const PasswordRow = ({
//   password,
//   onEdit,
//   onDelete,
//   onCopy,
//   onToggleShow,
//   isVisible,
// }) => (
//   <div className="card password-card mb-3">
//     <div className="card-body">
//       <div className="password-card-header mb-3">
//         <div className="password-info">
//           <h3 className="password-title">{password.title}</h3>
//           <p className="password-username">{password.username}</p>
//         </div>
//         <div className="password-actions">
//           <button
//             className="btn btn-sm btn-secondary"
//             onClick={() => onToggleShow(password._id)}
//           >
//             {isVisible ? <FaEyeSlash /> : <FaEye />}
//           </button>
//           <button
//             className="btn btn-sm btn-secondary"
//             onClick={() => onCopy(password.password)}
//           >
//             <FaCopy />
//           </button>
//           <button
//             className="btn btn-sm btn-secondary"
//             onClick={() => onEdit(password)}
//           >
//             <FaEdit />
//           </button>
//           <button
//             className="btn btn-sm btn-danger"
//             onClick={() => onDelete(password)}
//           >
//             <FaTrash />
//           </button>
//         </div>
//       </div>
//       <div className="password-field">
//         <div className="password-field-label">Пароль:</div>
//         <div
//           className={`password-field-value ${
//             !isVisible ? "password-hidden" : ""
//           }`}
//         >
//           {password.password}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const GroupDetails = () => {
//   const { id: groupId } = useParams();
//   const [group, setGroup] = useState(null);
//   const [passwordsInGroup, setPasswordsInGroup] = useState([]);
//   const [availablePasswords, setAvailablePasswords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Состояния для модальных окон и видимости
//   const [modalOpen, setModalOpen] = useState(false);
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState(null);
//   const [showPasswordId, setShowPasswordId] = useState(null);

//   useEffect(() => {
//     fetchGroupData();
//   }, [groupId]);

//   const fetchGroupData = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/api/groups/${groupId}`);
//       setGroup(res.data);
//       setPasswordsInGroup(res.data.passwords || []);
//       setAvailablePasswords(res.data.availablePasswords || []);
//     } catch (error) {
//       toast.error("Ошибка при загрузке группы.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Функции управления паролями
//   const copyToClipboard = (text) =>
//     navigator.clipboard
//       .writeText(text)
//       .then(() => toast.success("Скопировано!"));
//   const toggleShowPassword = (id) =>
//     setShowPasswordId((prev) => (prev === id ? null : id));

//   const openEditModal = (password) => {
//     setCurrentPassword(password);
//     setModalOpen(true);
//   };

//   const openDeleteModal = (password) => {
//     setCurrentPassword(password);
//     setConfirmModalOpen(true);
//   };

//   const handleSavePassword = async (passwordData) => {
//     try {
//       await api.put(`/api/passwords/${currentPassword._id}`, passwordData);
//       toast.success("Пароль обновлен.");
//       fetchGroupData();
//       setModalOpen(false);
//     } catch (error) {
//       toast.error("Ошибка при сохранении.");
//     }
//   };

//   const handleDeletePassword = async () => {
//     try {
//       await api.delete(`/api/passwords/${currentPassword._id}`);
//       toast.success("Пароль удален.");
//       fetchGroupData();
//       setConfirmModalOpen(false);
//     } catch (error) {
//       toast.error("Ошибка при удалении.");
//     }
//   };

//   const handleAddPasswordToGroup = async (passwordId) => {
//     try {
//       await api.put(`/api/groups/${groupId}/add-password`, { passwordId });
//       toast.success("Пароль добавлен в группу!");
//       fetchGroupData(); // Обновляет оба списка
//     } catch (error) {
//       toast.error("Невозможно добавить пароль.");
//     }
//   };

//   if (loading) return <div className="text-center p-4">Загрузка...</div>;

//   return (
//     <div>
//       <Link to="/groups" className="btn btn-secondary mb-4">
//         <FaArrowLeft /> Вернуться к группам
//       </Link>

//       <div className="password-list-header mb-4">
//         <div className="flex items-center gap-3">
//           <FaFolder size={40} style={{ color: group?.color }} />
//           <div>
//             <h1>{group?.name}</h1>
//             <p className="subtitle">{group?.description}</p>
//           </div>
//         </div>
//       </div>

//       {/* Секция паролей в группе */}
//       <div
//         className="card mb-4"
//         style={{ borderTop: `3px solid ${group?.color}` }}
//       >
//         <div className="card-header">
//           <h2>Пароли в этой группе ({passwordsInGroup.length})</h2>
//         </div>
//         <div className="card-body">
//           {passwordsInGroup.length > 0 ? (
//             passwordsInGroup.map((p) => (
//               <PasswordRow
//                 key={p._id}
//                 password={p}
//                 onEdit={openEditModal}
//                 onDelete={openDeleteModal}
//                 onCopy={copyToClipboard}
//                 onToggleShow={toggleShowPassword}
//                 isVisible={showPasswordId === p._id}
//               />
//             ))
//           ) : (
//             <p>Эта группа не содержит паролей.</p>
//           )}
//         </div>
//       </div>

//       {/* Секция для добавления существующих паролей */}
//       <div className="card">
//         <div className="card-header">
//           <h2>Доступные пароли ({availablePasswords.length})</h2>
//         </div>
//         <div className="card-body">
//           {availablePasswords.length > 0 ? (
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Название</th>
//                     <th>Имя пользователя</th>
//                     <th>Действие</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {availablePasswords.map((p) => (
//                     <tr key={p._id}>
//                       <td>{p.title}</td>
//                       <td>{p.username}</td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-primary"
//                           onClick={() => handleAddPasswordToGroup(p._id)}
//                         >
//                           <FaPlus /> Добавить
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>Нет других паролей, доступных для добавления.</p>
//           )}
//         </div>
//       </div>

//       {/* Модальные окна */}
//       {modalOpen && (
//         <PasswordModal
//           password={currentPassword}
//           onSave={handleSavePassword}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//       {confirmModalOpen && (
//         <ConfirmModal
//           title="Удалить пароль"
//           message={`Вы действительно хотите удалить "${currentPassword?.title}"? Это действие необратимо.`}
//           confirmLabel="Удалить"
//           onConfirm={handleDeletePassword}
//           onCancel={() => setConfirmModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default GroupDetails;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import PasswordList from "../components/PasswordList1";
import AddPasswordsToGroupModal from "../components/AddPasswordsToGroupModal";

// Предполагается, что у вас есть AuthContext для получения данных о текущем пользователе
// import { useAuth } from '../context/AuthContext';

const GroupDetails = () => {
  const { id } = useParams(); // ID группы из URL
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddPasswordModalOpen, setIsAddPasswordModalOpen] = useState(false);

  // --- ВАЖНО: Получите данные о текущем пользователе из вашего контекста авторизации ---
  // const { user: currentUser } = useAuth();
  // Временное решение для примера. Замените это на реальные данные!
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Не удалось получить данные пользователя");
      }
    };
    fetchMe();
  }, []);
  // -----------------------------------------------------------------------------------

  const fetchGroupDetails = useCallback(async () => {
    try {
      const res = await api.get(`/api/groups/${id}`);
      setGroup(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Ошибка загрузки группы.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGroupDetails();
  }, [fetchGroupDetails]);

  const handlePasswordsAdded = () => {
    setIsAddPasswordModalOpen(false);
    fetchGroupDetails(); // Обновляем данные после добавления
  };

  if (loading || !currentUser) {
    return <div className="container">Загрузка...</div>;
  }

  if (!group) {
    return <div className="container">Группа не найдена.</div>;
  }

  // Определяем, может ли пользователь редактировать группу
  const canEditGroup =
    group.ownerId?._id === currentUser._id || currentUser.role === "admin";

  return (
    <div className="container">
      {isAddPasswordModalOpen && (
        <AddPasswordsToGroupModal
          groupId={id}
          onClose={() => setIsAddPasswordModalOpen(false)}
          onSave={handlePasswordsAdded}
        />
      )}

      <div className="page-header">
        <div>
          <Link to="/groups" className="back-link">
            <FaArrowLeft /> Назад к группам
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span
              className="group-color-indicator"
              style={{ backgroundColor: group.color }}
            ></span>
            <h1>{group.name}</h1>
          </div>
          {group.description && (
            <p className="text-muted">{group.description}</p>
          )}
        </div>

        {/* Кнопка "Добавить пароли" отображается только для владельца или админа */}
        {canEditGroup && (
          <button
            className="btn btn-primary"
            onClick={() => setIsAddPasswordModalOpen(true)}
          >
            <FaPlus /> Добавить пароли
          </button>
        )}
      </div>

      <hr />

      <h3>Пароли в этой группе ({group.passwords.length})</h3>

      <PasswordList
        passwords={group.passwords}
        refreshPasswords={fetchGroupDetails}
      />
    </div>
  );
};

export default GroupDetails;
