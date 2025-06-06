// // // // src/pages/Groups.jsx
// // // import React, { useState, useEffect } from "react";
// // // import api from "../utils/api";
// // // import { toast } from "react-toastify";
// // // import {
// // //   FaPlus,
// // //   FaEdit,
// // //   FaTrash,
// // //   FaUsers,
// // //   FaKey,
// // //   FaFolder,
// // // } from "react-icons/fa";
// // // import { useAuth } from "../context/AuthContext";
// // // import { Link } from "react-router-dom";

// // // // Composants
// // // import GroupModal from "../components/GroupModal";
// // // import ConfirmModal from "../components/ConfirmModal";

// // // const Groups = () => {
// // //   const { user } = useAuth();
// // //   const [groups, setGroups] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState("");

// // //   // États pour les modales
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// // //   const [currentGroup, setCurrentGroup] = useState(null);

// // //   useEffect(() => {
// // //     fetchGroups();
// // //   }, []);

// // //   // Récupérer tous les groupes
// // //   const fetchGroups = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api.get("/api/groups");
// // //       setGroups(res.data);
// // //     } catch (error) {
// // //       toast.error("Erreur lors du chargement des groupes");
// // //       console.error(error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Filtrer les groupes selon la recherche
// // //   const filteredGroups = groups.filter(
// // //     (group) =>
// // //       group.name.toLowerCase().includes(search.toLowerCase()) ||
// // //       group.description.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   // Ouvrir la modale pour ajouter un groupe
// // //   const openAddModal = () => {
// // //     setCurrentGroup(null);
// // //     setModalOpen(true);
// // //   };

// // //   // Ouvrir la modale pour modifier un groupe
// // //   const openEditModal = (group) => {
// // //     setCurrentGroup(group);
// // //     setModalOpen(true);
// // //   };

// // //   // Ouvrir la modale de confirmation pour supprimer un groupe
// // //   const openDeleteModal = (group) => {
// // //     setCurrentGroup(group);
// // //     setConfirmModalOpen(true);
// // //   };

// // //   // Gérer l'ajout ou la modification d'un groupe
// // //   const handleSaveGroup = async (groupData) => {
// // //     try {
// // //       if (currentGroup) {
// // //         // Mise à jour
// // //         await api.put(`/api/groups/${currentGroup._id}`, groupData);
// // //         toast.success("Groupe mis à jour avec succès");
// // //       } else {
// // //         // Ajout
// // //         await api.post("/api/groups", groupData);
// // //         toast.success("Groupe créé avec succès");
// // //       }

// // //       fetchGroups();
// // //       setModalOpen(false);
// // //     } catch (error) {
// // //       toast.error("Erreur lors de la sauvegarde du groupe");
// // //       console.error(error);
// // //     }
// // //   };

// // //   // Gérer la suppression d'un groupe
// // //   const handleDeleteGroup = async () => {
// // //     try {
// // //       await api.delete(`/api/groups/${currentGroup._id}`);
// // //       toast.success("Groupe supprimé avec succès");
// // //       fetchGroups();
// // //       setConfirmModalOpen(false);
// // //     } catch (error) {
// // //       toast.error("Erreur lors de la suppression du groupe");
// // //       console.error(error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <div className="password-list-header">
// // //         <div>
// // //           <h1>Gestion des Groupes</h1>
// // //           <p className="subtitle">Organisez vos mots de passe par catégories</p>
// // //         </div>
// // //         <button className="btn btn-primary" onClick={openAddModal}>
// // //           <FaPlus /> Créer un groupe
// // //         </button>
// // //       </div>

// // //       <div className="card">
// // //         <div className="card-header">
// // //           <h2>Vos groupes</h2>
// // //         </div>
// // //         <div className="card-body">
// // //           <div className="form-group">
// // //             <input
// // //               type="text"
// // //               placeholder="Rechercher un groupe..."
// // //               value={search}
// // //               onChange={(e) => setSearch(e.target.value)}
// // //               className="w-full"
// // //             />
// // //           </div>

// // //           {loading ? (
// // //             <div className="text-center py-4">Chargement...</div>
// // //           ) : filteredGroups.length > 0 ? (
// // //             <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
// // //               {filteredGroups.map((group) => (
// // //                 <div
// // //                   key={group._id}
// // //                   className="card"
// // //                   style={{
// // //                     flex: "1",
// // //                     minWidth: "300px",
// // //                     borderLeft: `4px solid ${group.color}`,
// // //                     marginBottom: "1rem",
// // //                   }}
// // //                 >
// // //                   <div
// // //                     className="card-header"
// // //                     style={{ backgroundColor: `${group.color}15` }}
// // //                   >
// // //                     <div className="flex items-center justify-between">
// // //                       <div className="flex items-center gap-2">
// // //                         <FaFolder style={{ color: group.color }} />
// // //                         <h3 style={{ margin: 0 }}>{group.name}</h3>
// // //                       </div>
// // //                       <div className="flex gap-1">
// // //                         <button
// // //                           className="btn btn-sm btn-secondary"
// // //                           onClick={() => openEditModal(group)}
// // //                           title="Modifier"
// // //                         >
// // //                           <FaEdit />
// // //                         </button>
// // //                         <button
// // //                           className="btn btn-sm btn-danger"
// // //                           onClick={() => openDeleteModal(group)}
// // //                           title="Supprimer"
// // //                         >
// // //                           <FaTrash />
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="card-body">
// // //                     {group.description && (
// // //                       <p style={{ marginBottom: "1rem", color: "#6c757d" }}>
// // //                         {group.description}
// // //                       </p>
// // //                     )}

// // //                     <div className="flex items-center justify-between mb-2">
// // //                       <div className="flex items-center gap-1">
// // //                         <FaKey style={{ color: group.color }} />
// // //                         <span>{group.passwordCount || 0} mot(s) de passe</span>
// // //                       </div>
// // //                     </div>

// // //                     {group.sharedWith && group.sharedWith.length > 0 && (
// // //                       <div className="flex items-center gap-1 mb-2">
// // //                         <FaUsers style={{ color: group.color }} />
// // //                         <small style={{ color: "#6c757d" }}>
// // //                           Partagé avec {group.sharedWith.length} utilisateur(s)
// // //                         </small>
// // //                       </div>
// // //                     )}

// // //                     <div className="mt-3">
// // //                       <small style={{ color: "#6c757d" }}>
// // //                         {group.ownerId === user._id
// // //                           ? "Vous êtes propriétaire"
// // //                           : "Partagé avec vous"}
// // //                       </small>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="text-center py-4">
// // //               <FaFolder size={40} color="#ccc" />
// // //               <p className="mt-2">Aucun groupe trouvé</p>
// // //               <button className="btn btn-primary mt-3" onClick={openAddModal}>
// // //                 <FaPlus /> Créer votre premier groupe
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Modale d'ajout/modification de groupe */}
// // //       {modalOpen && (
// // //         <GroupModal
// // //           group={currentGroup}
// // //           onSave={handleSaveGroup}
// // //           onClose={() => setModalOpen(false)}
// // //         />
// // //       )}

// // //       {/* Modale de confirmation de suppression */}
// // //       {confirmModalOpen && (
// // //         <ConfirmModal
// // //           title="Supprimer le groupe"
// // //           message={`Êtes-vous sûr de vouloir supprimer le groupe "${currentGroup?.name}" ? Les mots de passe du groupe ne seront pas supprimés mais ne feront plus partie d'aucun groupe.`}
// // //           confirmLabel="Supprimer"
// // //           onConfirm={handleDeleteGroup}
// // //           onCancel={() => setConfirmModalOpen(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Groups;

// // // src/pages/Groups.jsx

// // import React, { useState, useEffect } from "react";
// // import api from "../utils/api";
// // import { toast } from "react-toastify";
// // import {
// //   FaPlus,
// //   FaEdit,
// //   FaTrash,
// //   FaUsers,
// //   FaKey,
// //   FaFolder,
// // } from "react-icons/fa";
// // import { useAuth } from "../context/AuthContext";
// // import { Link } from "react-router-dom";
// // import GroupModal from "../components/GroupModal";
// // import ConfirmModal from "../components/ConfirmModal";

// // const Groups = () => {
// //   const { user } = useAuth();
// //   const [groups, setGroups] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// //   const [currentGroup, setCurrentGroup] = useState(null);

// //   useEffect(() => {
// //     fetchGroups();
// //   }, []);

// //   const fetchGroups = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get("/api/groups");
// //       setGroups(res.data);
// //     } catch (error) {
// //       toast.error("Erreur lors du chargement des groupes");
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredGroups = groups.filter(
// //     (group) =>
// //       group.name.toLowerCase().includes(search.toLowerCase()) ||
// //       (group.description &&
// //         group.description.toLowerCase().includes(search.toLowerCase()))
// //   );

// //   const openAddModal = () => {
// //     setCurrentGroup(null);
// //     setModalOpen(true);
// //   };

// //   const openEditModal = (e, group) => {
// //     e.preventDefault(); // Empêche la navigation lors du clic sur le bouton
// //     setCurrentGroup(group);
// //     setModalOpen(true);
// //   };

// //   const openDeleteModal = (e, group) => {
// //     e.preventDefault(); // Empêche la navigation
// //     setCurrentGroup(group);
// //     setConfirmModalOpen(true);
// //   };

// //   const handleSaveGroup = async (groupData) => {
// //     try {
// //       if (currentGroup) {
// //         await api.put(`/api/groups/${currentGroup._id}`, groupData);
// //         toast.success("Groupe mis à jour avec succès");
// //       } else {
// //         await api.post("/api/groups", groupData);
// //         toast.success("Groupe créé avec succès");
// //       }
// //       fetchGroups();
// //       setModalOpen(false);
// //     } catch (error) {
// //       toast.error("Erreur lors de la sauvegarde du groupe");
// //       console.error(error);
// //     }
// //   };

// //   const handleDeleteGroup = async () => {
// //     try {
// //       await api.delete(`/api/groups/${currentGroup._id}`);
// //       toast.success("Groupe supprimé avec succès");
// //       fetchGroups();
// //       setConfirmModalOpen(false);
// //     } catch (error) {
// //       toast.error("Erreur lors de la suppression du groupe");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="password-list-header">
// //         <div>
// //           <h1>Gestion des Groupes</h1>
// //           <p className="subtitle">Organisez vos mots de passe par catégories</p>
// //         </div>
// //         <button className="btn btn-primary" onClick={openAddModal}>
// //           <FaPlus /> Créer un groupe
// //         </button>
// //       </div>

// //       <div className="card">
// //         <div className="card-header">
// //           <h2>Vos groupes</h2>
// //         </div>
// //         <div className="card-body">
// //           <div className="form-group">
// //             <input
// //               type="text"
// //               placeholder="Rechercher un groupe..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="w-full"
// //             />
// //           </div>

// //           {loading ? (
// //             <div className="text-center py-4">Chargement...</div>
// //           ) : filteredGroups.length > 0 ? (
// //             <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
// //               {filteredGroups.map((group) => (
// //                 <Link
// //                   to={`/groups/${group._id}`}
// //                   key={group._id}
// //                   style={{
// //                     textDecoration: "none",
// //                     color: "inherit",
// //                     flex: "1",
// //                     minWidth: "300px",
// //                   }}
// //                 >
// //                   <div
// //                     className="card"
// //                     style={{
// //                       borderTop: `3px solid ${group.color}`,
// //                       height: "100%",
// //                       transition: "transform 0.2s",
// //                       cursor: "pointer",
// //                     }}
// //                     onMouseOver={(e) =>
// //                       (e.currentTarget.style.transform = "translateY(-5px)")
// //                     }
// //                     onMouseOut={(e) =>
// //                       (e.currentTarget.style.transform = "translateY(0)")
// //                     }
// //                   >
// //                     <div
// //                       className="card-header"
// //                       style={{ backgroundColor: `${group.color}1A` }}
// //                     >
// //                       <div className="flex items-center justify-between w-full">
// //                         <div className="flex items-center gap-2">
// //                           <FaFolder style={{ color: group.color }} />
// //                           <h3 style={{ margin: 0, color: "#333" }}>
// //                             {group.name}
// //                           </h3>
// //                         </div>
// //                         <div className="flex gap-1">
// //                           <button
// //                             className="btn btn-sm btn-secondary"
// //                             onClick={(e) => openEditModal(e, group)}
// //                             title="Modifier"
// //                           >
// //                             <FaEdit />
// //                           </button>
// //                           <button
// //                             className="btn btn-sm btn-danger"
// //                             onClick={(e) => openDeleteModal(e, group)}
// //                             title="Supprimer"
// //                           >
// //                             <FaTrash />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="card-body">
// //                       {group.description && (
// //                         <p className="mb-3" style={{ color: "#6c757d" }}>
// //                           {group.description}
// //                         </p>
// //                       )}
// //                       <div className="flex items-center justify-between text-sm">
// //                         <div className="flex items-center gap-2">
// //                           <FaKey style={{ color: group.color }} />
// //                           <span>
// //                             {group.passwordCount || 0} mot(s) de passe
// //                           </span>
// //                         </div>
// //                         {group.sharedWith && group.sharedWith.length > 0 && (
// //                           <div className="flex items-center gap-2">
// //                             <FaUsers style={{ color: group.color }} />
// //                             <span>
// //                               Partagé avec {group.sharedWith.length}{" "}
// //                               utilisateur(s)
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="mt-3">
// //                         <small style={{ color: "#6c757d" }}>
// //                           {group.ownerId === user._id
// //                             ? "Vous êtes propriétaire"
// //                             : "Partagé avec vous"}
// //                         </small>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-4">
// //               <FaFolder size={40} color="#ccc" />
// //               <p className="mt-2">Aucun groupe trouvé.</p>
// //               <button className="btn btn-primary mt-3" onClick={openAddModal}>
// //                 <FaPlus /> Créer votre premier groupe
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {modalOpen && (
// //         <GroupModal
// //           group={currentGroup}
// //           onSave={handleSaveGroup}
// //           onClose={() => setModalOpen(false)}
// //         />
// //       )}

// //       {confirmModalOpen && (
// //         <ConfirmModal
// //           title="Supprimer le groupe"
// //           message={`Êtes-vous sûr de vouloir supprimer le groupe "${currentGroup?.name}" ? Les mots de passe du groupe ne seront pas supprimés mais ne feront plus partie d'aucun groupe.`}
// //           confirmLabel="Supprimer"
// //           onConfirm={handleDeleteGroup}
// //           onCancel={() => setConfirmModalOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Groups;

// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaUsers,
//   FaKey,
//   FaFolder,
// } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import GroupModal from "../components/GroupModal";
// import ConfirmModal from "../components/ConfirmModal";

// const Groups = () => {
//   const { user } = useAuth();
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [currentGroup, setCurrentGroup] = useState(null);

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const fetchGroups = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/api/groups");
//       setGroups(res.data);
//     } catch (error) {
//       toast.error("Ошибка при загрузке групп");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredGroups = groups.filter(
//     (group) =>
//       group.name.toLowerCase().includes(search.toLowerCase()) ||
//       (group.description &&
//         group.description.toLowerCase().includes(search.toLowerCase()))
//   );

//   const openAddModal = () => {
//     setCurrentGroup(null);
//     setModalOpen(true);
//   };

//   const openEditModal = (e, group) => {
//     e.preventDefault(); // Предотвращает навигацию при клике на кнопку
//     setCurrentGroup(group);
//     setModalOpen(true);
//   };

//   const openDeleteModal = (e, group) => {
//     e.preventDefault(); // Предотвращает навигацию
//     setCurrentGroup(group);
//     setConfirmModalOpen(true);
//   };

//   const handleSaveGroup = async (groupData) => {
//     try {
//       if (currentGroup) {
//         await api.put(`/api/groups/${currentGroup._id}`, groupData);
//         toast.success("Группа успешно обновлена");
//       } else {
//         await api.post("/api/groups", groupData);
//         toast.success("Группа успешно создана");
//       }
//       fetchGroups();
//       setModalOpen(false);
//     } catch (error) {
//       toast.error("Ошибка при сохранении группы");
//       console.error(error);
//     }
//   };

//   const handleDeleteGroup = async () => {
//     try {
//       await api.delete(`/api/groups/${currentGroup._id}`);
//       toast.success("Группа успешно удалена");
//       fetchGroups();
//       setConfirmModalOpen(false);
//     } catch (error) {
//       toast.error("Ошибка при удалении группы");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="password-list-header">
//         <div>
//           <h1>Управление группами</h1>
//           <p className="subtitle">Организуйте свои пароли по категориям</p>
//         </div>
//         <button className="btn btn-primary" onClick={openAddModal}>
//           <FaPlus /> Создать группу
//         </button>
//       </div>

//       <div className="card">
//         <div className="card-header">
//           <h2>Ваши группы</h2>
//         </div>
//         <div className="card-body">
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Поиск группы..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full"
//             />
//           </div>

//           {loading ? (
//             <div className="text-center py-4">Загрузка...</div>
//           ) : filteredGroups.length > 0 ? (
//             <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
//               {filteredGroups.map((group) => (
//                 <Link
//                   to={`/groups/${group._id}`}
//                   key={group._id}
//                   style={{
//                     textDecoration: "none",
//                     color: "inherit",
//                     flex: "1",
//                     minWidth: "300px",
//                   }}
//                 >
//                   <div
//                     className="card"
//                     style={{
//                       borderTop: `3px solid ${group.color}`,
//                       height: "100%",
//                       transition: "transform 0.2s",
//                       cursor: "pointer",
//                     }}
//                     onMouseOver={(e) =>
//                       (e.currentTarget.style.transform = "translateY(-5px)")
//                     }
//                     onMouseOut={(e) =>
//                       (e.currentTarget.style.transform = "translateY(0)")
//                     }
//                   >
//                     <div
//                       className="card-header"
//                       style={{ backgroundColor: `${group.color}1A` }}
//                     >
//                       <div className="flex items-center justify-between w-full">
//                         <div className="flex items-center gap-2">
//                           <FaFolder style={{ color: group.color }} />
//                           <h3 style={{ margin: 0, color: "#333" }}>
//                             {group.name}
//                           </h3>
//                         </div>
//                         <div className="flex gap-1">
//                           <button
//                             className="btn btn-sm btn-secondary"
//                             onClick={(e) => openEditModal(e, group)}
//                             title="Изменить"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={(e) => openDeleteModal(e, group)}
//                             title="Удалить"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body">
//                       {group.description && (
//                         <p className="mb-3" style={{ color: "#6c757d" }}>
//                           {group.description}
//                         </p>
//                       )}
//                       <div className="flex items-center justify-between text-sm">
//                         <div className="flex items-center gap-2">
//                           <FaKey style={{ color: group.color }} />
//                           <span>{group.passwordCount || 0} пароль(ей)</span>
//                         </div>
//                         {group.sharedWith && group.sharedWith.length > 0 && (
//                           <div className="flex items-center gap-2">
//                             <FaUsers style={{ color: group.color }} />
//                             <span>
//                               Поделиться с {group.sharedWith.length}{" "}
//                               пользователя(ми)
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="mt-3">
//                         <small style={{ color: "#6c757d" }}>
//                           {group.ownerId === user._id
//                             ? "Вы владелец"
//                             : "Поделился с вами"}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-4">
//               <FaFolder size={40} color="#ccc" />
//               <p className="mt-2">Группы не найдены.</p>
//               <button className="btn btn-primary mt-3" onClick={openAddModal}>
//                 <FaPlus /> Создать вашу первую группу
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {modalOpen && (
//         <GroupModal
//           group={currentGroup}
//           onSave={handleSaveGroup}
//           onClose={() => setModalOpen(false)}
//         />
//       )}

//       {confirmModalOpen && (
//         <ConfirmModal
//           title="Удалить группу"
//           message={`Вы уверены, что хотите удалить группу "${currentGroup?.name}"? Пароли из группы не будут удалены, но больше не будут принадлежать ни к одной группе.`}
//           confirmLabel="Удалить"
//           onConfirm={handleDeleteGroup}
//           onCancel={() => setConfirmModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Groups;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaKey,
  FaFolder,
  FaSpinner,
  FaSearch,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GroupModal from "../components/GroupModal";
import ConfirmModal from "../components/ConfirmModal";
import PropTypes from "prop-types";

const Groups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/groups");
      setGroups(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке групп:", error);
      toast.error("Ошибка при загрузке групп");
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les groupes selon la recherche
  const filteredGroups = groups.filter((group) => {
    const searchLower = search.toLowerCase();
    return (
      group.name.toLowerCase().includes(searchLower) ||
      (group.description &&
        group.description.toLowerCase().includes(searchLower))
    );
  });

  const openAddModal = () => {
    setCurrentGroup(null);
    setModalOpen(true);
  };

  const openEditModal = (e, group) => {
    e.preventDefault();
    e.stopPropagation();

    // Vérifier les permissions
    if (!canUserEditGroup(group)) {
      toast.error("У вас нет прав для редактирования этой группы");
      return;
    }

    setCurrentGroup(group);
    setModalOpen(true);
  };

  const openDeleteModal = (e, group) => {
    e.preventDefault();
    e.stopPropagation();

    // Vérifier les permissions
    if (!canUserDeleteGroup(group)) {
      toast.error("У вас нет прав для удаления этой группы");
      return;
    }

    setCurrentGroup(group);
    setConfirmModalOpen(true);
  };

  // Vérifier si l'utilisateur peut modifier le groupe
  const canUserEditGroup = (group) => {
    if (!user || !group) return false;
    return group.ownerId === user._id || user.role === "admin";
  };

  // Vérifier si l'utilisateur peut supprimer le groupe
  const canUserDeleteGroup = (group) => {
    if (!user || !group) return false;
    return group.ownerId === user._id || user.role === "admin";
  };

  const handleSaveGroup = async (groupData) => {
    const groupId = currentGroup?._id;
    setActionLoading((prev) => ({ ...prev, [groupId || "new"]: true }));

    try {
      if (currentGroup) {
        await api.put(`/api/groups/${currentGroup._id}`, groupData);
        toast.success("Группа успешно обновлена");
      } else {
        await api.post("/api/groups", groupData);
        toast.success("Группа успешно создана");
      }

      await fetchGroups();
      setModalOpen(false);
      setCurrentGroup(null);
    } catch (error) {
      console.error("Ошибка при сохранении группы:", error);
      const errorMessage =
        error.response?.data?.msg || "Ошибка при сохранении группы";
      toast.error(errorMessage);
    } finally {
      setActionLoading((prev) => ({ ...prev, [groupId || "new"]: false }));
    }
  };

  const handleDeleteGroup = async () => {
    if (!currentGroup) return;

    const groupId = currentGroup._id;
    setActionLoading((prev) => ({ ...prev, [groupId]: true }));

    try {
      await api.delete(`/api/groups/${groupId}`);
      toast.success("Группа успешно удалена");
      await fetchGroups();
      setConfirmModalOpen(false);
      setCurrentGroup(null);
    } catch (error) {
      console.error("Ошибка при удалении группы:", error);
      const errorMessage =
        error.response?.data?.msg || "Ошибка при удалении группы";
      toast.error(errorMessage);
    } finally {
      setActionLoading((prev) => ({ ...prev, [groupId]: false }));
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentGroup(null);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
    setCurrentGroup(null);
  };

  return (
    <div className="container">
      {/* En-tête de la page */}
      <div
        className="password-list-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ margin: 0, marginBottom: "0.5rem" }}>
            Управление группами
          </h1>
          <p className="subtitle" style={{ margin: 0, color: "#6c757d" }}>
            Организуйте свои пароли по категориям
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus style={{ marginRight: "0.5rem" }} /> Создать группу
        </button>
      </div>

      <div
        className="card"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="card-header"
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <h2 style={{ margin: 0 }}>Ваши группы</h2>
        </div>

        <div className="card-body" style={{ padding: "1.5rem" }}>
          {/* Barre de recherche */}
          <div
            className="form-group"
            style={{ marginBottom: "1.5rem", position: "relative" }}
          >
            <FaSearch
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6c757d",
              }}
            />
            <input
              type="text"
              placeholder="Поиск группы..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Contenu principal */}
          {loading ? (
            <div className="text-center py-4">
              <FaSpinner
                size={24}
                style={{
                  animation: "spin 1s linear infinite",
                  marginBottom: "1rem",
                }}
              />
              <p>Загрузка групп...</p>
            </div>
          ) : filteredGroups.length > 0 ? (
            <div
              className="groups-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredGroups.map((group) => {
                const canEdit = canUserEditGroup(group);
                const canDelete = canUserDeleteGroup(group);
                const isLoading = actionLoading[group._id];

                return (
                  <Link
                    to={`/groups/${group._id}`}
                    key={group._id}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      className="group-card"
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #e9ecef",
                        borderTop: `4px solid ${group.color}`,
                        borderRadius: "8px",
                        transition: "all 0.2s",
                        cursor: "pointer",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0,0,0,0.15)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 4px rgba(0,0,0,0.1)";
                      }}
                    >
                      {/* En-tête de la carte */}
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: `${group.color}15`,
                          padding: "1rem",
                          borderBottom: "1px solid #e9ecef",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              flex: 1,
                            }}
                          >
                            <FaFolder
                              style={{ color: group.color, fontSize: "1.2rem" }}
                            />
                            <h3
                              style={{
                                margin: 0,
                                color: "#333",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              {group.name}
                            </h3>
                          </div>

                          {/* Boutons d'action */}
                          <div style={{ display: "flex", gap: "0.25rem" }}>
                            {canEdit && (
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={(e) => openEditModal(e, group)}
                                title="Изменить"
                                disabled={isLoading}
                                style={{
                                  padding: "0.375rem",
                                  fontSize: "0.8rem",
                                  opacity: isLoading ? 0.6 : 1,
                                }}
                              >
                                <FaEdit />
                              </button>
                            )}
                            {canDelete && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={(e) => openDeleteModal(e, group)}
                                title="Удалить"
                                disabled={isLoading}
                                style={{
                                  padding: "0.375rem",
                                  fontSize: "0.8rem",
                                  opacity: isLoading ? 0.6 : 1,
                                }}
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Corps de la carte */}
                      <div
                        className="card-body"
                        style={{
                          padding: "1rem",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Description */}
                        {group.description && (
                          <p
                            style={{
                              margin: "0 0 1rem 0",
                              color: "#6c757d",
                              fontSize: "0.9rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {group.description}
                          </p>
                        )}

                        {/* Statistiques */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.85rem",
                            marginTop: "auto",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <FaKey style={{ color: group.color }} />
                            <span>{group.passwordCount || 0} пароль(ей)</span>
                          </div>

                          {group.sharedWith && group.sharedWith.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <FaUsers style={{ color: group.color }} />
                              <span>{group.sharedWith.length} польз.</span>
                            </div>
                          )}
                        </div>

                        {/* Propriétaire */}
                        <div
                          style={{
                            marginTop: "0.75rem",
                            paddingTop: "0.75rem",
                            borderTop: "1px solid #f1f3f4",
                          }}
                        >
                          <small
                            style={{
                              color: "#6c757d",
                              fontSize: "0.75rem",
                            }}
                          >
                            {group.ownerId === user._id
                              ? "Вы владелец"
                              : "Поделился с вами"}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : search ? (
            <div className="text-center py-4">
              <FaSearch
                size={40}
                color="#ccc"
                style={{ marginBottom: "1rem" }}
              />
              <p style={{ color: "#6c757d", marginBottom: "0.5rem" }}>
                Нет групп, соответствующих поиску "{search}"
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => setSearch("")}
              >
                Очистить поиск
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <FaFolder
                size={40}
                color="#ccc"
                style={{ marginBottom: "1rem" }}
              />
              <p style={{ color: "#6c757d", marginBottom: "1rem" }}>
                У вас пока нет групп.
              </p>
              <button className="btn btn-primary" onClick={openAddModal}>
                <FaPlus style={{ marginRight: "0.5rem" }} />
                Создать вашу первую группу
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de création/édition de groupe */}
      {modalOpen && (
        <GroupModal
          group={currentGroup}
          onSave={handleSaveGroup}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal de confirmation de suppression */}
      {confirmModalOpen && currentGroup && (
        <ConfirmModal
          isOpen={confirmModalOpen}
          title="Удалить группу"
          confirmLabel="Удалить"
          cancelLabel="Отмена"
          onConfirm={handleDeleteGroup}
          onClose={handleCloseConfirmModal}
        >
          <p>
            Вы уверены, что хотите удалить группу{" "}
            <strong>"{currentGroup.name}"</strong>?
          </p>
          <div
            style={{
              padding: "0.75rem",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "4px",
              marginTop: "1rem",
            }}
          >
            <small style={{ color: "#856404" }}>
              <strong>Внимание:</strong> Пароли из группы не будут удалены, но
              больше не будут принадлежать ни к одной группе.
            </small>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default Groups;
