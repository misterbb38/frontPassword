// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import { FaUser, FaSave } from "react-icons/fa";

// const UserModal = ({ user, onSave, onClose }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [errors, setErrors] = useState({});

//   // Pré-remplir le formulaire si nous modifions un utilisateur existant
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         username: user.username || "",
//         email: user.email || "",
//         password: "", // Ne pas pré-remplir le mot de passe
//         role: user.role || "user",
//       });
//     }
//   }, [user]);

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

//     if (!formData.username.trim()) {
//       newErrors.username = "Le nom d'utilisateur est requis";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "L'email est requis";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "L'email est invalide";
//     }

//     if (!user && !formData.password.trim()) {
//       newErrors.password =
//         "Le mot de passe est requis pour un nouvel utilisateur";
//     } else if (formData.password && formData.password.length < 6) {
//       newErrors.password =
//         "Le mot de passe doit contenir au moins 6 caractères";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const userData = { ...formData };

//       // Ne pas envoyer le mot de passe s'il est vide (édition d'utilisateur)
//       if (!userData.password) {
//         delete userData.password;
//       }

//       onSave(userData);
//     }
//   };

//   return (
//     <Modal
//       title={user ? "Modifier l'utilisateur" : "Ajouter un nouvel utilisateur"}
//       onClose={onClose}
//       footer={
//         <>
//           <button className="btn btn-secondary" onClick={onClose}>
//             Annuler
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmit}>
//             <FaSave /> {user ? "Enregistrer" : "Ajouter"}
//           </button>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Nom d'utilisateur</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Ex: johndoe"
//           />
//           {errors.username && (
//             <small className="text-danger">{errors.username}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Ex: john.doe@twowin.fr"
//           />
//           {errors.email && (
//             <small className="text-danger">{errors.email}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">
//             {user
//               ? "Mot de passe (laisser vide pour ne pas changer)"
//               : "Mot de passe"}
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder={
//               user
//                 ? "Laisser vide pour conserver le mot de passe actuel"
//                 : "Nouveau mot de passe"
//             }
//           />
//           {errors.password && (
//             <small className="text-danger">{errors.password}</small>
//           )}
//         </div>

//         <div className="form-group">
//           <label htmlFor="role">Rôle</label>
//           <select
//             id="role"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//           >
//             <option value="user">Utilisateur</option>
//             <option value="admin">Administrateur</option>
//           </select>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default UserModal;

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaUser, FaSave } from "react-icons/fa";

const UserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});

  // Предзаполнить форму, если мы изменяем существующего пользователя
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "", // Не предзаполнять пароль
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Очистить ошибку, когда пользователь изменяет поле
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email недействителен";
    }

    if (!user && !formData.password.trim()) {
      newErrors.password = "Пароль обязателен для нового пользователя";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = { ...formData };

      // Не отправлять пароль, если он пуст (редактирование пользователя)
      if (!userData.password) {
        delete userData.password;
      }

      onSave(userData);
    }
  };

  return (
    <Modal
      title={user ? "Изменить пользователя" : "Добавить нового пользователя"}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Отмена
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <FaSave /> {user ? "Сохранить" : "Добавить"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Например: johndoe"
          />
          {errors.username && (
            <small className="text-danger">{errors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Например: john.doe@twowin.ru"
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            {user ? "Пароль (оставьте пустым, чтобы не менять)" : "Пароль"}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              user
                ? "Оставьте пустым, чтобы сохранить текущий пароль"
                : "Новый пароль"
            }
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Роль</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
