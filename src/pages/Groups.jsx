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

// // // Composants
// // import GroupModal from "../components/GroupModal";
// // import ConfirmModal from "../components/ConfirmModal";

// // const Groups = () => {
// //   const { user } = useAuth();
// //   const [groups, setGroups] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");

// //   // États pour les modales
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
// //   const [currentGroup, setCurrentGroup] = useState(null);

// //   useEffect(() => {
// //     fetchGroups();
// //   }, []);

// //   // Récupérer tous les groupes
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

// //   // Filtrer les groupes selon la recherche
// //   const filteredGroups = groups.filter(
// //     (group) =>
// //       group.name.toLowerCase().includes(search.toLowerCase()) ||
// //       group.description.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // Ouvrir la modale pour ajouter un groupe
// //   const openAddModal = () => {
// //     setCurrentGroup(null);
// //     setModalOpen(true);
// //   };

// //   // Ouvrir la modale pour modifier un groupe
// //   const openEditModal = (group) => {
// //     setCurrentGroup(group);
// //     setModalOpen(true);
// //   };

// //   // Ouvrir la modale de confirmation pour supprimer un groupe
// //   const openDeleteModal = (group) => {
// //     setCurrentGroup(group);
// //     setConfirmModalOpen(true);
// //   };

// //   // Gérer l'ajout ou la modification d'un groupe
// //   const handleSaveGroup = async (groupData) => {
// //     try {
// //       if (currentGroup) {
// //         // Mise à jour
// //         await api.put(`/api/groups/${currentGroup._id}`, groupData);
// //         toast.success("Groupe mis à jour avec succès");
// //       } else {
// //         // Ajout
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

// //   // Gérer la suppression d'un groupe
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
// //                 <div
// //                   key={group._id}
// //                   className="card"
// //                   style={{
// //                     flex: "1",
// //                     minWidth: "300px",
// //                     borderLeft: `4px solid ${group.color}`,
// //                     marginBottom: "1rem",
// //                   }}
// //                 >
// //                   <div
// //                     className="card-header"
// //                     style={{ backgroundColor: `${group.color}15` }}
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         <FaFolder style={{ color: group.color }} />
// //                         <h3 style={{ margin: 0 }}>{group.name}</h3>
// //                       </div>
// //                       <div className="flex gap-1">
// //                         <button
// //                           className="btn btn-sm btn-secondary"
// //                           onClick={() => openEditModal(group)}
// //                           title="Modifier"
// //                         >
// //                           <FaEdit />
// //                         </button>
// //                         <button
// //                           className="btn btn-sm btn-danger"
// //                           onClick={() => openDeleteModal(group)}
// //                           title="Supprimer"
// //                         >
// //                           <FaTrash />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="card-body">
// //                     {group.description && (
// //                       <p style={{ marginBottom: "1rem", color: "#6c757d" }}>
// //                         {group.description}
// //                       </p>
// //                     )}

// //                     <div className="flex items-center justify-between mb-2">
// //                       <div className="flex items-center gap-1">
// //                         <FaKey style={{ color: group.color }} />
// //                         <span>{group.passwordCount || 0} mot(s) de passe</span>
// //                       </div>
// //                     </div>

// //                     {group.sharedWith && group.sharedWith.length > 0 && (
// //                       <div className="flex items-center gap-1 mb-2">
// //                         <FaUsers style={{ color: group.color }} />
// //                         <small style={{ color: "#6c757d" }}>
// //                           Partagé avec {group.sharedWith.length} utilisateur(s)
// //                         </small>
// //                       </div>
// //                     )}

// //                     <div className="mt-3">
// //                       <small style={{ color: "#6c757d" }}>
// //                         {group.ownerId === user._id
// //                           ? "Vous êtes propriétaire"
// //                           : "Partagé avec vous"}
// //                       </small>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-4">
// //               <FaFolder size={40} color="#ccc" />
// //               <p className="mt-2">Aucun groupe trouvé</p>
// //               <button className="btn btn-primary mt-3" onClick={openAddModal}>
// //                 <FaPlus /> Créer votre premier groupe
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Modale d'ajout/modification de groupe */}
// //       {modalOpen && (
// //         <GroupModal
// //           group={currentGroup}
// //           onSave={handleSaveGroup}
// //           onClose={() => setModalOpen(false)}
// //         />
// //       )}

// //       {/* Modale de confirmation de suppression */}
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

// // src/pages/Groups.jsx

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
//       toast.error("Erreur lors du chargement des groupes");
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
//     e.preventDefault(); // Empêche la navigation lors du clic sur le bouton
//     setCurrentGroup(group);
//     setModalOpen(true);
//   };

//   const openDeleteModal = (e, group) => {
//     e.preventDefault(); // Empêche la navigation
//     setCurrentGroup(group);
//     setConfirmModalOpen(true);
//   };

//   const handleSaveGroup = async (groupData) => {
//     try {
//       if (currentGroup) {
//         await api.put(`/api/groups/${currentGroup._id}`, groupData);
//         toast.success("Groupe mis à jour avec succès");
//       } else {
//         await api.post("/api/groups", groupData);
//         toast.success("Groupe créé avec succès");
//       }
//       fetchGroups();
//       setModalOpen(false);
//     } catch (error) {
//       toast.error("Erreur lors de la sauvegarde du groupe");
//       console.error(error);
//     }
//   };

//   const handleDeleteGroup = async () => {
//     try {
//       await api.delete(`/api/groups/${currentGroup._id}`);
//       toast.success("Groupe supprimé avec succès");
//       fetchGroups();
//       setConfirmModalOpen(false);
//     } catch (error) {
//       toast.error("Erreur lors de la suppression du groupe");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="password-list-header">
//         <div>
//           <h1>Gestion des Groupes</h1>
//           <p className="subtitle">Organisez vos mots de passe par catégories</p>
//         </div>
//         <button className="btn btn-primary" onClick={openAddModal}>
//           <FaPlus /> Créer un groupe
//         </button>
//       </div>

//       <div className="card">
//         <div className="card-header">
//           <h2>Vos groupes</h2>
//         </div>
//         <div className="card-body">
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Rechercher un groupe..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full"
//             />
//           </div>

//           {loading ? (
//             <div className="text-center py-4">Chargement...</div>
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
//                             title="Modifier"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             className="btn btn-sm btn-danger"
//                             onClick={(e) => openDeleteModal(e, group)}
//                             title="Supprimer"
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
//                           <span>
//                             {group.passwordCount || 0} mot(s) de passe
//                           </span>
//                         </div>
//                         {group.sharedWith && group.sharedWith.length > 0 && (
//                           <div className="flex items-center gap-2">
//                             <FaUsers style={{ color: group.color }} />
//                             <span>
//                               Partagé avec {group.sharedWith.length}{" "}
//                               utilisateur(s)
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="mt-3">
//                         <small style={{ color: "#6c757d" }}>
//                           {group.ownerId === user._id
//                             ? "Vous êtes propriétaire"
//                             : "Partagé avec vous"}
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
//               <p className="mt-2">Aucun groupe trouvé.</p>
//               <button className="btn btn-primary mt-3" onClick={openAddModal}>
//                 <FaPlus /> Créer votre premier groupe
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
//           title="Supprimer le groupe"
//           message={`Êtes-vous sûr de vouloir supprimer le groupe "${currentGroup?.name}" ? Les mots de passe du groupe ne seront pas supprimés mais ne feront plus partie d'aucun groupe.`}
//           confirmLabel="Supprimer"
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
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import GroupModal from "../components/GroupModal";
import ConfirmModal from "../components/ConfirmModal";

const Groups = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/groups");
      setGroups(res.data);
    } catch (error) {
      toast.error("Ошибка при загрузке групп");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      (group.description &&
        group.description.toLowerCase().includes(search.toLowerCase()))
  );

  const openAddModal = () => {
    setCurrentGroup(null);
    setModalOpen(true);
  };

  const openEditModal = (e, group) => {
    e.preventDefault(); // Предотвращает навигацию при клике на кнопку
    setCurrentGroup(group);
    setModalOpen(true);
  };

  const openDeleteModal = (e, group) => {
    e.preventDefault(); // Предотвращает навигацию
    setCurrentGroup(group);
    setConfirmModalOpen(true);
  };

  const handleSaveGroup = async (groupData) => {
    try {
      if (currentGroup) {
        await api.put(`/api/groups/${currentGroup._id}`, groupData);
        toast.success("Группа успешно обновлена");
      } else {
        await api.post("/api/groups", groupData);
        toast.success("Группа успешно создана");
      }
      fetchGroups();
      setModalOpen(false);
    } catch (error) {
      toast.error("Ошибка при сохранении группы");
      console.error(error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await api.delete(`/api/groups/${currentGroup._id}`);
      toast.success("Группа успешно удалена");
      fetchGroups();
      setConfirmModalOpen(false);
    } catch (error) {
      toast.error("Ошибка при удалении группы");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="password-list-header">
        <div>
          <h1>Управление группами</h1>
          <p className="subtitle">Организуйте свои пароли по категориям</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Создать группу
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Ваши группы</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              placeholder="Поиск группы..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          {loading ? (
            <div className="text-center py-4">Загрузка...</div>
          ) : filteredGroups.length > 0 ? (
            <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
              {filteredGroups.map((group) => (
                <Link
                  to={`/groups/${group._id}`}
                  key={group._id}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    flex: "1",
                    minWidth: "300px",
                  }}
                >
                  <div
                    className="card"
                    style={{
                      borderTop: `3px solid ${group.color}`,
                      height: "100%",
                      transition: "transform 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div
                      className="card-header"
                      style={{ backgroundColor: `${group.color}1A` }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <FaFolder style={{ color: group.color }} />
                          <h3 style={{ margin: 0, color: "#333" }}>
                            {group.name}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={(e) => openEditModal(e, group)}
                            title="Изменить"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={(e) => openDeleteModal(e, group)}
                            title="Удалить"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {group.description && (
                        <p className="mb-3" style={{ color: "#6c757d" }}>
                          {group.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <FaKey style={{ color: group.color }} />
                          <span>{group.passwordCount || 0} пароль(ей)</span>
                        </div>
                        {group.sharedWith && group.sharedWith.length > 0 && (
                          <div className="flex items-center gap-2">
                            <FaUsers style={{ color: group.color }} />
                            <span>
                              Поделиться с {group.sharedWith.length}{" "}
                              пользователя(ми)
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <small style={{ color: "#6c757d" }}>
                          {group.ownerId === user._id
                            ? "Вы владелец"
                            : "Поделился с вами"}
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <FaFolder size={40} color="#ccc" />
              <p className="mt-2">Группы не найдены.</p>
              <button className="btn btn-primary mt-3" onClick={openAddModal}>
                <FaPlus /> Создать вашу первую группу
              </button>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <GroupModal
          group={currentGroup}
          onSave={handleSaveGroup}
          onClose={() => setModalOpen(false)}
        />
      )}

      {confirmModalOpen && (
        <ConfirmModal
          title="Удалить группу"
          message={`Вы уверены, что хотите удалить группу "${currentGroup?.name}"? Пароли из группы не будут удалены, но больше не будут принадлежать ни к одной группе.`}
          confirmLabel="Удалить"
          onConfirm={handleDeleteGroup}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Groups;
