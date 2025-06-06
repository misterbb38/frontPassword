// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { FaSave, FaSpinner, FaKey, FaSearch, FaPlus } from "react-icons/fa";
// import PropTypes from "prop-types";

// const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
//   const [allPasswords, setAllPasswords] = useState([]);
//   const [filteredPasswords, setFilteredPasswords] = useState([]);
//   const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   // État pour le formulaire de création
//   const [newPassword, setNewPassword] = useState({
//     title: "",
//     username: "",
//     password: "",
//     url: "",
//     notes: "",
//   });
//   const [creating, setCreating] = useState(false);

//   // Charger TOUS les mots de passe de l'utilisateur
//   const fetchAllPasswords = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       console.log("🔄 Chargement de tous les mots de passe...");

//       const res = await api.get("/api/passwords");
//       console.log("✅ Mots de passe reçus:", res.data.length);

//       setAllPasswords(res.data);
//       setFilteredPasswords(res.data);
//     } catch (error) {
//       console.error("❌ Erreur lors du chargement:", error);
//       setError("Ошибка при загрузке паролей");
//       toast.error("Ошибка при загрузке паролей.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (groupId) {
//       fetchAllPasswords();
//     }
//   }, [groupId]);

//   // Filtrer les mots de passe selon le terme de recherche
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredPasswords(allPasswords);
//     } else {
//       const filtered = allPasswords.filter(
//         (password) =>
//           password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (password.url &&
//             password.url.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredPasswords(filtered);
//     }
//   }, [searchTerm, allPasswords]);

//   const handleTogglePassword = (passwordId) => {
//     setSelectedPasswordIds((prev) =>
//       prev.includes(passwordId)
//         ? prev.filter((id) => id !== passwordId)
//         : [...prev, passwordId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (
//       selectedPasswordIds.length === filteredPasswords.length &&
//       filteredPasswords.length > 0
//     ) {
//       setSelectedPasswordIds([]);
//     } else {
//       setSelectedPasswordIds(filteredPasswords.map((p) => p._id));
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleCreatePassword = async () => {
//     if (!newPassword.title || !newPassword.username || !newPassword.password) {
//       toast.error(
//         "Пожалуйста, заполните обязательные поля (название, имя пользователя, пароль)"
//       );
//       return;
//     }

//     setCreating(true);
//     try {
//       console.log("🆕 Создание нового пароля...");

//       const response = await api.post("/api/passwords", {
//         ...newPassword,
//         groupId: groupId,
//       });

//       console.log("✅ Пароль создан:", response.data);

//       toast.success(
//         `Пароль "${newPassword.title}" создан и добавлен в группу!`
//       );

//       setNewPassword({
//         title: "",
//         username: "",
//         password: "",
//         url: "",
//         notes: "",
//       });
//       setShowCreateForm(false);

//       onSave();
//     } catch (error) {
//       console.error("❌ Ошибка создания пароля:", error);
//       const errorMessage =
//         error.response?.data?.msg || "Ошибка при создании пароля";
//       toast.error(errorMessage);
//     } finally {
//       setCreating(false);
//     }
//   };

//   const handleSubmitExisting = async () => {
//     if (selectedPasswordIds.length === 0) {
//       toast.info("Пожалуйста, выберите хотя бы один пароль.");
//       return;
//     }

//     setSaving(true);
//     try {
//       console.log("📤 Добавление паролей в группу...");

//       const response = await api.put(`/api/groups/${groupId}/add-passwords`, {
//         passwordIds: selectedPasswordIds,
//       });

//       console.log("✅ Пароли добавлены:", response.data);

//       toast.success(
//         `${selectedPasswordIds.length} пароль(ей) добавлено в группу!`
//       );
//       onSave();
//     } catch (error) {
//       console.error("❌ Ошибка добавления паролей:", error);
//       const errorMessage =
//         error.response?.data?.msg || "Ошибка при добавлении паролей";
//       toast.error(errorMessage);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const allFilteredSelected =
//     filteredPasswords.length > 0 &&
//     selectedPasswordIds.length === filteredPasswords.length;
//   const someFilteredSelected = selectedPasswordIds.length > 0;

//   return (
//     <Modal
//       title="Добавить пароли в группу"
//       onClose={onClose}
//       footer={
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: "0.5rem",
//             width: "100%",
//           }}
//         >
//           <button
//             className="btn btn-secondary"
//             onClick={onClose}
//             disabled={saving || creating}
//             type="button"
//           >
//             Отмена
//           </button>

//           {showCreateForm ? (
//             <button
//               className="btn btn-success"
//               onClick={handleCreatePassword}
//               disabled={
//                 creating ||
//                 !newPassword.title ||
//                 !newPassword.username ||
//                 !newPassword.password
//               }
//               type="button"
//             >
//               {creating ? (
//                 <>
//                   <FaSpinner
//                     style={{
//                       marginRight: "0.5rem",
//                       animation: "spin 1s linear infinite",
//                     }}
//                   />
//                   Создание...
//                 </>
//               ) : (
//                 <>
//                   <FaSave style={{ marginRight: "0.5rem" }} />
//                   Создать пароль
//                 </>
//               )}
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary"
//               onClick={handleSubmitExisting}
//               disabled={saving || selectedPasswordIds.length === 0}
//               type="button"
//             >
//               {saving ? (
//                 <>
//                   <FaSpinner
//                     style={{
//                       marginRight: "0.5rem",
//                       animation: "spin 1s linear infinite",
//                     }}
//                   />
//                   Добавление...
//                 </>
//               ) : (
//                 <>
//                   <FaSave style={{ marginRight: "0.5rem" }} />
//                   Добавить ({selectedPasswordIds.length})
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       }
//     >
//       {loading ? (
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <FaSpinner
//             size={24}
//             style={{
//               animation: "spin 1s linear infinite",
//               marginBottom: "1rem",
//             }}
//           />
//           <p>Загрузка ваших паролей...</p>
//         </div>
//       ) : error ? (
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <p style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</p>
//           <button
//             className="btn btn-secondary"
//             onClick={fetchAllPasswords}
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "0.5rem",
//             }}
//           >
//             🔄 Попробовать снова
//           </button>
//         </div>
//       ) : showCreateForm ? (
//         // Formulaire de création de mot de passe
//         <div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "1rem",
//             }}
//           >
//             <h4 style={{ margin: 0 }}>Создать новый пароль</h4>
//             <button
//               className="btn btn-secondary btn-sm"
//               onClick={() => setShowCreateForm(false)}
//               type="button"
//             >
//               ← Назад к списку
//             </button>
//           </div>

//           <div style={{ display: "grid", gap: "1rem" }}>
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Название *
//               </label>
//               <input
//                 type="text"
//                 value={newPassword.title}
//                 onChange={(e) =>
//                   setNewPassword((prev) => ({ ...prev, title: e.target.value }))
//                 }
//                 placeholder="Например: Gmail, Facebook..."
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ced4da",
//                   borderRadius: "4px",
//                   fontSize: "1rem",
//                 }}
//                 autoFocus
//               />
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Имя пользователя *
//               </label>
//               <input
//                 type="text"
//                 value={newPassword.username}
//                 onChange={(e) =>
//                   setNewPassword((prev) => ({
//                     ...prev,
//                     username: e.target.value,
//                   }))
//                 }
//                 placeholder="Имя пользователя или email"
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ced4da",
//                   borderRadius: "4px",
//                   fontSize: "1rem",
//                 }}
//               />
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Пароль *
//               </label>
//               <input
//                 type="password"
//                 value={newPassword.password}
//                 onChange={(e) =>
//                   setNewPassword((prev) => ({
//                     ...prev,
//                     password: e.target.value,
//                   }))
//                 }
//                 placeholder="Пароль"
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ced4da",
//                   borderRadius: "4px",
//                   fontSize: "1rem",
//                 }}
//               />
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 URL (необязательно)
//               </label>
//               <input
//                 type="url"
//                 value={newPassword.url}
//                 onChange={(e) =>
//                   setNewPassword((prev) => ({ ...prev, url: e.target.value }))
//                 }
//                 placeholder="https://example.com"
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ced4da",
//                   borderRadius: "4px",
//                   fontSize: "1rem",
//                 }}
//               />
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Заметки (необязательно)
//               </label>
//               <textarea
//                 value={newPassword.notes}
//                 onChange={(e) =>
//                   setNewPassword((prev) => ({ ...prev, notes: e.target.value }))
//                 }
//                 placeholder="Дополнительные заметки..."
//                 rows="3"
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ced4da",
//                   borderRadius: "4px",
//                   fontSize: "1rem",
//                   resize: "vertical",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       ) : allPasswords.length === 0 ? (
//         // Aucun mot de passe
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <FaKey size={40} color="#6c757d" style={{ marginBottom: "1rem" }} />
//           <p
//             style={{
//               color: "#6c757d",
//               fontSize: "1.1rem",
//               marginBottom: "1rem",
//             }}
//           >
//             У вас пока нет паролей.
//           </p>
//           <small
//             style={{
//               color: "#6c757d",
//               marginBottom: "1.5rem",
//               display: "block",
//             }}
//           >
//             Создайте свой первый пароль.
//           </small>

//           <button
//             className="btn btn-success"
//             onClick={() => setShowCreateForm(true)}
//             type="button"
//             style={{ fontSize: "1rem", padding: "0.75rem 1.5rem" }}
//           >
//             <FaPlus style={{ marginRight: "0.5rem" }} />
//             Создать первый пароль
//           </button>
//         </div>
//       ) : (
//         // Liste des mots de passe
//         <div className="form-group">
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "1rem",
//             }}
//           >
//             <label style={{ fontWeight: "bold", margin: 0 }}>
//               Выберите пароли для добавления в группу:
//             </label>
//             <button
//               className="btn btn-success btn-sm"
//               onClick={() => setShowCreateForm(true)}
//               type="button"
//             >
//               <FaPlus style={{ marginRight: "0.5rem" }} />
//               Создать новый
//             </button>
//           </div>

//           {/* Info */}
//           <div
//             style={{
//               backgroundColor: "#e3f2fd",
//               padding: "0.75rem",
//               borderRadius: "4px",
//               marginBottom: "1rem",
//               fontSize: "0.9rem",
//               color: "#1976d2",
//             }}
//           >
//             💡 Пароль может быть добавлен в несколько групп одновременно
//           </div>

//           {/* Barre de recherche */}
//           <div style={{ position: "relative", marginBottom: "1rem" }}>
//             <FaSearch
//               style={{
//                 position: "absolute",
//                 left: "0.75rem",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#6c757d",
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Поиск паролей..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               style={{
//                 width: "100%",
//                 padding: "0.75rem 0.75rem 0.75rem 2.5rem",
//                 border: "1px solid #ced4da",
//                 borderRadius: "4px",
//                 fontSize: "1rem",
//               }}
//             />
//           </div>

//           {/* Bouton Sélectionner tout */}
//           {filteredPasswords.length > 0 && (
//             <div style={{ marginBottom: "1rem" }}>
//               <label
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.5rem",
//                   fontWeight: "bold",
//                   cursor: "pointer",
//                   padding: "0.5rem",
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "4px",
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={allFilteredSelected}
//                   ref={(input) => {
//                     if (input)
//                       input.indeterminate =
//                         someFilteredSelected && !allFilteredSelected;
//                   }}
//                   onChange={handleSelectAll}
//                   style={{ cursor: "pointer" }}
//                 />
//                 {allFilteredSelected
//                   ? `Отменить выбор всех (${filteredPasswords.length})`
//                   : `Выбрать все (${filteredPasswords.length})`}
//               </label>
//             </div>
//           )}

//           {/* Liste des mots de passe */}
//           {filteredPasswords.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "2rem" }}>
//               <p style={{ color: "#6c757d" }}>
//                 Нет паролей, соответствующих поиску "{searchTerm}"
//               </p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 maxHeight: "40vh",
//                 overflowY: "auto",
//                 border: "1px solid #e9ecef",
//                 padding: "1rem",
//                 borderRadius: "4px",
//                 backgroundColor: "#fafafa",
//               }}
//             >
//               {filteredPasswords.map((password) => {
//                 const isSelected = selectedPasswordIds.includes(password._id);
//                 const hasGroup = password.groupId && password.groupId.name;

//                 return (
//                   <label
//                     key={password._id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.75rem",
//                       cursor: "pointer",
//                       padding: "0.75rem",
//                       marginBottom: "0.5rem",
//                       backgroundColor: isSelected ? "#e3f2fd" : "white",
//                       border: `1px solid ${isSelected ? "#2196f3" : "#e9ecef"}`,
//                       borderRadius: "4px",
//                       transition: "all 0.2s",
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={isSelected}
//                       onChange={() => handleTogglePassword(password._id)}
//                       style={{ cursor: "pointer" }}
//                     />
//                     <div style={{ flex: 1 }}>
//                       <div
//                         style={{
//                           fontWeight: "bold",
//                           fontSize: "1rem",
//                           marginBottom: "0.25rem",
//                         }}
//                       >
//                         {password.title}
//                       </div>
//                       <div
//                         style={{
//                           color: "#6c757d",
//                           fontSize: "0.9rem",
//                           marginBottom: "0.25rem",
//                         }}
//                       >
//                         Пользователь: {password.username}
//                       </div>
//                       {password.url && (
//                         <div
//                           style={{
//                             color: "#007bff",
//                             fontSize: "0.8rem",
//                             marginBottom: "0.25rem",
//                           }}
//                         >
//                           {password.url}
//                         </div>
//                       )}
//                       {hasGroup && (
//                         <div
//                           style={{
//                             fontSize: "0.75rem",
//                             color: "#6c757d",
//                             backgroundColor: "#f8f9fa",
//                             padding: "0.25rem 0.5rem",
//                             borderRadius: "3px",
//                             display: "inline-block",
//                           }}
//                         >
//                           📁 В группе: {password.groupId.name}
//                         </div>
//                       )}
//                     </div>
//                   </label>
//                 );
//               })}
//             </div>
//           )}

//           {/* Informations sur la sélection */}
//           {selectedPasswordIds.length > 0 && (
//             <div
//               style={{
//                 marginTop: "1rem",
//                 padding: "0.75rem",
//                 backgroundColor: "#d4edda",
//                 border: "1px solid #c3e6cb",
//                 borderRadius: "4px",
//                 color: "#155724",
//               }}
//             >
//               <strong>{selectedPasswordIds.length}</strong> пароль(ей) выбрано
//               для добавления
//             </div>
//           )}
//         </div>
//       )}
//     </Modal>
//   );
// };

// AddPasswordsToGroupModal.propTypes = {
//   groupId: PropTypes.string.isRequired,
//   onSave: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default AddPasswordsToGroupModal;

// =================================================================
// 1. AddPasswordsToGroupModal.jsx CORRIGÉ
// =================================================================

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../utils/api";
import { toast } from "react-toastify";
import { FaSave, FaSpinner, FaKey, FaSearch, FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";

const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);
  const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // État pour le formulaire de création
  const [newPassword, setNewPassword] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });
  const [creating, setCreating] = useState(false);

  // Charger TOUS les mots de passe de l'utilisateur
  const fetchAllPasswords = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔄 Chargement de tous les mots de passe...");

      const res = await api.get("/api/passwords");
      console.log("✅ Mots de passe reçus:", res.data.length);
      console.log("📋 Exemple de structure:", res.data[0]);

      setAllPasswords(res.data);
      setFilteredPasswords(res.data);
    } catch (error) {
      console.error("❌ Erreur lors du chargement:", error);
      setError("Ошибка при загрузке паролей");
      toast.error("Ошибка при загрузке паролей.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchAllPasswords();
    }
  }, [groupId]);

  // Filtrer les mots de passe selon le terme de recherche
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPasswords(allPasswords);
    } else {
      const filtered = allPasswords.filter(
        (password) =>
          password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (password.url &&
            password.url.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPasswords(filtered);
    }
  }, [searchTerm, allPasswords]);

  const handleTogglePassword = (passwordId) => {
    console.log("🔄 Toggle password:", passwordId, typeof passwordId);
    setSelectedPasswordIds((prev) =>
      prev.includes(passwordId)
        ? prev.filter((id) => id !== passwordId)
        : [...prev, passwordId]
    );
  };

  const handleSelectAll = () => {
    if (
      selectedPasswordIds.length === filteredPasswords.length &&
      filteredPasswords.length > 0
    ) {
      setSelectedPasswordIds([]);
    } else {
      setSelectedPasswordIds(filteredPasswords.map((p) => p._id));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreatePassword = async () => {
    if (!newPassword.title || !newPassword.username || !newPassword.password) {
      toast.error(
        "Пожалуйста, заполните обязательные поля (название, имя пользователя, пароль)"
      );
      return;
    }

    setCreating(true);
    try {
      console.log("🆕 Создание нового пароля...");

      // ✅ CORRIGÉ : Utiliser groupIds pour many-to-many
      const response = await api.post("/api/passwords", {
        ...newPassword,
        groupIds: [groupId], // ✅ Changé de groupId vers groupIds
      });

      console.log("✅ Пароль создан:", response.data);

      toast.success(
        `Пароль "${newPassword.title}" создан и добавлен в группу!`
      );

      setNewPassword({
        title: "",
        username: "",
        password: "",
        url: "",
        notes: "",
      });
      setShowCreateForm(false);

      onSave();
    } catch (error) {
      console.error("❌ Ошибка создания пароля:", error);
      const errorMessage =
        error.response?.data?.msg || "Ошибка при создании пароля";
      toast.error(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  const handleSubmitExisting = async () => {
    if (selectedPasswordIds.length === 0) {
      toast.info("Пожалуйста, выберите хотя бы один пароль.");
      return;
    }

    // ✅ DEBUGGING MAXIMAL AJOUTÉ
    console.log("🚀 === DÉBUT AJOUT FRONTEND ===");
    console.log("📋 Group ID:", groupId);
    console.log("📋 Type Group ID:", typeof groupId);
    console.log("📋 Password IDs sélectionnés:", selectedPasswordIds);
    console.log(
      "📋 Types Password IDs:",
      selectedPasswordIds.map((id) => typeof id)
    );
    console.log("🌐 URL:", `/api/groups/${groupId}/add-passwords`);

    // Vérifier que les IDs sélectionnés correspondent aux mots de passe chargés
    console.log("🔍 === VÉRIFICATION CORRESPONDANCE ===");
    selectedPasswordIds.forEach((id) => {
      const password = allPasswords.find((p) => p._id === id);
      if (password) {
        console.log(`   ✅ ${password.title} (ID: ${id})`);
      } else {
        console.log(`   ❌ ID non trouvé: ${id}`);
      }
    });

    console.log("📊 === TOUS LES MOTS DE PASSE DISPONIBLES ===");
    allPasswords.slice(0, 10).forEach((p, i) => {
      console.log(`   ${i + 1}. "${p._id}" - ${p.title}`);
    });

    setSaving(true);
    try {
      console.log("📤 Envoi de la requête...");

      const response = await api.put(`/api/groups/${groupId}/add-passwords`, {
        passwordIds: selectedPasswordIds,
      });

      console.log("✅ Réponse reçue:", response.data);

      toast.success(
        `${selectedPasswordIds.length} пароль(ей) добавлено в группу!`
      );
      onSave();
    } catch (error) {
      console.error("❌ === ERREUR FRONTEND ===");
      console.error("❌ Error object:", error);
      console.error("❌ Status:", error.response?.status);
      console.error("❌ Status Text:", error.response?.statusText);
      console.error("❌ Response Data:", error.response?.data);
      console.error("❌ Request URL:", error.config?.url);
      console.error("❌ Request Method:", error.config?.method);
      console.error("❌ Request Data:", error.config?.data);

      const errorMessage =
        error.response?.data?.msg || "Ошибка при добавлении паролей";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const allFilteredSelected =
    filteredPasswords.length > 0 &&
    selectedPasswordIds.length === filteredPasswords.length;
  const someFilteredSelected = selectedPasswordIds.length > 0;

  return (
    <Modal
      title="Добавить пароли в группу"
      onClose={onClose}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={saving || creating}
            type="button"
          >
            Отмена
          </button>

          {showCreateForm ? (
            <button
              className="btn btn-success"
              onClick={handleCreatePassword}
              disabled={
                creating ||
                !newPassword.title ||
                !newPassword.username ||
                !newPassword.password
              }
              type="button"
            >
              {creating ? (
                <>
                  <FaSpinner
                    style={{
                      marginRight: "0.5rem",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Создание...
                </>
              ) : (
                <>
                  <FaSave style={{ marginRight: "0.5rem" }} />
                  Создать пароль
                </>
              )}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleSubmitExisting}
              disabled={saving || selectedPasswordIds.length === 0}
              type="button"
            >
              {saving ? (
                <>
                  <FaSpinner
                    style={{
                      marginRight: "0.5rem",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Добавление...
                </>
              ) : (
                <>
                  <FaSave style={{ marginRight: "0.5rem" }} />
                  Добавить ({selectedPasswordIds.length})
                </>
              )}
            </button>
          )}
        </div>
      }
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <FaSpinner
            size={24}
            style={{
              animation: "spin 1s linear infinite",
              marginBottom: "1rem",
            }}
          />
          <p>Загрузка ваших паролей...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</p>
          <button
            className="btn btn-secondary"
            onClick={fetchAllPasswords}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🔄 Попробовать снова
          </button>
        </div>
      ) : showCreateForm ? (
        // Formulaire de création de mot de passe
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: 0 }}>Создать новый пароль</h4>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowCreateForm(false)}
              type="button"
            >
              ← Назад к списку
            </button>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Название *
              </label>
              <input
                type="text"
                value={newPassword.title}
                onChange={(e) =>
                  setNewPassword((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Например: Gmail, Facebook..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
                autoFocus
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Имя пользователя *
              </label>
              <input
                type="text"
                value={newPassword.username}
                onChange={(e) =>
                  setNewPassword((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                placeholder="Имя пользователя или email"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Пароль *
              </label>
              <input
                type="password"
                value={newPassword.password}
                onChange={(e) =>
                  setNewPassword((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Пароль"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                URL (необязательно)
              </label>
              <input
                type="url"
                value={newPassword.url}
                onChange={(e) =>
                  setNewPassword((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder="https://example.com"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                Заметки (необязательно)
              </label>
              <textarea
                value={newPassword.notes}
                onChange={(e) =>
                  setNewPassword((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Дополнительные заметки..."
                rows="3"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>
      ) : allPasswords.length === 0 ? (
        // Aucun mot de passe
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <FaKey size={40} color="#6c757d" style={{ marginBottom: "1rem" }} />
          <p
            style={{
              color: "#6c757d",
              fontSize: "1.1rem",
              marginBottom: "1rem",
            }}
          >
            У вас пока нет паролей.
          </p>
          <small
            style={{
              color: "#6c757d",
              marginBottom: "1.5rem",
              display: "block",
            }}
          >
            Создайте свой первый пароль.
          </small>

          <button
            className="btn btn-success"
            onClick={() => setShowCreateForm(true)}
            type="button"
            style={{ fontSize: "1rem", padding: "0.75rem 1.5rem" }}
          >
            <FaPlus style={{ marginRight: "0.5rem" }} />
            Создать первый пароль
          </button>
        </div>
      ) : (
        // Liste des mots de passe
        <div className="form-group">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <label style={{ fontWeight: "bold", margin: 0 }}>
              Выберите пароли для добавления в группу:
            </label>
            <button
              className="btn btn-success btn-sm"
              onClick={() => setShowCreateForm(true)}
              type="button"
            >
              <FaPlus style={{ marginRight: "0.5rem" }} />
              Создать новый
            </button>
          </div>

          {/* Info */}
          <div
            style={{
              backgroundColor: "#e3f2fd",
              padding: "0.75rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              color: "#1976d2",
            }}
          >
            💡 Пароль может быть добавлен в несколько групп одновременно
          </div>

          {/* Barre de recherche */}
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <FaSearch
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6c757d",
              }}
            />
            <input
              type="text"
              placeholder="Поиск паролей..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Bouton Sélectionner tout */}
          {filteredPasswords.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "0.5rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  ref={(input) => {
                    if (input)
                      input.indeterminate =
                        someFilteredSelected && !allFilteredSelected;
                  }}
                  onChange={handleSelectAll}
                  style={{ cursor: "pointer" }}
                />
                {allFilteredSelected
                  ? `Отменить выбор всех (${filteredPasswords.length})`
                  : `Выбрать все (${filteredPasswords.length})`}
              </label>
            </div>
          )}

          {/* Liste des mots de passe */}
          {filteredPasswords.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p style={{ color: "#6c757d" }}>
                Нет паролей, соответствующих поиску "{searchTerm}"
              </p>
            </div>
          ) : (
            <div
              style={{
                maxHeight: "40vh",
                overflowY: "auto",
                border: "1px solid #e9ecef",
                padding: "1rem",
                borderRadius: "4px",
                backgroundColor: "#fafafa",
              }}
            >
              {filteredPasswords.map((password) => {
                const isSelected = selectedPasswordIds.includes(password._id);

                // ✅ CORRIGÉ : Gestion many-to-many pour l'affichage des groupes
                const hasGroups =
                  password.groupIds && password.groupIds.length > 0;
                const groupNames = hasGroups
                  ? password.groupIds
                      .map((group) => group.name || group)
                      .join(", ")
                  : null;

                return (
                  <label
                    key={password._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      cursor: "pointer",
                      padding: "0.75rem",
                      marginBottom: "0.5rem",
                      backgroundColor: isSelected ? "#e3f2fd" : "white",
                      border: `1px solid ${isSelected ? "#2196f3" : "#e9ecef"}`,
                      borderRadius: "4px",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleTogglePassword(password._id)}
                      style={{ cursor: "pointer" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {password.title}
                      </div>
                      <div
                        style={{
                          color: "#6c757d",
                          fontSize: "0.9rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Пользователь: {password.username}
                      </div>
                      {password.url && (
                        <div
                          style={{
                            color: "#007bff",
                            fontSize: "0.8rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {password.url}
                        </div>
                      )}
                      {/* ✅ CORRIGÉ : Affichage des groupes many-to-many */}
                      {hasGroups && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6c757d",
                            backgroundColor: "#f8f9fa",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "3px",
                            display: "inline-block",
                          }}
                        >
                          📁 В группах: {groupNames}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {/* Informations sur la sélection */}
          {selectedPasswordIds.length > 0 && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "4px",
                color: "#155724",
              }}
            >
              <strong>{selectedPasswordIds.length}</strong> пароль(ей) выбрано
              для добавления
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

AddPasswordsToGroupModal.propTypes = {
  groupId: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddPasswordsToGroupModal;
