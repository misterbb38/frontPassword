// // // // // // src/pages/GroupDetails.jsx

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useParams, Link } from "react-router-dom";
// // // // // import api from "../utils/api";
// // // // // import { toast } from "react-toastify";
// // // // // import {
// // // // //   FaPlus,
// // // // //   FaEdit,
// // // // //   FaTrash,
// // // // //   FaEye,
// // // // //   FaEyeSlash,
// // // // //   FaCopy,
// // // // //   FaFolder,
// // // // //   FaArrowLeft,
// // // // //   FaListUl, // Nouvelle icône
// // // // // } from "react-icons/fa";
// // // // // import PasswordModal from "../components/PasswordModal";
// // // // // import ConfirmModal from "../components/ConfirmModal";
// // // // // // Importez la nouvelle modale
// // // // // import AddPasswordsToGroupModal from "../components/AddPasswordsToGroupModal";

// // // // // const GroupDetails = () => {
// // // // //   const { id } = useParams();
// // // // //   const [group, setGroup] = useState(null);
// // // // //   const [passwords, setPasswords] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // États pour les modales
// // // // //   const [passwordModalOpen, setPasswordModalOpen] = useState(false);
// // // // //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// // // // //   const [addPasswordsModalOpen, setAddPasswordsModalOpen] = useState(false); // État pour la nouvelle modale

// // // // //   const [currentPassword, setCurrentPassword] = useState(null);
// // // // //   const [showPasswordId, setShowPasswordId] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetchGroupDetails();
// // // // //   }, [id]);

// // // // //   const fetchGroupDetails = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await api.get(`/api/groups/${id}`);
// // // // //       setGroup(res.data);
// // // // //       setPasswords(res.data.passwords || []);
// // // // //     } catch (error) {
// // // // //       toast.error("Erreur lors du chargement des détails du groupe.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handlePasswordsAdded = () => {
// // // // //     setAddPasswordsModalOpen(false);
// // // // //     fetchGroupDetails(); // Rafraîchir les données
// // // // //   };

// // // // //   // ... (vos autres fonctions : copyToClipboard, toggleShowPassword, etc. restent identiques)
// // // // //   const openAddModal = () => {
// // // // //     setCurrentPassword(null);
// // // // //     setPasswordModalOpen(true);
// // // // //   };

// // // // //   const openEditModal = (password) => {
// // // // //     setCurrentPassword(password);
// // // // //     setPasswordModalOpen(true);
// // // // //   };

// // // // //   const openDeleteModal = (password) => {
// // // // //     setCurrentPassword(password);
// // // // //     setConfirmModalOpen(true);
// // // // //   };

// // // // //   const handleSavePassword = async (passwordData) => {
// // // // //     try {
// // // // //       const dataToSend = { ...passwordData, groupId: id };
// // // // //       if (currentPassword && currentPassword._id) {
// // // // //         await api.put(`/api/passwords/${currentPassword._id}`, dataToSend);
// // // // //         toast.success("Mot de passe mis à jour.");
// // // // //       } else {
// // // // //         await api.post("/api/passwords", dataToSend);
// // // // //         toast.success("Mot de passe ajouté.");
// // // // //       }
// // // // //       fetchGroupDetails();
// // // // //       setPasswordModalOpen(false);
// // // // //     } catch (error) {
// // // // //       toast.error("Erreur lors de la sauvegarde du mot de passe.");
// // // // //     }
// // // // //   };

// // // // //   const handleDeletePassword = async () => {
// // // // //     try {
// // // // //       if (!currentPassword || !currentPassword._id) return;
// // // // //       await api.delete(`/api/passwords/${currentPassword._id}`);
// // // // //       toast.success("Mot de passe supprimé.");
// // // // //       fetchGroupDetails();
// // // // //       setConfirmModalOpen(false);
// // // // //     } catch (error) {
// // // // //       toast.error("Erreur lors de la suppression du mot de passe.");
// // // // //     }
// // // // //   };

// // // // //   if (loading) return <div className="text-center p-4">Chargement...</div>;
// // // // //   if (!group)
// // // // //     return (
// // // // //       <div className="text-center p-4">Groupe non trouvé ou accès refusé.</div>
// // // // //     );

// // // // //   return (
// // // // //     <div>
// // // // //       <Link to="/groups" className="btn btn-secondary mb-4">
// // // // //         <FaArrowLeft /> Retour aux groupes
// // // // //       </Link>

// // // // //       <div className="password-list-header">
// // // // //         <div className="flex items-center gap-3">
// // // // //           <FaFolder size={40} style={{ color: group.color }} />
// // // // //           <div>
// // // // //             <h1>{group.name}</h1>
// // // // //             <p className="subtitle">
// // // // //               {group.description || "Mots de passe de ce groupe"}
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="flex gap-2">
// // // // //           <button
// // // // //             className="btn btn-secondary"
// // // // //             onClick={() => setAddPasswordsModalOpen(true)}
// // // // //           >
// // // // //             <FaListUl /> Gérer les mots de passe
// // // // //           </button>
// // // // //           <button className="btn btn-primary" onClick={openAddModal}>
// // // // //             <FaPlus /> Créer un mot de passe
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Le reste de la page (la liste des mots de passe) reste identique */}
// // // // //       <div className="card" style={{ borderTop: `3px solid ${group.color}` }}>
// // // // //         {/* ... */}
// // // // //       </div>

// // // // //       {/* Modales */}
// // // // //       {passwordModalOpen && (
// // // // //         <PasswordModal
// // // // //           password={currentPassword || { groupId: id }}
// // // // //           onSave={handleSavePassword}
// // // // //           onClose={() => setPasswordModalOpen(false)}
// // // // //         />
// // // // //       )}

// // // // //       {confirmModalOpen && (
// // // // //         <ConfirmModal
// // // // //           title="Supprimer le mot de passe"
// // // // //           message={`Êtes-vous sûr de vouloir supprimer le mot de passe "${currentPassword?.title}" ?`}
// // // // //           confirmLabel="Supprimer"
// // // // //           onConfirm={handleDeletePassword}
// // // // //           onCancel={() => setConfirmModalOpen(false)}
// // // // //         />
// // // // //       )}

// // // // //       {/* Affichez la nouvelle modale ici */}
// // // // //       {addPasswordsModalOpen && (
// // // // //         <AddPasswordsToGroupModal
// // // // //           groupId={id}
// // // // //           onSave={handlePasswordsAdded}
// // // // //           onClose={() => setAddPasswordsModalOpen(false)}
// // // // //         />
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default GroupDetails;

// // // // // src/pages/GroupDetails.jsx

// // // // import React, { useState, useEffect } from "react";
// // // // import { useParams, Link } from "react-router-dom";
// // // // import api from "../utils/api";
// // // // import { toast } from "react-toastify";
// // // // import {
// // // //   FaPlus,
// // // //   FaEdit,
// // // //   FaTrash,
// // // //   FaEye,
// // // //   FaEyeSlash,
// // // //   FaCopy,
// // // //   FaFolder,
// // // //   FaArrowLeft,
// // // // } from "react-icons/fa";
// // // // import PasswordModal from "../components/PasswordModal";
// // // // import ConfirmModal from "../components/ConfirmModal";

// // // // // Composant pour une seule ligne de mot de passe
// // // // const PasswordRow = ({
// // // //   password,
// // // //   onEdit,
// // // //   onDelete,
// // // //   onCopy,
// // // //   onToggleShow,
// // // //   isVisible,
// // // // }) => (
// // // //   <div className="card password-card mb-3">
// // // //     <div className="card-body">
// // // //       <div className="password-card-header mb-3">
// // // //         <div className="password-info">
// // // //           <h3 className="password-title">{password.title}</h3>
// // // //           <p className="password-username">{password.username}</p>
// // // //         </div>
// // // //         <div className="password-actions">
// // // //           <button
// // // //             className="btn btn-sm btn-secondary"
// // // //             onClick={() => onToggleShow(password._id)}
// // // //           >
// // // //             {isVisible ? <FaEyeSlash /> : <FaEye />}
// // // //           </button>
// // // //           <button
// // // //             className="btn btn-sm btn-secondary"
// // // //             onClick={() => onCopy(password.password)}
// // // //           >
// // // //             <FaCopy />
// // // //           </button>
// // // //           <button
// // // //             className="btn btn-sm btn-secondary"
// // // //             onClick={() => onEdit(password)}
// // // //           >
// // // //             <FaEdit />
// // // //           </button>
// // // //           <button
// // // //             className="btn btn-sm btn-danger"
// // // //             onClick={() => onDelete(password)}
// // // //           >
// // // //             <FaTrash />
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //       <div className="password-field">
// // // //         <div className="password-field-label">Passe:</div>
// // // //         <div
// // // //           className={`password-field-value ${
// // // //             !isVisible ? "password-hidden" : ""
// // // //           }`}
// // // //         >
// // // //           {password.password}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const GroupDetails = () => {
// // // //   const { id: groupId } = useParams();
// // // //   const [group, setGroup] = useState(null);
// // // //   const [passwordsInGroup, setPasswordsInGroup] = useState([]);
// // // //   const [availablePasswords, setAvailablePasswords] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // États pour les modales et la visibilité
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// // // //   const [currentPassword, setCurrentPassword] = useState(null);
// // // //   const [showPasswordId, setShowPasswordId] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchGroupData();
// // // //   }, [groupId]);

// // // //   const fetchGroupData = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api.get(`/api/groups/${groupId}`);
// // // //       setGroup(res.data);
// // // //       setPasswordsInGroup(res.data.passwords || []);
// // // //       setAvailablePasswords(res.data.availablePasswords || []);
// // // //     } catch (error) {
// // // //       toast.error("Erreur lors du chargement du groupe.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Fonctions de gestion des mots de passe
// // // //   const copyToClipboard = (text) =>
// // // //     navigator.clipboard.writeText(text).then(() => toast.success("Copié !"));
// // // //   const toggleShowPassword = (id) =>
// // // //     setShowPasswordId((prev) => (prev === id ? null : id));

// // // //   const openEditModal = (password) => {
// // // //     setCurrentPassword(password);
// // // //     setModalOpen(true);
// // // //   };

// // // //   const openDeleteModal = (password) => {
// // // //     setCurrentPassword(password);
// // // //     setConfirmModalOpen(true);
// // // //   };

// // // //   const handleSavePassword = async (passwordData) => {
// // // //     try {
// // // //       await api.put(`/api/passwords/${currentPassword._id}`, passwordData);
// // // //       toast.success("Mot de passe mis à jour.");
// // // //       fetchGroupData();
// // // //       setModalOpen(false);
// // // //     } catch (error) {
// // // //       toast.error("Erreur lors de la sauvegarde.");
// // // //     }
// // // //   };

// // // //   const handleDeletePassword = async () => {
// // // //     try {
// // // //       await api.delete(`/api/passwords/${currentPassword._id}`);
// // // //       toast.success("Mot de passe supprimé.");
// // // //       fetchGroupData();
// // // //       setConfirmModalOpen(false);
// // // //     } catch (error) {
// // // //       toast.error("Erreur lors de la suppression.");
// // // //     }
// // // //   };

// // // //   const handleAddPasswordToGroup = async (passwordId) => {
// // // //     try {
// // // //       await api.put(`/api/groups/${groupId}/add-password`, { passwordId });
// // // //       toast.success("Mot de passe ajouté au groupe !");
// // // //       fetchGroupData(); // Rafraîchit les deux listes
// // // //     } catch (error) {
// // // //       toast.error("Impossible d'ajouter le mot de passe.");
// // // //     }
// // // //   };

// // // //   if (loading) return <div className="text-center p-4">Chargement...</div>;

// // // //   return (
// // // //     <div>
// // // //       <Link to="/groups" className="btn btn-secondary mb-4">
// // // //         <FaArrowLeft /> Retour aux groupes
// // // //       </Link>

// // // //       <div className="password-list-header mb-4">
// // // //         <div className="flex items-center gap-3">
// // // //           <FaFolder size={40} style={{ color: group?.color }} />
// // // //           <div>
// // // //             <h1>{group?.name}</h1>
// // // //             <p className="subtitle">{group?.description}</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Section des mots de passe dans le groupe */}
// // // //       <div
// // // //         className="card mb-4"
// // // //         style={{ borderTop: `3px solid ${group?.color}` }}
// // // //       >
// // // //         <div className="card-header">
// // // //           <h2>Mots de passe dans ce groupe ({passwordsInGroup.length})</h2>
// // // //         </div>
// // // //         <div className="card-body">
// // // //           {passwordsInGroup.length > 0 ? (
// // // //             passwordsInGroup.map((p) => (
// // // //               <PasswordRow
// // // //                 key={p._id}
// // // //                 password={p}
// // // //                 onEdit={openEditModal}
// // // //                 onDelete={openDeleteModal}
// // // //                 onCopy={copyToClipboard}
// // // //                 onToggleShow={toggleShowPassword}
// // // //                 isVisible={showPasswordId === p._id}
// // // //               />
// // // //             ))
// // // //           ) : (
// // // //             <p>Ce groupe ne contient aucun mot de passe.</p>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Section pour ajouter des mots de passe existants */}
// // // //       <div className="card">
// // // //         <div className="card-header">
// // // //           <h2>Mots de passe disponibles ({availablePasswords.length})</h2>
// // // //         </div>
// // // //         <div className="card-body">
// // // //           {availablePasswords.length > 0 ? (
// // // //             <div className="table-container">
// // // //               <table>
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <th>Titre</th>
// // // //                     <th>Nom d'utilisateur</th>
// // // //                     <th>Action</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {availablePasswords.map((p) => (
// // // //                     <tr key={p._id}>
// // // //                       <td>{p.title}</td>
// // // //                       <td>{p.username}</td>
// // // //                       <td>
// // // //                         <button
// // // //                           className="btn btn-sm btn-primary"
// // // //                           onClick={() => handleAddPasswordToGroup(p._id)}
// // // //                         >
// // // //                           <FaPlus /> Ajouter
// // // //                         </button>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //           ) : (
// // // //             <p>Aucun autre mot de passe n'est disponible pour être ajouté.</p>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Modales */}
// // // //       {modalOpen && (
// // // //         <PasswordModal
// // // //           password={currentPassword}
// // // //           onSave={handleSavePassword}
// // // //           onClose={() => setModalOpen(false)}
// // // //         />
// // // //       )}
// // // //       {confirmModalOpen && (
// // // //         <ConfirmModal
// // // //           title="Supprimer le mot de passe"
// // // //           message={`Voulez-vous vraiment supprimer "${currentPassword?.title}" ? Cette action est irréversible.`}
// // // //           confirmLabel="Supprimer"
// // // //           onConfirm={handleDeletePassword}
// // // //           onCancel={() => setConfirmModalOpen(false)}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default GroupDetails;

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
// // // } from "react-icons/fa";
// // // import PasswordModal from "../components/PasswordModal";
// // // import ConfirmModal from "../components/ConfirmModal";

// // // // Компонент для одной строки пароля
// // // const PasswordRow = ({
// // //   password,
// // //   onEdit,
// // //   onDelete,
// // //   onCopy,
// // //   onToggleShow,
// // //   isVisible,
// // // }) => (
// // //   <div className="card password-card mb-3">
// // //     <div className="card-body">
// // //       <div className="password-card-header mb-3">
// // //         <div className="password-info">
// // //           <h3 className="password-title">{password.title}</h3>
// // //           <p className="password-username">{password.username}</p>
// // //         </div>
// // //         <div className="password-actions">
// // //           <button
// // //             className="btn btn-sm btn-secondary"
// // //             onClick={() => onToggleShow(password._id)}
// // //           >
// // //             {isVisible ? <FaEyeSlash /> : <FaEye />}
// // //           </button>
// // //           <button
// // //             className="btn btn-sm btn-secondary"
// // //             onClick={() => onCopy(password.password)}
// // //           >
// // //             <FaCopy />
// // //           </button>
// // //           <button
// // //             className="btn btn-sm btn-secondary"
// // //             onClick={() => onEdit(password)}
// // //           >
// // //             <FaEdit />
// // //           </button>
// // //           <button
// // //             className="btn btn-sm btn-danger"
// // //             onClick={() => onDelete(password)}
// // //           >
// // //             <FaTrash />
// // //           </button>
// // //         </div>
// // //       </div>
// // //       <div className="password-field">
// // //         <div className="password-field-label">Пароль:</div>
// // //         <div
// // //           className={`password-field-value ${
// // //             !isVisible ? "password-hidden" : ""
// // //           }`}
// // //         >
// // //           {password.password}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const GroupDetails = () => {
// // //   const { id: groupId } = useParams();
// // //   const [group, setGroup] = useState(null);
// // //   const [passwordsInGroup, setPasswordsInGroup] = useState([]);
// // //   const [availablePasswords, setAvailablePasswords] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // Состояния для модальных окон и видимости
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// // //   const [currentPassword, setCurrentPassword] = useState(null);
// // //   const [showPasswordId, setShowPasswordId] = useState(null);

// // //   useEffect(() => {
// // //     fetchGroupData();
// // //   }, [groupId]);

// // //   const fetchGroupData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api.get(`/api/groups/${groupId}`);
// // //       setGroup(res.data);
// // //       setPasswordsInGroup(res.data.passwords || []);
// // //       setAvailablePasswords(res.data.availablePasswords || []);
// // //     } catch (error) {
// // //       toast.error("Ошибка при загрузке группы.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Функции управления паролями
// // //   const copyToClipboard = (text) =>
// // //     navigator.clipboard
// // //       .writeText(text)
// // //       .then(() => toast.success("Скопировано!"));
// // //   const toggleShowPassword = (id) =>
// // //     setShowPasswordId((prev) => (prev === id ? null : id));

// // //   const openEditModal = (password) => {
// // //     setCurrentPassword(password);
// // //     setModalOpen(true);
// // //   };

// // //   const openDeleteModal = (password) => {
// // //     setCurrentPassword(password);
// // //     setConfirmModalOpen(true);
// // //   };

// // //   const handleSavePassword = async (passwordData) => {
// // //     try {
// // //       await api.put(`/api/passwords/${currentPassword._id}`, passwordData);
// // //       toast.success("Пароль обновлен.");
// // //       fetchGroupData();
// // //       setModalOpen(false);
// // //     } catch (error) {
// // //       toast.error("Ошибка при сохранении.");
// // //     }
// // //   };

// // //   const handleDeletePassword = async () => {
// // //     try {
// // //       await api.delete(`/api/passwords/${currentPassword._id}`);
// // //       toast.success("Пароль удален.");
// // //       fetchGroupData();
// // //       setConfirmModalOpen(false);
// // //     } catch (error) {
// // //       toast.error("Ошибка при удалении.");
// // //     }
// // //   };

// // //   const handleAddPasswordToGroup = async (passwordId) => {
// // //     try {
// // //       await api.put(`/api/groups/${groupId}/add-password`, { passwordId });
// // //       toast.success("Пароль добавлен в группу!");
// // //       fetchGroupData(); // Обновляет оба списка
// // //     } catch (error) {
// // //       toast.error("Невозможно добавить пароль.");
// // //     }
// // //   };

// // //   if (loading) return <div className="text-center p-4">Загрузка...</div>;

// // //   return (
// // //     <div>
// // //       <Link to="/groups" className="btn btn-secondary mb-4">
// // //         <FaArrowLeft /> Вернуться к группам
// // //       </Link>

// // //       <div className="password-list-header mb-4">
// // //         <div className="flex items-center gap-3">
// // //           <FaFolder size={40} style={{ color: group?.color }} />
// // //           <div>
// // //             <h1>{group?.name}</h1>
// // //             <p className="subtitle">{group?.description}</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Секция паролей в группе */}
// // //       <div
// // //         className="card mb-4"
// // //         style={{ borderTop: `3px solid ${group?.color}` }}
// // //       >
// // //         <div className="card-header">
// // //           <h2>Пароли в этой группе ({passwordsInGroup.length})</h2>
// // //         </div>
// // //         <div className="card-body">
// // //           {passwordsInGroup.length > 0 ? (
// // //             passwordsInGroup.map((p) => (
// // //               <PasswordRow
// // //                 key={p._id}
// // //                 password={p}
// // //                 onEdit={openEditModal}
// // //                 onDelete={openDeleteModal}
// // //                 onCopy={copyToClipboard}
// // //                 onToggleShow={toggleShowPassword}
// // //                 isVisible={showPasswordId === p._id}
// // //               />
// // //             ))
// // //           ) : (
// // //             <p>Эта группа не содержит паролей.</p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Секция для добавления существующих паролей */}
// // //       <div className="card">
// // //         <div className="card-header">
// // //           <h2>Доступные пароли ({availablePasswords.length})</h2>
// // //         </div>
// // //         <div className="card-body">
// // //           {availablePasswords.length > 0 ? (
// // //             <div className="table-container">
// // //               <table>
// // //                 <thead>
// // //                   <tr>
// // //                     <th>Название</th>
// // //                     <th>Имя пользователя</th>
// // //                     <th>Действие</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {availablePasswords.map((p) => (
// // //                     <tr key={p._id}>
// // //                       <td>{p.title}</td>
// // //                       <td>{p.username}</td>
// // //                       <td>
// // //                         <button
// // //                           className="btn btn-sm btn-primary"
// // //                           onClick={() => handleAddPasswordToGroup(p._id)}
// // //                         >
// // //                           <FaPlus /> Добавить
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           ) : (
// // //             <p>Нет других паролей, доступных для добавления.</p>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Модальные окна */}
// // //       {modalOpen && (
// // //         <PasswordModal
// // //           password={currentPassword}
// // //           onSave={handleSavePassword}
// // //           onClose={() => setModalOpen(false)}
// // //         />
// // //       )}
// // //       {confirmModalOpen && (
// // //         <ConfirmModal
// // //           title="Удалить пароль"
// // //           message={`Вы действительно хотите удалить "${currentPassword?.title}"? Это действие необратимо.`}
// // //           confirmLabel="Удалить"
// // //           onConfirm={handleDeletePassword}
// // //           onCancel={() => setConfirmModalOpen(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default GroupDetails;

// // import React, { useState, useEffect, useCallback } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import api from "../utils/api";
// // import { toast } from "react-toastify";
// // import { FaPlus, FaArrowLeft } from "react-icons/fa";
// // import PasswordList from "../components/PasswordList1";
// // import AddPasswordsToGroupModal from "../components/AddPasswordsToGroupModal";

// // // Предполагается, что у вас есть AuthContext для получения данных о текущем пользователе
// // // import { useAuth } from '../context/AuthContext';

// // const GroupDetails = () => {
// //   const { id } = useParams(); // ID группы из URL
// //   const [group, setGroup] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [isAddPasswordModalOpen, setIsAddPasswordModalOpen] = useState(false);

// //   // --- ВАЖНО: Получите данные о текущем пользователе из вашего контекста авторизации ---
// //   // const { user: currentUser } = useAuth();
// //   // Временное решение для примера. Замените это на реальные данные!
// //   const [currentUser, setCurrentUser] = useState(null);
// //   useEffect(() => {
// //     const fetchMe = async () => {
// //       try {
// //         const res = await api.get("/api/auth/me");
// //         setCurrentUser(res.data);
// //       } catch (error) {
// //         console.error("Не удалось получить данные пользователя");
// //       }
// //     };
// //     fetchMe();
// //   }, []);
// //   // -----------------------------------------------------------------------------------

// //   const fetchGroupDetails = useCallback(async () => {
// //     try {
// //       const res = await api.get(`/api/groups/${id}`);
// //       setGroup(res.data);
// //     } catch (error) {
// //       toast.error(error.response?.data?.msg || "Ошибка загрузки группы.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [id]);

// //   useEffect(() => {
// //     fetchGroupDetails();
// //   }, [fetchGroupDetails]);

// //   const handlePasswordsAdded = () => {
// //     setIsAddPasswordModalOpen(false);
// //     fetchGroupDetails(); // Обновляем данные после добавления
// //   };

// //   if (loading || !currentUser) {
// //     return <div className="container">Загрузка...</div>;
// //   }

// //   if (!group) {
// //     return <div className="container">Группа не найдена.</div>;
// //   }

// //   // Определяем, может ли пользователь редактировать группу
// //   const canEditGroup =
// //     group.ownerId?._id === currentUser._id || currentUser.role === "admin";

// //   return (
// //     <div className="container">
// //       {isAddPasswordModalOpen && (
// //         <AddPasswordsToGroupModal
// //           groupId={id}
// //           onClose={() => setIsAddPasswordModalOpen(false)}
// //           onSave={handlePasswordsAdded}
// //         />
// //       )}

// //       <div className="page-header">
// //         <div>
// //           <Link to="/groups" className="back-link">
// //             <FaArrowLeft /> Назад к группам
// //           </Link>
// //           <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
// //             <span
// //               className="group-color-indicator"
// //               style={{ backgroundColor: group.color }}
// //             ></span>
// //             <h1>{group.name}</h1>
// //           </div>
// //           {group.description && (
// //             <p className="text-muted">{group.description}</p>
// //           )}
// //         </div>

// //         {/* Кнопка "Добавить пароли" отображается только для владельца или админа */}
// //         {canEditGroup && (
// //           <button
// //             className="btn btn-primary"
// //             onClick={() => setIsAddPasswordModalOpen(true)}
// //           >
// //             <FaPlus /> Добавить пароли
// //           </button>
// //         )}
// //       </div>

// //       <hr />

// //       <h3>Пароли в этой группе ({group.passwords.length})</h3>

// //       <PasswordList
// //         passwords={group.passwords}
// //         refreshPasswords={fetchGroupDetails}
// //       />
// //     </div>
// //   );
// // };

// // export default GroupDetails;

// import React, { useEffect, useCallback, useReducer } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import {
//   FaPlus,
//   FaArrowLeft,
//   FaSpinner,
//   FaExclamationTriangle,
// } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// // Les seuls composants de modale/liste importés ici
// import PasswordList from "../components/PasswordList1";
// import AddPasswordsToGroupModal from "../components/AddPasswordsToGroupModal";

// // Le reducer ne gère que l'état de la page, y compris la modale "Ajouter"
// const initialState = {
//   group: null,
//   loading: true,
//   error: null,
//   isAddModalOpen: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "FETCH_START":
//       return { ...state, loading: true, error: null };
//     case "FETCH_SUCCESS":
//       return { ...state, loading: false, group: action.payload };
//     case "FETCH_ERROR":
//       return { ...state, loading: false, error: action.payload };
//     case "TOGGLE_ADD_MODAL":
//       return { ...state, isAddModalOpen: !state.isAddModalOpen };
//     default:
//       throw new Error();
//   }
// }

// const GroupDetails = () => {
//   const { id } = useParams();
//   const { user: currentUser } = useAuth();
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const fetchGroupDetails = useCallback(async () => {
//     dispatch({ type: "FETCH_START" });
//     try {
//       const res = await api.get(`/api/groups/${id}`);
//       dispatch({ type: "FETCH_SUCCESS", payload: res.data });
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.msg || "Erreur de chargement du groupe.";
//       dispatch({ type: "FETCH_ERROR", payload: errorMessage });
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchGroupDetails();
//   }, [fetchGroupDetails]);

//   const handlePasswordsAdded = () => {
//     dispatch({ type: "TOGGLE_ADD_MODAL" });
//     fetchGroupDetails();
//   };

//   if (state.loading)
//     return (
//       <div className="container text-center">
//         <FaSpinner className="spinner" />
//       </div>
//     );
//   if (state.error)
//     return (
//       <div className="container text-center">
//         <FaExclamationTriangle size={30} />
//         <p>Erreur: {state.error}</p>
//       </div>
//     );

//   const { group } = state;
//   const canEditGroup =
//     currentUser &&
//     (group.ownerId?._id === currentUser._id || currentUser.role === "admin");

//   return (
//     <div className="container">
//       {/* Cette page ne gère que la modale d'AJOUT, pas de suppression */}
//       {state.isAddModalOpen && (
//         <AddPasswordsToGroupModal
//           groupId={id}
//           onClose={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
//           onSave={handlePasswordsAdded}
//         />
//       )}

//       <div className="page-header">
//         <div>
//           <Link to="/groups" className="back-link">
//             <FaArrowLeft /> Назад к группам
//           </Link>
//           <h1>{group.name}</h1>
//         </div>
//         {canEditGroup && (
//           <button
//             className="btn btn-primary"
//             onClick={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
//           >
//             <FaPlus /> Добавить пароли
//           </button>
//         )}
//       </div>
//       <hr />
//       <h3>Пароли в этой группе ({group.passwords?.length || 0})</h3>

//       {/* On passe la liste des mots de passe au composant enfant */}
//       <PasswordList
//         passwords={group.passwords || []}
//         refreshPasswords={fetchGroupDetails}
//       />
//     </div>
//   );
// };

// export default GroupDetails;

import React, { useEffect, useCallback, useReducer, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaFolder,
  FaUsers,
  FaKey,
  FaEdit,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import PasswordList from "../components/PasswordList1";
import AddPasswordsToGroupModal from "../components/AddPasswordsToGroupModal";
import GroupModal from "../components/GroupModal";
import PropTypes from "prop-types";

// État initial du reducer
const initialState = {
  group: null,
  loading: true,
  error: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  actionLoading: false,
};

// Reducer pour gérer l'état complexe
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, group: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "TOGGLE_ADD_MODAL":
      return { ...state, isAddModalOpen: !state.isAddModalOpen };
    case "TOGGLE_EDIT_MODAL":
      return { ...state, isEditModalOpen: !state.isEditModalOpen };
    case "SET_ACTION_LOADING":
      return { ...state, actionLoading: action.payload };
    case "RESET_ERROR":
      return { ...state, error: null };
    default:
      throw new Error(`Action non gérée: ${action.type}`);
  }
}

const GroupDetails = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Charger les détails du groupe
  const fetchGroupDetails = useCallback(async () => {
    if (!id) {
      dispatch({ type: "FETCH_ERROR", payload: "ID группы не указан" });
      return;
    }

    dispatch({ type: "FETCH_START" });
    try {
      const res = await api.get(`/api/groups/${id}`);
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch (error) {
      console.error("Ошибка при загрузке группы:", error);
      const errorMessage =
        error.response?.status === 404
          ? "Группа не найдена"
          : error.response?.data?.msg || "Ошибка при загрузке группы";
      dispatch({ type: "FETCH_ERROR", payload: errorMessage });
    }
  }, [id]);

  useEffect(() => {
    fetchGroupDetails();
  }, [fetchGroupDetails]);

  // Gérer l'ajout de mots de passe
  const handlePasswordsAdded = () => {
    dispatch({ type: "TOGGLE_ADD_MODAL" });
    fetchGroupDetails();
    toast.success("Пароли успешно добавлены в группу!");
  };

  // Gérer l'édition du groupe
  const handleGroupEdited = async (groupData) => {
    dispatch({ type: "SET_ACTION_LOADING", payload: true });
    try {
      await api.put(`/api/groups/${id}`, groupData);
      dispatch({ type: "TOGGLE_EDIT_MODAL" });
      await fetchGroupDetails();
      toast.success("Группа успешно обновлена!");
    } catch (error) {
      console.error("Ошибка при обновлении группы:", error);
      const errorMessage =
        error.response?.data?.msg || "Ошибка при обновлении группы";
      toast.error(errorMessage);
    } finally {
      dispatch({ type: "SET_ACTION_LOADING", payload: false });
    }
  };

  // Gérer l'édition de mot de passe (placeholder)
  const handleEditPassword = (password) => {
    toast.info(
      `Редактирование пароля "${password.title}" - функция в разработке`
    );
  };

  // Retry en cas d'erreur
  const handleRetry = () => {
    dispatch({ type: "RESET_ERROR" });
    fetchGroupDetails();
  };

  // Affichage du loading
  if (state.loading) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "3rem 0" }}
      >
        <FaSpinner
          size={32}
          style={{
            animation: "spin 1s linear infinite",
            marginBottom: "1rem",
            color: "#007bff",
          }}
        />
        <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
          Загрузка детали группы...
        </p>
      </div>
    );
  }

  // Affichage d'erreur
  if (state.error) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "3rem 0" }}
      >
        <FaExclamationTriangle
          size={40}
          color="#dc3545"
          style={{ marginBottom: "1rem" }}
        />
        <h3 style={{ color: "#dc3545", marginBottom: "0.5rem" }}>Ошибка</h3>
        <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
          {state.error}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={handleRetry}>
            Попробовать снова
          </button>
          <Link to="/groups" className="btn btn-secondary">
            Вернуться к группам
          </Link>
        </div>
      </div>
    );
  }

  const { group } = state;

  // Vérifier les permissions
  const canEditGroup =
    currentUser &&
    (group.ownerId?._id === currentUser._id || currentUser.role === "admin");

  return (
    <div className="container">
      {/* Modal d'ajout de mots de passe */}
      {state.isAddModalOpen && (
        <AddPasswordsToGroupModal
          groupId={id}
          onClose={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
          onSave={handlePasswordsAdded}
        />
      )}

      {/* Modal d'édition du groupe */}
      {state.isEditModalOpen && (
        <GroupModal
          group={group}
          onClose={() => dispatch({ type: "TOGGLE_EDIT_MODAL" })}
          onSave={handleGroupEdited}
        />
      )}

      {/* En-tête de la page */}
      <div
        className="page-header"
        style={{
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "2px solid #e9ecef",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Link
            to="/groups"
            className="back-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#007bff",
              textDecoration: "none",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            <FaArrowLeft /> Назад к группам
          </Link>

          {/* Titre avec informations du groupe */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "2rem",
                backgroundColor: group.color,
                borderRadius: "2px",
              }}
            />
            <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "600" }}>
              {group.name}
            </h1>
          </div>

          {/* Description et métadonnées */}
          {group.description && (
            <p
              style={{
                color: "#6c757d",
                fontSize: "1.1rem",
                margin: "0.5rem 0",
                lineHeight: 1.4,
              }}
            >
              {group.description}
            </p>
          )}

          {/* Informations sur le partage et propriétaire */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              fontSize: "0.9rem",
              color: "#6c757d",
              marginTop: "1rem",
            }}
          >
            {group.sharedWith && group.sharedWith.length > 0 && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <FaUsers style={{ color: group.color }} />
                <span>
                  Поделено с {group.sharedWith.length} пользователя(ми)
                </span>
              </div>
            )}
            <div>
              <strong>
                {group.ownerId?._id === currentUser._id
                  ? "Вы владелец"
                  : "Поделился с вами"}
              </strong>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        {canEditGroup && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-secondary"
              onClick={() => dispatch({ type: "TOGGLE_EDIT_MODAL" })}
              disabled={state.actionLoading}
            >
              <FaEdit style={{ marginRight: "0.5rem" }} />
              Редактировать группу
            </button>
            <button
              className="btn btn-primary"
              onClick={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
              disabled={state.actionLoading}
            >
              <FaPlus style={{ marginRight: "0.5rem" }} />
              Добавить пароли
            </button>
          </div>
        )}
      </div>

      {/* Section des mots de passe */}
      <div
        className="passwords-section"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <FaKey style={{ color: group.color, fontSize: "1.2rem" }} />
          <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
            Пароли в этой группе ({group.passwords?.length || 0})
          </h3>
        </div>

        {/* Liste des mots de passe */}
        <PasswordList
          passwords={group.passwords || []}
          refreshPasswords={fetchGroupDetails}
          onEditPassword={handleEditPassword}
        />

        {/* Message si aucun mot de passe */}
        {(!group.passwords || group.passwords.length === 0) && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 0",
              color: "#6c757d",
            }}
          >
            <FaFolder
              size={48}
              color="#e9ecef"
              style={{ marginBottom: "1rem" }}
            />
            <h4 style={{ marginBottom: "0.5rem" }}>Группа пуста</h4>
            <p style={{ marginBottom: "1.5rem" }}>
              В этой группе пока нет паролей.
            </p>
            {canEditGroup && (
              <button
                className="btn btn-primary"
                onClick={() => dispatch({ type: "TOGGLE_ADD_MODAL" })}
              >
                <FaPlus style={{ marginRight: "0.5rem" }} />
                Добавить первый пароль
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
