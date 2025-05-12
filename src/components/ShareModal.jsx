// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "./Modal";
// import { FaShare, FaSave, FaUserPlus } from "react-icons/fa";
// import { toast } from "react-toastify";

// const ShareModal = ({ password, onSave, onClose }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();

//     // Initialiser les utilisateurs sélectionnés
//     if (password && password.sharedWith) {
//       setSelectedUsers(password.sharedWith);
//     }
//   }, [password]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/users");

//       // Filtrer pour ne pas inclure l'utilisateur propriétaire du mot de passe
//       const filteredUsers = res.data.filter(
//         (user) => user.id !== password.userId
//       );

//       setUsers(filteredUsers);
//     } catch (error) {
//       toast.error("Erreur lors de la récupération des utilisateurs");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleUser = (userId) => {
//     setSelectedUsers((prev) => {
//       if (prev.includes(userId)) {
//         return prev.filter((id) => id !== userId);
//       } else {
//         return [...prev, userId];
//       }
//     });
//   };

//   const handleSubmit = () => {
//     onSave(selectedUsers);
//   };

//   return (
//     <Modal
//       title={`Partager "${password?.title}"`}
//       onClose={onClose}
//       footer={
//         <>
//           <button className="btn btn-secondary" onClick={onClose}>
//             Annuler
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             <FaSave /> Enregistrer le partage
//           </button>
//         </>
//       }
//     >
//       {loading ? (
//         <div className="text-center py-4">Chargement des utilisateurs...</div>
//       ) : users.length > 0 ? (
//         <div>
//           <p className="mb-3">
//             Sélectionnez les utilisateurs avec qui partager ce mot de passe :
//           </p>

//           <div className="mb-3">
//             {users.map((user) => (
//               <label
//                 key={user.id}
//                 className="checkbox-container mb-2 flex items-center"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedUsers.includes(user.id)}
//                   onChange={() => handleToggleUser(user.id)}
//                 />
//                 <span className="checkmark"></span>
//                 <div>
//                   <strong>{user.username}</strong>
//                   <br />
//                   <small className="text-gray-600">{user.email}</small>
//                   <span
//                     className={`user-role ${user.role} ml-2`}
//                     style={{ fontSize: "0.75rem" }}
//                   >
//                     {user.role}
//                   </span>
//                 </div>
//               </label>
//             ))}
//           </div>

//           <p>
//             <small className="text-gray-600">
//               {selectedUsers.length === 0
//                 ? "Ce mot de passe ne sera pas partagé."
//                 : `Ce mot de passe sera partagé avec ${selectedUsers.length} utilisateur(s).`}
//             </small>
//           </p>
//         </div>
//       ) : (
//         <div className="text-center py-4">
//           <p>Aucun autre utilisateur trouvé pour partager ce mot de passe.</p>
//           <p className="mt-2">
//             <small className="text-gray-600">
//               Un administrateur doit créer d'autres comptes utilisateurs pour
//               pouvoir partager des mots de passe.
//             </small>
//           </p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default ShareModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { FaShare, FaSave, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const ShareModal = ({ password, onSave, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();

    // Инициализировать выбранных пользователей
    if (password && password.sharedWith) {
      setSelectedUsers(password.sharedWith);
    }
  }, [password]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");

      // Фильтрация, чтобы не включать владельца пароля
      const filteredUsers = res.data.filter(
        (user) => user.id !== password.userId
      );

      setUsers(filteredUsers);
    } catch (error) {
      toast.error("Ошибка при получении списка пользователей");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUser = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSubmit = () => {
    onSave(selectedUsers);
  };

  return (
    <Modal
      title={`Поделиться "${password?.title}"`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Отмена
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <FaSave /> Сохранить общий доступ
          </button>
        </>
      }
    >
      {loading ? (
        <div className="text-center py-4">Загрузка пользователей...</div>
      ) : users.length > 0 ? (
        <div>
          <p className="mb-3">
            Выберите пользователей, с которыми хотите поделиться этим паролем:
          </p>

          <div className="mb-3">
            {users.map((user) => (
              <label
                key={user.id}
                className="checkbox-container mb-2 flex items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleToggleUser(user.id)}
                />
                <span className="checkmark"></span>
                <div>
                  <strong>{user.username}</strong>
                  <br />
                  <small className="text-gray-600">{user.email}</small>
                  <span
                    className={`user-role ${user.role} ml-2`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {user.role}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <p>
            <small className="text-gray-600">
              {selectedUsers.length === 0
                ? "Этот пароль не будет доступен другим пользователям."
                : `Этот пароль будет доступен ${selectedUsers.length} пользователям.`}
            </small>
          </p>
        </div>
      ) : (
        <div className="text-center py-4">
          <p>
            Не найдено других пользователей для предоставления доступа к паролю.
          </p>
          <p className="mt-2">
            <small className="text-gray-600">
              Администратор должен создать другие учетные записи пользователей,
              чтобы была возможность делиться паролями.
            </small>
          </p>
        </div>
      )}
    </Modal>
  );
};

export default ShareModal;
