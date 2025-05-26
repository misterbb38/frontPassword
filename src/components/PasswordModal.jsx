// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import { FaKey, FaSave } from "react-icons/fa";

// const PasswordModal = ({ password, onSave, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     username: "",
//     password: "",
//     url: "",
//     notes: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Предзаполнить форму, если мы изменяем существующий пароль
//   useEffect(() => {
//     if (password) {
//       setFormData({
//         title: password.title || "",
//         username: password.username || "",
//         password: password.password || "",
//         url: password.url || "",
//         notes: password.notes || "",
//       });
//     }
//   }, [password]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Очистить ошибку, когда пользователь изменяет поле
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
//       newErrors.title = "Название обязательно";
//     }

//     if (!formData.username.trim()) {
//       newErrors.username = "Имя пользователя обязательно";
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = "Пароль обязателен";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       onSave(formData);
//     }
//   };

//   return (
//     <Modal
//       title={password ? "Изменить пароль" : "Добавить новый пароль"}
//       onClose={onClose}
//       footer={
//         <>
//           <button className="btn btn-secondary" onClick={onClose}>
//             Отмена
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             <FaSave /> {password ? "Сохранить" : "Добавить"}
//           </button>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Название</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Например: Gmail, Facebook, Банковский счет..."
//           />
//           {errors.title && (
//             <small className="text-danger">{errors.title}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="username">Имя пользователя</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Например: john.doe@example.com"
//           />
//           {errors.username && (
//             <small className="text-danger">{errors.username}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Пароль</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Введите ваш пароль"
//           />
//           {errors.password && (
//             <small className="text-danger">{errors.password}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="url">URL (необязательно)</label>
//           <input
//             type="url"
//             id="url"
//             name="url"
//             value={formData.url}
//             onChange={handleChange}
//             placeholder="Например: https://mail.google.com"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="notes">Заметки (необязательно)</label>
//           <textarea
//             id="notes"
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             placeholder="Добавьте заметки или дополнительную информацию"
//             rows="4"
//           ></textarea>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default PasswordModal;

// src/components/PasswordModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaKey, FaSave } from "react-icons/fa";
import api from "../utils/api";

const PasswordModal = ({ password, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
    groupId: "",
  });
  const [errors, setErrors] = useState({});
  const [groups, setGroups] = useState([]);

  // Charger les groupes disponibles
  useEffect(() => {
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
        groupId: password.groupId?._id || password.groupId || "",
      });
    }
  }, [password]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convertir groupId vide en null
      const dataToSend = {
        ...formData,
        groupId: formData.groupId || null,
      };
      onSave(dataToSend);
    }
  };

  return (
    <Modal
      title={
        password
          ? "Modifier le mot de passe"
          : "Ajouter un nouveau mot de passe"
      }
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <FaSave /> {password ? "Sauvegarder" : "Ajouter"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Gmail, Facebook, Compte bancaire..."
          />
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ex: john.doe@example.com"
          />
          {errors.username && (
            <small className="text-danger">{errors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Saisissez votre mot de passe"
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="groupId">Groupe (optionnel)</label>
          <select
            id="groupId"
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
          >
            <option value="">Aucun groupe</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </select>
          <small style={{ color: "#6c757d" }}>
            Sélectionnez un groupe pour organiser ce mot de passe
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="url">URL (optionnel)</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Ex: https://mail.google.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (optionnel)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ajoutez des notes ou des informations supplémentaires"
            rows="4"
          ></textarea>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
