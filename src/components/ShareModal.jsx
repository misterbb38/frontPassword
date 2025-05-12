// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import Modal from "./Modal";
// import { FaShare, FaSave, FaUserPlus } from "react-icons/fa";
// import { toast } from "react-toastify";

// const ShareModal = ({ password, onSave, onClose }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();

//     // Инициализировать выбранных пользователей
//     if (password && password.sharedWith) {
//       setSelectedUsers(password.sharedWith);
//     }
//   }, [password]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/users");

//       // Фильтрация, чтобы не включать владельца пароля
//       const filteredUsers = res.data.filter(
//         (user) => user._id !== password.userId
//       );

//       setUsers(filteredUsers);
//     } catch (error) {
//       toast.error("Ошибка при получении списка пользователей");
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
//       title={`Поделиться "${password?.title}"`}
//       onClose={onClose}
//       footer={
//         <>
//           <button className="btn btn-secondary" onClick={onClose}>
//             Отмена
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             <FaSave /> Сохранить общий доступ
//           </button>
//         </>
//       }
//     >
//       {loading ? (
//         <div className="text-center py-4">Загрузка пользователей...</div>
//       ) : users.length > 0 ? (
//         <div>
//           <p className="mb-3">
//             Выберите пользователей, с которыми хотите поделиться этим паролем:
//           </p>

//           <div className="mb-3">
//             {users.map((user) => (
//               <label
//                 key={user._id}
//                 className="checkbox-container mb-2 flex items-center"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedUsers.includes(user._id)}
//                   onChange={() => handleToggleUser(user._id)}
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
//                 ? "Этот пароль не будет доступен другим пользователям."
//                 : `Этот пароль будет доступен ${selectedUsers.length} пользователям.`}
//             </small>
//           </p>
//         </div>
//       ) : (
//         <div className="text-center py-4">
//           <p>
//             Не найдено других пользователей для предоставления доступа к паролю.
//           </p>
//           <p className="mt-2">
//             <small className="text-gray-600">
//               Администратор должен создать другие учетные записи пользователей,
//               чтобы была возможность делиться паролями.
//             </small>
//           </p>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default ShareModal;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
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
      // Assurez-vous que tous les ID sont des chaînes
      const sharedWithIds = password.sharedWith.map((id) => String(id));
      setSelectedUsers(sharedWithIds);
    }
  }, [password]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users");

      // Фильтрация, чтобы не включать владельца пароля
      const filteredUsers = res.data.filter(
        (user) => String(user._id || user._id) !== String(password.userId)
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
    // Convertir en chaîne pour garantir la cohérence
    const userIdStr = String(userId);

    setSelectedUsers((prev) => {
      if (prev.includes(userIdStr)) {
        return prev.filter((id) => id !== userIdStr);
      } else {
        return [...prev, userIdStr];
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
            {users.map((user) => {
              // Utiliser _id s'il existe, sinon id, et le convertir en chaîne
              const userId = String(user._id || user._id);

              return (
                <label
                  key={userId}
                  className="checkbox-container mb-2 flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(userId)}
                    onChange={() => handleToggleUser(userId)}
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
              );
            })}
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
