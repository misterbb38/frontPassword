// // // src/components/GroupModal.jsx
// // import React, { useState, useEffect } from "react";
// // import Modal from "./Modal";
// // import { FaUsers, FaSave } from "react-icons/fa";
// // import api from "../utils/api";
// // import { toast } from "react-toastify";

// // const GroupModal = ({ group, onSave, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     description: "",
// //     color: "#3B82F6",
// //     sharedWith: [],
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Предопределенные цвета для групп
// //   const predefinedColors = [
// //     { name: "Синий", value: "#3B82F6" },
// //     { name: "Зеленый", value: "#10B981" },
// //     { name: "Красный", value: "#EF4444" },
// //     { name: "Оранжевый", value: "#F59E0B" },
// //     { name: "Фиолетовый", value: "#8B5CF6" },
// //     { name: "Розовый", value: "#EC4899" },
// //     { name: "Индиго", value: "#6366F1" },
// //     { name: "Серый", value: "#6B7280" },
// //   ];

// //   // Загрузить пользователей для совместного доступа
// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   // Заполнить форму при редактировании существующей группы
// //   useEffect(() => {
// //     if (group) {
// //       setFormData({
// //         name: group.name || "",
// //         description: group.description || "",
// //         color: group.color || "#3B82F6",
// //         sharedWith: group.sharedWith || [],
// //       });
// //     }
// //   }, [group]);

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await api.get("/api/users");
// //       setUsers(res.data);
// //     } catch (error) {
// //       console.error("Ошибка при загрузке пользователей:", error);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });

// //     // Очистить ошибку когда пользователь изменяет поле
// //     if (errors[name]) {
// //       setErrors({
// //         ...errors,
// //         [name]: null,
// //       });
// //     }
// //   };

// //   const handleUserToggle = (userId) => {
// //     const userIdStr = String(userId);
// //     setFormData((prev) => ({
// //       ...prev,
// //       sharedWith: prev.sharedWith.includes(userIdStr)
// //         ? prev.sharedWith.filter((id) => id !== userIdStr)
// //         : [...prev.sharedWith, userIdStr],
// //     }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.name.trim()) {
// //       newErrors.name = "Название группы обязательно";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (validateForm()) {
// //       setLoading(true);
// //       try {
// //         await onSave(formData);
// //       } catch (error) {
// //         toast.error("Ошибка при сохранении группы");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   return (
// //     <Modal
// //       title={group ? "Изменить группу" : "Создать новую группу"}
// //       onClose={onClose}
// //       footer={
// //         <>
// //           <button
// //             className="btn btn-secondary"
// //             onClick={onClose}
// //             disabled={loading}
// //           >
// //             Отмена
// //           </button>
// //           <button
// //             className="btn btn-primary"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //           >
// //             <FaSave />{" "}
// //             {loading ? "Сохранение..." : group ? "Сохранить" : "Создать"}
// //           </button>
// //         </>
// //       }
// //     >
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label htmlFor="name">Название группы *</label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             placeholder="Напр: Социальные сети, Банки, Работа..."
// //             disabled={loading}
// //           />
// //           {errors.name && <small className="text-danger">{errors.name}</small>}
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="description">Описание</label>
// //           <textarea
// //             id="description"
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             placeholder="Необязательное описание группы"
// //             rows="3"
// //             disabled={loading}
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="color">Цвет группы</label>
// //           <div className="flex gap-2 mb-2" style={{ flexWrap: "wrap" }}>
// //             {predefinedColors.map((color) => (
// //               <button
// //                 key={color.value}
// //                 type="button"
// //                 className={`color-option ${
// //                   formData.color === color.value ? "selected" : ""
// //                 }`}
// //                 style={{
// //                   backgroundColor: color.value,
// //                   width: "40px",
// //                   height: "40px",
// //                   border:
// //                     formData.color === color.value
// //                       ? "3px solid #000"
// //                       : "1px solid #ccc",
// //                   borderRadius: "8px",
// //                   cursor: "pointer",
// //                 }}
// //                 onClick={() => setFormData({ ...formData, color: color.value })}
// //                 title={color.name}
// //                 disabled={loading}
// //               />
// //             ))}
// //           </div>
// //           <input
// //             type="color"
// //             id="color"
// //             name="color"
// //             value={formData.color}
// //             onChange={handleChange}
// //             disabled={loading}
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label>Поделиться с пользователями</label>
// //           <div style={{ maxHeight: "200px", overflowY: "auto" }}>
// //             {users.length > 0 ? (
// //               users.map((user) => {
// //                 const userId = String(user._id);
// //                 return (
// //                   <label
// //                     key={userId}
// //                     className="checkbox-container mb-2 flex items-center"
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "10px",
// //                     }}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={formData.sharedWith.includes(userId)}
// //                       onChange={() => handleUserToggle(userId)}
// //                       disabled={loading}
// //                     />
// //                     <div>
// //                       <strong>{user.username}</strong>
// //                       <br />
// //                       <small style={{ color: "#6c757d" }}>{user.email}</small>
// //                       <span
// //                         className={`user-role ${user.role} ml-2`}
// //                         style={{ fontSize: "0.75rem" }}
// //                       >
// //                         {user.role}
// //                       </span>
// //                     </div>
// //                   </label>
// //                 );
// //               })
// //             ) : (
// //               <p style={{ color: "#6c757d" }}>
// //                 Нет доступных пользователей для совместного доступа
// //               </p>
// //             )}
// //           </div>
// //           <small style={{ color: "#6c757d" }}>
// //             {formData.sharedWith.length === 0
// //               ? "Эта группа не будет открыта для совместного доступа"
// //               : `Открыто для ${formData.sharedWith.length} пользователя(ей)`}
// //           </small>
// //         </div>
// //       </form>
// //     </Modal>
// //   );
// // };

// // export default GroupModal;

// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { FaSave } from "react-icons/fa";

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

//   const predefinedColors = [
//     { name: "Синий", value: "#3B82F6" },
//     { name: "Зеленый", value: "#10B981" },
//     { name: "Красный", value: "#EF4444" },
//     { name: "Оранжевый", value: "#F59E0B" },
//     { name: "Фиолетовый", value: "#8B5CF6" },
//     { name: "Розовый", value: "#EC4899" },
//     { name: "Индиго", value: "#6366F1" },
//     { name: "Серый", value: "#6B7280" },
//   ];

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await api.get("/api/users");
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Ошибка при загрузке пользователей:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: null });
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
//       newErrors.name = "Название группы обязательно";
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
//         toast.error("Ошибка при сохранении группы");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <Modal
//       title={group ? "Изменить группу" : "Создать новую группу"}
//       onClose={onClose}
//       footer={
//         <>
//           <button
//             className="btn btn-secondary"
//             onClick={onClose}
//             disabled={loading}
//           >
//             Отмена
//           </button>
//           <button
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             <FaSave />{" "}
//             {loading ? "Сохранение..." : group ? "Сохранить" : "Создать"}
//           </button>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Название группы *</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Напр: Социальные сети, Банки, Работа..."
//             disabled={loading}
//           />
//           {errors.name && <small className="text-danger">{errors.name}</small>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Описание</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Необязательное описание группы"
//             rows="3"
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group">
//           <label>Поделиться с пользователями</label>
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
//                       cursor: "pointer",
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
//                 Нет доступных пользователей для совместного доступа
//               </p>
//             )}
//           </div>
//           <small style={{ color: "#6c757d" }}>
//             {formData.sharedWith.length === 0
//               ? "Эта группа не будет открыта для совместного доступа"
//               : `Открыто для ${formData.sharedWith.length} пользователя(ей)`}
//           </small>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default GroupModal;

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../utils/api";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import PropTypes from "prop-types";

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
  const [loadingUsers, setLoadingUsers] = useState(true);

  const predefinedColors = [
    { name: "Синий", value: "#3B82F6" },
    { name: "Зеленый", value: "#10B981" },
    { name: "Красный", value: "#EF4444" },
    { name: "Оранжевый", value: "#F59E0B" },
    { name: "Фиолетовый", value: "#8B5CF6" },
    { name: "Розовый", value: "#EC4899" },
    { name: "Индиго", value: "#6366F1" },
    { name: "Серый", value: "#6B7280" },
    { name: "Изумрудный", value: "#059669" },
    { name: "Желтый", value: "#EAB308" },
    { name: "Голубой", value: "#0EA5E9" },
    { name: "Лиловый", value: "#A855F7" },
  ];

  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await api.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
        toast.error("Ошибка при загрузке пользователей");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Initialiser le formulaire avec les données du groupe existant
  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || "",
        description: group.description || "",
        color: group.color || "#3B82F6",
        sharedWith: group.sharedWith || [],
      });
    } else {
      // Réinitialiser pour un nouveau groupe
      setFormData({
        name: "",
        description: "",
        color: "#3B82F6",
        sharedWith: [],
      });
    }
    setErrors({});
  }, [group]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleColorSelect = (color) => {
    setFormData({ ...formData, color });
    if (errors.color) {
      setErrors({ ...errors, color: null });
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
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Название должно содержать минимум 2 символа";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Название не должно превышать 50 символов";
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = "Описание не должно превышать 200 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Ошибка при сохранении группы:", error);
      toast.error("Ошибка при сохранении группы");
    } finally {
      setLoading(false);
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
            type="button"
          >
            Отмена
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !formData.name.trim()}
            type="button"
          >
            <FaSave style={{ marginRight: "0.5rem" }} />
            {loading ? "Сохранение..." : group ? "Сохранить" : "Создать"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {/* Nom du groupe */}
        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Название группы *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Напр: Социальные сети, Банки, Работа..."
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${errors.name ? "#dc3545" : "#ced4da"}`,
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
          {errors.name && (
            <small
              style={{
                color: "#dc3545",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              {errors.name}
            </small>
          )}
        </div>

        {/* Description */}
        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Необязательное описание группы"
            rows="3"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${errors.description ? "#dc3545" : "#ced4da"}`,
              borderRadius: "4px",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />
          {errors.description && (
            <small
              style={{
                color: "#dc3545",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              {errors.description}
            </small>
          )}
        </div>

        {/* Sélecteur de couleur */}
        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Цвет группы
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "0.5rem",
            }}
          >
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorSelect(color.value)}
                disabled={loading}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: color.value,
                  border:
                    formData.color === color.value
                      ? "3px solid #000"
                      : "2px solid #e9ecef",
                  borderRadius: "50%",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  position: "relative",
                }}
                title={color.name}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "#6c757d" }}>
              Выбранный цвет:
            </span>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: formData.color,
                border: "1px solid #e9ecef",
                borderRadius: "4px",
              }}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              {predefinedColors.find((c) => c.value === formData.color)?.name ||
                "Пользовательский"}
            </span>
          </div>
        </div>

        {/* Partage avec utilisateurs */}
        <div className="form-group">
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            Поделиться с пользователями
          </label>

          {loadingUsers ? (
            <div
              style={{ padding: "1rem", textAlign: "center", color: "#6c757d" }}
            >
              Загрузка пользователей...
            </div>
          ) : users.length > 0 ? (
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #e9ecef",
                borderRadius: "4px",
                padding: "0.5rem",
              }}
            >
              {users.map((user) => {
                const userId = String(user._id);
                const isChecked = formData.sharedWith.includes(userId);

                return (
                  <label
                    key={userId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      cursor: "pointer",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      backgroundColor: isChecked ? "#f8f9fa" : "transparent",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleUserToggle(userId)}
                      disabled={loading}
                      style={{ cursor: "pointer" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        {user.username}
                      </div>
                      <div style={{ color: "#6c757d", fontSize: "0.8rem" }}>
                        {user.email}
                      </div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.1rem 0.3rem",
                          borderRadius: "3px",
                          backgroundColor:
                            user.role === "admin" ? "#dc3545" : "#6c757d",
                          color: "white",
                        }}
                      >
                        {user.role}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          ) : (
            <p
              style={{ color: "#6c757d", padding: "1rem", textAlign: "center" }}
            >
              Нет доступных пользователей для совместного доступа
            </p>
          )}

          <small
            style={{ color: "#6c757d", display: "block", marginTop: "0.5rem" }}
          >
            {formData.sharedWith.length === 0
              ? "Эта группа не будет открыта для совместного доступа"
              : `Открыто для ${formData.sharedWith.length} пользователя(ей)`}
          </small>
        </div>
      </form>
    </Modal>
  );
};

GroupModal.propTypes = {
  group: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GroupModal;
