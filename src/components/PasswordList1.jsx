// // import React, { useState } from "react";
// // import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
// // import { toast } from "react-toastify";
// // import api from "../utils/api"; // Assurez-vous que le chemin est correct

// // // Importer les modales
// // import PasswordModal from "./PasswordModal"; // Pour l'édition (future)
// // import ConfirmModal from "./ConfirmModal"; // Pour la suppression

// // const PasswordList = ({ passwords, refreshPasswords }) => {
// //   // États pour gérer les modales
// //   const [editingPassword, setEditingPassword] = useState(null);
// //   const [passwordToDelete, setPasswordToDelete] = useState(null);

// //   const copyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text);
// //     toast.success("Пароль скопирован в буфер обмена!");
// //   };

// //   // Ouvre la modale de confirmation
// //   const handleDeleteClick = (password) => {
// //     setPasswordToDelete(password);
// //   };

// //   // Logique de suppression appelée après confirmation
// //   const handleConfirmDelete = async () => {
// //     if (!passwordToDelete) return;

// //     try {
// //       await api.delete(`/api/passwords/${passwordToDelete._id}`);
// //       toast.success(`Пароль "${passwordToDelete.title}" успешно удален.`);
// //       setPasswordToDelete(null); // Ferme la modale
// //       refreshPasswords(); // Rafraîchit la liste
// //     } catch (error) {
// //       toast.error("Ошибка при удалении пароля.");
// //       console.error("Delete error:", error);
// //     }
// //   };

// //   // Fonction pour l'édition (à implémenter)
// //   const handleEditClick = (password) => {
// //     setEditingPassword(password);
// //     // Vous ouvrirez votre PasswordModal ici
// //     toast.info("Функция редактирования в разработке.");
// //   };

// //   if (!passwords || passwords.length === 0) {
// //     return <p>В этой группе пока нет паролей.</p>;
// //   }

// //   return (
// //     <div className="password-list">
// //       {/* Le texte libre est retiré, et on appelle la modale de confirmation */}
// //       <ConfirmModal
// //         isOpen={!!passwordToDelete}
// //         onClose={() => setPasswordToDelete(null)}
// //         onConfirm={handleConfirmDelete}
// //         title="Подтверждение удаления"
// //       >
// //         <p>
// //           Вы уверены, что хотите удалить пароль{" "}
// //           <strong>"{passwordToDelete?.title}"</strong>?
// //         </p>
// //         <p>Это действие необратимо.</p>
// //       </ConfirmModal>

// //       {/* Vous pouvez ajouter la modale d'édition ici de la même manière */}
// //       {editingPassword && (
// //         <PasswordModal
// //           password={editingPassword}
// //           onClose={() => setEditingPassword(null)}
// //           onSave={() => {
// //             setEditingPassword(null);
// //             refreshPasswords();
// //           }}
// //         />
// //       )}

// //       {passwords.map((p) => (
// //         <div key={p._id} className="password-card">
// //           <div className="password-card-header">
// //             <h5 className="password-title">{p.title}</h5>
// //             <div className="password-actions">
// //               <button
// //                 onClick={() => copyToClipboard(p.password)}
// //                 className="btn-icon"
// //                 title="Копировать пароль"
// //               >
// //                 <FaCopy />
// //               </button>
// //               <button
// //                 onClick={() => handleEditClick(p)}
// //                 className="btn-icon"
// //                 title="Изменить"
// //               >
// //                 <FaEdit />
// //               </button>
// //               <button
// //                 onClick={() => handleDeleteClick(p)}
// //                 className="btn-icon btn-icon-danger"
// //                 title="Удалить"
// //               >
// //                 <FaTrash />
// //               </button>
// //             </div>
// //           </div>
// //           <div className="password-card-body">
// //             <p>
// //               <strong>Имя пользователя:</strong> {p.username}
// //             </p>
// //             {p.url && (
// //               <p>
// //                 <strong>URL:</strong>{" "}
// //                 <a href={p.url} target="_blank" rel="noopener noreferrer">
// //                   {p.url}
// //                 </a>
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default PasswordList;

// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
// import { toast } from "react-toastify";
// import api from "../utils/api";
// import ConfirmModal from "./ConfirmModal"; // Il importe sa propre modale

// const PasswordList1 = ({ passwords, refreshPasswords }) => {
//   // L'état pour la modale de suppression est DÉCLARÉ ICI, à l'intérieur de la liste.
//   const [passwordToDelete, setPasswordToDelete] = useState(null);

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Пароль скопирован в буфер обмена!");
//   };

//   // Ouvre la modale en mettant à jour l'état local
//   const handleDeleteClick = (password) => {
//     setPasswordToDelete(password);
//   };

//   const handleConfirmDelete = async () => {
//     if (!passwordToDelete) return;
//     try {
//       await api.delete(`/api/passwords/${passwordToDelete._id}`);
//       toast.success(`Пароль "${passwordToDelete.title}" успешно удален.`);
//     } catch (error) {
//       toast.error("Ошибка при удалении пароля.");
//     } finally {
//       setPasswordToDelete(null); // Ferme la modale
//       refreshPasswords(); // Rafraîchit la liste sur la page parente
//     }
//   };

//   if (!passwords || passwords.length === 0) {
//     return <p>В этой группе пока нет паролей.</p>;
//   }

//   return (
//     <div className="password-list">
//       {/* Le rendu de la modale de confirmation est ICI, contrôlé par l'état local */}
//       <ConfirmModal
//         isOpen={!!passwordToDelete}
//         title="Подтверждение удаления"
//         onClose={() => setPasswordToDelete(null)}
//         onConfirm={handleConfirmDelete}
//       >
//         <p>
//           Вы уверены, что хотите удалить пароль{" "}
//           <strong>"{passwordToDelete?.title}"</strong>?
//         </p>
//       </ConfirmModal>

//       {passwords.map((p) => (
//         <div key={p._id} className="password-card">
//           <div className="password-card-header">
//             <h5 className="password-title">{p.title}</h5>
//             <div className="password-actions">
//               <button
//                 onClick={() => copyToClipboard(p.password)}
//                 className="btn-icon"
//                 title="Копировать пароль"
//               >
//                 {" "}
//                 <FaCopy />{" "}
//               </button>
//               {/* Le bouton supprimer appelle la fonction locale handleDeleteClick */}
//               <button
//                 onClick={() => handleDeleteClick(p)}
//                 className="btn-icon btn-icon-danger"
//                 title="Удалить"
//               >
//                 {" "}
//                 <FaTrash />{" "}
//               </button>
//             </div>
//           </div>
//           <div className="password-card-body">
//             <p>
//               <strong>Имя пользователя:</strong> {p.username}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PasswordList1;

import React, { useState } from "react";
import { FaEdit, FaTrash, FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../utils/api";
import ConfirmModal from "./ConfirmModal";
import PropTypes from "prop-types";

const PasswordList1 = ({ passwords, refreshPasswords, onEditPassword }) => {
  // État pour la modale de suppression
  const [passwordToDelete, setPasswordToDelete] = useState(null);
  // État pour afficher/masquer les mots de passe
  const [visiblePasswords, setVisiblePasswords] = useState({});
  // État pour les actions en cours
  const [loadingActions, setLoadingActions] = useState({});

  const copyToClipboard = async (text, label = "Пароль") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} скопирован в буфер обмена!`);
    } catch (error) {
      console.error("Erreur de copie:", error);
      toast.error("Ошибка при копировании");
    }
  };

  const togglePasswordVisibility = (passwordId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [passwordId]: !prev[passwordId],
    }));
  };

  // Ouvre la modale de suppression
  const handleDeleteClick = (password) => {
    setPasswordToDelete(password);
  };

  // Ferme la modale de suppression
  const handleCloseDeleteModal = () => {
    setPasswordToDelete(null);
  };

  // Confirme la suppression
  const handleConfirmDelete = async () => {
    if (!passwordToDelete) return;

    const passwordId = passwordToDelete._id;
    setLoadingActions((prev) => ({ ...prev, [passwordId]: true }));

    try {
      await api.delete(`/api/passwords/${passwordId}`);
      toast.success(`Пароль "${passwordToDelete.title}" успешно удален.`);
      refreshPasswords(); // Actualiser la liste
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Ошибка при удалении пароля.");
    } finally {
      setLoadingActions((prev) => ({ ...prev, [passwordId]: false }));
      setPasswordToDelete(null); // Fermer la modale
    }
  };

  // Gère le clic sur le bouton d'édition
  const handleEditClick = (password) => {
    if (onEditPassword) {
      onEditPassword(password);
    } else {
      toast.info("Функция редактирования не настроена");
    }
  };

  if (!passwords || passwords.length === 0) {
    return (
      <div className="text-center py-4">
        <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
          В этой группе пока нет паролей.
        </p>
      </div>
    );
  }

  return (
    <div className="password-list">
      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={!!passwordToDelete}
        title="Подтверждение удаления"
        confirmLabel="Удалить"
        cancelLabel="Отмена"
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      >
        <p>
          Вы уверены, что хотите удалить пароль{" "}
          <strong>"{passwordToDelete?.title}"</strong>?
        </p>
        <small style={{ color: "#6c757d" }}>
          Это действие нельзя отменить.
        </small>
      </ConfirmModal>

      {/* Liste des mots de passe */}
      <div className="password-grid" style={{ display: "grid", gap: "1rem" }}>
        {passwords.map((password) => {
          const isVisible = visiblePasswords[password._id];
          const isLoading = loadingActions[password._id];

          return (
            <div
              key={password._id}
              className="password-card"
              style={{
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "1rem",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* En-tête de la carte */}
              <div
                className="password-card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h5
                  className="password-title"
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  {password.title}
                </h5>

                <div
                  className="password-actions"
                  style={{ display: "flex", gap: "0.5rem" }}
                >
                  {/* Bouton copier mot de passe */}
                  <button
                    onClick={() => copyToClipboard(password.password)}
                    className="btn-icon"
                    title="Копировать пароль"
                    style={{
                      background: "none",
                      border: "1px solid #28a745",
                      color: "#28a745",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <FaCopy />
                  </button>

                  {/* Bouton modifier */}
                  <button
                    onClick={() => handleEditClick(password)}
                    className="btn-icon"
                    title="Редактировать"
                    style={{
                      background: "none",
                      border: "1px solid #007bff",
                      color: "#007bff",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <FaEdit />
                  </button>

                  {/* Bouton supprimer */}
                  <button
                    onClick={() => handleDeleteClick(password)}
                    className="btn-icon btn-icon-danger"
                    title="Удалить"
                    disabled={isLoading}
                    style={{
                      background: "none",
                      border: "1px solid #dc3545",
                      color: "#dc3545",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Corps de la carte */}
              <div className="password-card-body">
                {/* Nom d'utilisateur */}
                <div style={{ marginBottom: "0.75rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong style={{ fontSize: "0.9rem", color: "#555" }}>
                      Имя пользователя:
                    </strong>
                    <button
                      onClick={() =>
                        copyToClipboard(password.username, "Имя пользователя")
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6c757d",
                        cursor: "pointer",
                        padding: "0.25rem",
                      }}
                      title="Копировать имя пользователя"
                    >
                      <FaCopy size={12} />
                    </button>
                  </div>
                  <p
                    style={{
                      margin: "0.25rem 0 0 0",
                      color: "#333",
                      wordBreak: "break-word",
                    }}
                  >
                    {password.username}
                  </p>
                </div>

                {/* Mot de passe */}
                <div style={{ marginBottom: "0.75rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong style={{ fontSize: "0.9rem", color: "#555" }}>
                      Пароль:
                    </strong>
                    <button
                      onClick={() => togglePasswordVisibility(password._id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#6c757d",
                        cursor: "pointer",
                        padding: "0.25rem",
                      }}
                      title={isVisible ? "Скрыть пароль" : "Показать пароль"}
                    >
                      {isVisible ? (
                        <FaEyeSlash size={12} />
                      ) : (
                        <FaEye size={12} />
                      )}
                    </button>
                  </div>
                  <p
                    style={{
                      margin: "0.25rem 0 0 0",
                      color: "#333",
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                    }}
                  >
                    {isVisible ? password.password : "••••••••"}
                  </p>
                </div>

                {/* URL optionnelle */}
                {password.url && (
                  <div style={{ marginBottom: "0.75rem" }}>
                    <strong style={{ fontSize: "0.9rem", color: "#555" }}>
                      Сайт:
                    </strong>
                    <p style={{ margin: "0.25rem 0 0 0" }}>
                      <a
                        href={password.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                          wordBreak: "break-word",
                        }}
                      >
                        {password.url}
                      </a>
                    </p>
                  </div>
                )}

                {/* Notes optionnelles */}
                {password.notes && (
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "#555" }}>
                      Заметки:
                    </strong>
                    <p
                      style={{
                        margin: "0.25rem 0 0 0",
                        color: "#6c757d",
                        fontSize: "0.9rem",
                      }}
                    >
                      {password.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

PasswordList1.propTypes = {
  passwords: PropTypes.array.isRequired,
  refreshPasswords: PropTypes.func.isRequired,
  onEditPassword: PropTypes.func,
};

export default PasswordList1;
