// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
// import { toast } from "react-toastify";
// import api from "../utils/api"; // Assurez-vous que le chemin est correct

// // Importer les modales
// import PasswordModal from "./PasswordModal"; // Pour l'édition (future)
// import ConfirmModal from "./ConfirmModal"; // Pour la suppression

// const PasswordList = ({ passwords, refreshPasswords }) => {
//   // États pour gérer les modales
//   const [editingPassword, setEditingPassword] = useState(null);
//   const [passwordToDelete, setPasswordToDelete] = useState(null);

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Пароль скопирован в буфер обмена!");
//   };

//   // Ouvre la modale de confirmation
//   const handleDeleteClick = (password) => {
//     setPasswordToDelete(password);
//   };

//   // Logique de suppression appelée après confirmation
//   const handleConfirmDelete = async () => {
//     if (!passwordToDelete) return;

//     try {
//       await api.delete(`/api/passwords/${passwordToDelete._id}`);
//       toast.success(`Пароль "${passwordToDelete.title}" успешно удален.`);
//       setPasswordToDelete(null); // Ferme la modale
//       refreshPasswords(); // Rafraîchit la liste
//     } catch (error) {
//       toast.error("Ошибка при удалении пароля.");
//       console.error("Delete error:", error);
//     }
//   };

//   // Fonction pour l'édition (à implémenter)
//   const handleEditClick = (password) => {
//     setEditingPassword(password);
//     // Vous ouvrirez votre PasswordModal ici
//     toast.info("Функция редактирования в разработке.");
//   };

//   if (!passwords || passwords.length === 0) {
//     return <p>В этой группе пока нет паролей.</p>;
//   }

//   return (
//     <div className="password-list">
//       {/* Le texte libre est retiré, et on appelle la modale de confirmation */}
//       <ConfirmModal
//         isOpen={!!passwordToDelete}
//         onClose={() => setPasswordToDelete(null)}
//         onConfirm={handleConfirmDelete}
//         title="Подтверждение удаления"
//       >
//         <p>
//           Вы уверены, что хотите удалить пароль{" "}
//           <strong>"{passwordToDelete?.title}"</strong>?
//         </p>
//         <p>Это действие необратимо.</p>
//       </ConfirmModal>

//       {/* Vous pouvez ajouter la modale d'édition ici de la même manière */}
//       {editingPassword && (
//         <PasswordModal
//           password={editingPassword}
//           onClose={() => setEditingPassword(null)}
//           onSave={() => {
//             setEditingPassword(null);
//             refreshPasswords();
//           }}
//         />
//       )}

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
//                 <FaCopy />
//               </button>
//               <button
//                 onClick={() => handleEditClick(p)}
//                 className="btn-icon"
//                 title="Изменить"
//               >
//                 <FaEdit />
//               </button>
//               <button
//                 onClick={() => handleDeleteClick(p)}
//                 className="btn-icon btn-icon-danger"
//                 title="Удалить"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           </div>
//           <div className="password-card-body">
//             <p>
//               <strong>Имя пользователя:</strong> {p.username}
//             </p>
//             {p.url && (
//               <p>
//                 <strong>URL:</strong>{" "}
//                 <a href={p.url} target="_blank" rel="noopener noreferrer">
//                   {p.url}
//                 </a>
//               </p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PasswordList;

import React, { useState } from "react";
import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../utils/api";
import ConfirmModal from "./ConfirmModal"; // Il importe sa propre modale

const PasswordList1 = ({ passwords, refreshPasswords }) => {
  // L'état pour la modale de suppression est DÉCLARÉ ICI, à l'intérieur de la liste.
  const [passwordToDelete, setPasswordToDelete] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Пароль скопирован в буфер обмена!");
  };

  // Ouvre la modale en mettant à jour l'état local
  const handleDeleteClick = (password) => {
    setPasswordToDelete(password);
  };

  const handleConfirmDelete = async () => {
    if (!passwordToDelete) return;
    try {
      await api.delete(`/api/passwords/${passwordToDelete._id}`);
      toast.success(`Пароль "${passwordToDelete.title}" успешно удален.`);
    } catch (error) {
      toast.error("Ошибка при удалении пароля.");
    } finally {
      setPasswordToDelete(null); // Ferme la modale
      refreshPasswords(); // Rafraîchit la liste sur la page parente
    }
  };

  if (!passwords || passwords.length === 0) {
    return <p>В этой группе пока нет паролей.</p>;
  }

  return (
    <div className="password-list">
      {/* Le rendu de la modale de confirmation est ICI, contrôlé par l'état local */}
      <ConfirmModal
        isOpen={!!passwordToDelete}
        title="Подтверждение удаления"
        onClose={() => setPasswordToDelete(null)}
        onConfirm={handleConfirmDelete}
      >
        <p>
          Вы уверены, что хотите удалить пароль{" "}
          <strong>"{passwordToDelete?.title}"</strong>?
        </p>
      </ConfirmModal>

      {passwords.map((p) => (
        <div key={p._id} className="password-card">
          <div className="password-card-header">
            <h5 className="password-title">{p.title}</h5>
            <div className="password-actions">
              <button
                onClick={() => copyToClipboard(p.password)}
                className="btn-icon"
                title="Копировать пароль"
              >
                {" "}
                <FaCopy />{" "}
              </button>
              {/* Le bouton supprimer appelle la fonction locale handleDeleteClick */}
              <button
                onClick={() => handleDeleteClick(p)}
                className="btn-icon btn-icon-danger"
                title="Удалить"
              >
                {" "}
                <FaTrash />{" "}
              </button>
            </div>
          </div>
          <div className="password-card-body">
            <p>
              <strong>Имя пользователя:</strong> {p.username}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordList1;
