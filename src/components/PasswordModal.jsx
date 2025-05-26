// // import React, { useState, useEffect } from "react";
// // import Modal from "./Modal";
// // import { FaKey, FaSave } from "react-icons/fa";

// // const PasswordModal = ({ password, onSave, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     username: "",
// //     password: "",
// //     url: "",
// //     notes: "",
// //   });
// //   const [errors, setErrors] = useState({});

// //   // Предзаполнить форму, если мы изменяем существующий пароль
// //   useEffect(() => {
// //     if (password) {
// //       setFormData({
// //         title: password.title || "",
// //         username: password.username || "",
// //         password: password.password || "",
// //         url: password.url || "",
// //         notes: password.notes || "",
// //       });
// //     }
// //   }, [password]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });

// //     // Очистить ошибку, когда пользователь изменяет поле
// //     if (errors[name]) {
// //       setErrors({
// //         ...errors,
// //         [name]: null,
// //       });
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.title.trim()) {
// //       newErrors.title = "Название обязательно";
// //     }

// //     if (!formData.username.trim()) {
// //       newErrors.username = "Имя пользователя обязательно";
// //     }

// //     if (!formData.password.trim()) {
// //       newErrors.password = "Пароль обязателен";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (validateForm()) {
// //       onSave(formData);
// //     }
// //   };

// //   return (
// //     <Modal
// //       title={password ? "Изменить пароль" : "Добавить новый пароль"}
// //       onClose={onClose}
// //       footer={
// //         <>
// //           <button className="btn btn-secondary" onClick={onClose}>
// //             Отмена
// //           </button>
// //           <button className="btn btn-primary" onClick={handleSubmit}>
// //             <FaSave /> {password ? "Сохранить" : "Добавить"}
// //           </button>
// //         </>
// //       }
// //     >
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label htmlFor="title">Название</label>
// //           <input
// //             type="text"
// //             id="title"
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             placeholder="Например: Gmail, Facebook, Банковский счет..."
// //           />
// //           {errors.title && (
// //             <small className="text-danger">{errors.title}</small>
// //           )}
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="username">Имя пользователя</label>
// //           <input
// //             type="text"
// //             id="username"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleChange}
// //             placeholder="Например: john.doe@example.com"
// //           />
// //           {errors.username && (
// //             <small className="text-danger">{errors.username}</small>
// //           )}
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="password">Пароль</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             placeholder="Введите ваш пароль"
// //           />
// //           {errors.password && (
// //             <small className="text-danger">{errors.password}</small>
// //           )}
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="url">URL (необязательно)</label>
// //           <input
// //             type="url"
// //             id="url"
// //             name="url"
// //             value={formData.url}
// //             onChange={handleChange}
// //             placeholder="Например: https://mail.google.com"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="notes">Заметки (необязательно)</label>
// //           <textarea
// //             id="notes"
// //             name="notes"
// //             value={formData.notes}
// //             onChange={handleChange}
// //             placeholder="Добавьте заметки или дополнительную информацию"
// //             rows="4"
// //           ></textarea>
// //         </div>
// //       </form>
// //     </Modal>
// //   );
// // };

// // export default PasswordModal;

// // src/components/PasswordModal.jsx
// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import { FaKey, FaSave } from "react-icons/fa";
// import api from "../utils/api";

// const PasswordModal = ({ password, onSave, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     username: "",
//     password: "",
//     url: "",
//     notes: "",
//     groupId: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [groups, setGroups] = useState([]);

//   // Charger les groupes disponibles
//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   // Préremplir le formulaire si on modifie un mot de passe existant
//   useEffect(() => {
//     if (password) {
//       setFormData({
//         title: password.title || "",
//         username: password.username || "",
//         password: password.password || "",
//         url: password.url || "",
//         notes: password.notes || "",
//         groupId: password.groupId?._id || password.groupId || "",
//       });
//     }
//   }, [password]);

//   const fetchGroups = async () => {
//     try {
//       const res = await api.get("/api/groups");
//       setGroups(res.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement des groupes:", error);
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

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) {
//       newErrors.title = "Le titre est requis";
//     }

//     if (!formData.username.trim()) {
//       newErrors.username = "Le nom d'utilisateur est requis";
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = "Le mot de passe est requis";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Convertir groupId vide en null
//       const dataToSend = {
//         ...formData,
//         groupId: formData.groupId || null,
//       };
//       onSave(dataToSend);
//     }
//   };

//   return (
//     <Modal
//       title={
//         password
//           ? "Modifier le mot de passe"
//           : "Ajouter un nouveau mot de passe"
//       }
//       onClose={onClose}
//       footer={
//         <>
//           <button className="btn btn-secondary" onClick={onClose}>
//             Annuler
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             <FaSave /> {password ? "Sauvegarder" : "Ajouter"}
//           </button>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Titre</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Ex: Gmail, Facebook, Compte bancaire..."
//           />
//           {errors.title && (
//             <small className="text-danger">{errors.title}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="username">Nom d'utilisateur</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Ex: john.doe@example.com"
//           />
//           {errors.username && (
//             <small className="text-danger">{errors.username}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Mot de passe</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Saisissez votre mot de passe"
//           />
//           {errors.password && (
//             <small className="text-danger">{errors.password}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="groupId">Groupe (optionnel)</label>
//           <select
//             id="groupId"
//             name="groupId"
//             value={formData.groupId}
//             onChange={handleChange}
//           >
//             <option value="">Aucun groupe</option>
//             {groups.map((group) => (
//               <option key={group._id} value={group._id}>
//                 {group.name}
//               </option>
//             ))}
//           </select>
//           <small style={{ color: "#6c757d" }}>
//             Sélectionnez un groupe pour organiser ce mot de passe
//           </small>
//         </div>

//         <div className="form-group">
//           <label htmlFor="url">URL (optionnel)</label>
//           <input
//             type="url"
//             id="url"
//             name="url"
//             value={formData.url}
//             onChange={handleChange}
//             placeholder="Ex: https://mail.google.com"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="notes">Notes (optionnel)</label>
//           <textarea
//             id="notes"
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             placeholder="Ajoutez des notes ou des informations supplémentaires"
//             rows="4"
//           ></textarea>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default PasswordModal;

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../utils/api";
import { toast } from "react-toastify";

const PasswordModal = ({ password, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
    groupId: "",
    sharedWith: [],
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les utilisateurs et groupes
  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  // Préremplir le formulaire si on modifie un mot de passe existant
  useEffect(() => {
    if (password) {
      setFormData({
        title: password.title || "",
        username: password.username || "",
        password: password.password || "",
        url: password.url || "",
        notes: password.notes || "",
        groupId: password.groupId?._id || "",
        sharedWith: password.sharedWith || [],
      });
    }
  }, [password]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await api.get("/api/groups");
      setGroups(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des groupes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Effacer l'erreur quand l'utilisateur modifie le champ
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

  const generatePassword = () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        await onSave({
          ...formData,
          groupId: formData.groupId || null, // Envoyer null si pas de groupe sélectionné
        });
      } catch (error) {
        toast.error("Erreur lors de la sauvegarde du mot de passe");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      title={password ? "Modifier le mot de passe" : "Ajouter un mot de passe"}
      onClose={onClose}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            <FaSave />{" "}
            {loading ? "Sauvegarde..." : password ? "Modifier" : "Ajouter"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Facebook, Gmail..."
            disabled={loading}
          />
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="groupId">Groupe (optionnel)</label>
          <select
            id="groupId"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Aucun groupe</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Votre nom d'utilisateur ou email"
            disabled={loading}
          />
          {errors.username && (
            <small className="text-danger">{errors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe *</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez le mot de passe"
              disabled={loading}
            />
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={generatePassword}
              disabled={loading}
            >
              Générer
            </button>
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes optionnelles..."
            rows="3"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Partager avec les utilisateurs</label>
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
                Aucun utilisateur disponible pour le partage
              </p>
            )}
          </div>
          <small style={{ color: "#6c757d" }}>
            {formData.sharedWith.length === 0
              ? "Ce mot de passe ne sera pas partagé"
              : `Partagé avec ${formData.sharedWith.length} utilisateur(s)`}
          </small>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
