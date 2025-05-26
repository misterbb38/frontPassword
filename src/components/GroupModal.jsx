// // src/components/GroupModal.jsx
// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import { FaUsers, FaSave } from "react-icons/fa";
// import api from "../utils/api";
// import { toast } from "react-toastify";

// const GroupModal = ({ group, onSave, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     color: "#3B82F6",
//     sharedWith: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Couleurs prédéfinies pour les groupes
//   const predefinedColors = [
//     { name: "Bleu", value: "#3B82F6" },
//     { name: "Vert", value: "#10B981" },
//     { name: "Rouge", value: "#EF4444" },
//     { name: "Orange", value: "#F59E0B" },
//     { name: "Violet", value: "#8B5CF6" },
//     { name: "Rose", value: "#EC4899" },
//     { name: "Indigo", value: "#6366F1" },
//     { name: "Gris", value: "#6B7280" },
//   ];

//   // Charger les utilisateurs pour le partage
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Préremplir le formulaire si on modifie un groupe existant
//   useEffect(() => {
//     if (group) {
//       setFormData({
//         name: group.name || "",
//         description: group.description || "",
//         color: group.color || "#3B82F6",
//         sharedWith: group.sharedWith || [],
//       });
//     }
//   }, [group]);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/api/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement des utilisateurs:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Effacer l'erreur quand l'utilisateur modifie le champ
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: null,
//       });
//     }
//   };

//   const handleUserToggle = (userId) => {
//     const userIdStr = String(userId);
//     setFormData((prev) => ({
//       ...prev,
//       sharedWith: prev.sharedWith.includes(userIdStr)
//         ? prev.sharedWith.filter((id) => id !== userIdStr)
//         : [...prev.sharedWith, userIdStr],
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Le nom du groupe est requis";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setLoading(true);
//       try {
//         await onSave(formData);
//       } catch (error) {
//         toast.error("Erreur lors de la sauvegarde du groupe");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <Modal
//       title={group ? "Modifier le groupe" : "Créer un nouveau groupe"}
//       onClose={onClose}
//       footer={
//         <>
//           <button
//             className="btn btn-secondary"
//             onClick={onClose}
//             disabled={loading}
//           >
//             Annuler
//           </button>
//           <button
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             <FaSave />{" "}
//             {loading ? "Sauvegarde..." : group ? "Sauvegarder" : "Créer"}
//           </button>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Nom du groupe *</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Ex: Réseaux sociaux, Banques, Travail..."
//             disabled={loading}
//           />
//           {errors.name && <small className="text-danger">{errors.name}</small>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description optionnelle du groupe"
//             rows="3"
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="color">Couleur du groupe</label>
//           <div className="flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
//             {predefinedColors.map((color) => (
//               <button
//                 key={color.value}
//                 type="button"
//                 className={`color-option ${
//                   formData.color === color.value ? "selected" : ""
//                 }`}
//                 style={{
//                   backgroundColor: color.value,
//                   width: "40px",
//                   height: "40px",
//                   border:
//                     formData.color === color.value
//                       ? "3px solid #000"
//                       : "1px solid #ccc",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setFormData({ ...formData, color: color.value })}
//                 title={color.name}
//                 disabled={loading}
//               />
//             ))}
//           </div>
//           <input
//             type="color"
//             id="color"
//             name="color"
//             value={formData.color}
//             onChange={handleChange}
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group">
//           <label>Partager avec les utilisateurs</label>
//           <div style={{ maxHeight: "200px", overflowY: "auto" }}>
//             {users.length > 0 ? (
//               users.map((user) => {
//                 const userId = String(user._id);
//                 return (
//                   <label
//                     key={userId}
//                     className="checkbox-container mb-2 flex items-center"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={formData.sharedWith.includes(userId)}
//                       onChange={() => handleUserToggle(userId)}
//                       disabled={loading}
//                     />
//                     <div>
//                       <strong>{user.username}</strong>
//                       <br />
//                       <small style={{ color: "#6c757d" }}>{user.email}</small>
//                       <span
//                         className={`user-role ${user.role} ml-2`}
//                         style={{ fontSize: "0.75rem" }}
//                       >
//                         {user.role}
//                       </span>
//                     </div>
//                   </label>
//                 );
//               })
//             ) : (
//               <p style={{ color: "#6c757d" }}>
//                 Aucun utilisateur disponible pour le partage
//               </p>
//             )}
//           </div>
//           <small style={{ color: "#6c757d" }}>
//             {formData.sharedWith.length === 0
//               ? "Ce groupe ne sera pas partagé"
//               : `Partagé avec ${formData.sharedWith.length} utilisateur(s)`}
//           </small>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default GroupModal;

// src/components/GroupModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaUsers, FaSave } from "react-icons/fa";
import api from "../utils/api";
import { toast } from "react-toastify";

const GroupModal = ({ group, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
    sharedWith: [],
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Предопределенные цвета для групп
  const predefinedColors = [
    { name: "Синий", value: "#3B82F6" },
    { name: "Зеленый", value: "#10B981" },
    { name: "Красный", value: "#EF4444" },
    { name: "Оранжевый", value: "#F59E0B" },
    { name: "Фиолетовый", value: "#8B5CF6" },
    { name: "Розовый", value: "#EC4899" },
    { name: "Индиго", value: "#6366F1" },
    { name: "Серый", value: "#6B7280" },
  ];

  // Загрузить пользователей для совместного доступа
  useEffect(() => {
    fetchUsers();
  }, []);

  // Заполнить форму при редактировании существующей группы
  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || "",
        description: group.description || "",
        color: group.color || "#3B82F6",
        sharedWith: group.sharedWith || [],
      });
    }
  }, [group]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Очистить ошибку когда пользователь изменяет поле
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleUserToggle = (userId) => {
    const userIdStr = String(userId);
    setFormData((prev) => ({
      ...prev,
      sharedWith: prev.sharedWith.includes(userIdStr)
        ? prev.sharedWith.filter((id) => id !== userIdStr)
        : [...prev.sharedWith, userIdStr],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Название группы обязательно";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        await onSave(formData);
      } catch (error) {
        toast.error("Ошибка при сохранении группы");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      title={group ? "Изменить группу" : "Создать новую группу"}
      onClose={onClose}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            <FaSave />{" "}
            {loading ? "Сохранение..." : group ? "Сохранить" : "Создать"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название группы *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Напр: Социальные сети, Банки, Работа..."
            disabled={loading}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Необязательное описание группы"
            rows="3"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Цвет группы</label>
          <div className="flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`color-option ${
                  formData.color === color.value ? "selected" : ""
                }`}
                style={{
                  backgroundColor: color.value,
                  width: "40px",
                  height: "40px",
                  border:
                    formData.color === color.value
                      ? "3px solid #000"
                      : "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => setFormData({ ...formData, color: color.value })}
                title={color.name}
                disabled={loading}
              />
            ))}
          </div>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Поделиться с пользователями</label>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {users.length > 0 ? (
              users.map((user) => {
                const userId = String(user._id);
                return (
                  <label
                    key={userId}
                    className="checkbox-container mb-2 flex items-center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.sharedWith.includes(userId)}
                      onChange={() => handleUserToggle(userId)}
                      disabled={loading}
                    />
                    <div>
                      <strong>{user.username}</strong>
                      <br />
                      <small style={{ color: "#6c757d" }}>{user.email}</small>
                      <span
                        className={`user-role ${user.role} ml-2`}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {user.role}
                      </span>
                    </div>
                  </label>
                );
              })
            ) : (
              <p style={{ color: "#6c757d" }}>
                Нет доступных пользователей для совместного доступа
              </p>
            )}
          </div>
          <small style={{ color: "#6c757d" }}>
            {formData.sharedWith.length === 0
              ? "Эта группа не будет открыта для совместного доступа"
              : `Открыто для ${formData.sharedWith.length} пользователя(ей)`}
          </small>
        </div>
      </form>
    </Modal>
  );
};

export default GroupModal;
