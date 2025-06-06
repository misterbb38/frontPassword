// // // // src/components/AddPasswordsToGroupModal.jsx

// // // import React, { useState, useEffect } from "react";
// // // import Modal from "./Modal";
// // // import api from "../utils/api";
// // // import { toast } from "react-toastify";
// // // import { FaSave } from "react-icons/fa";

// // // const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
// // //   const [ungroupedPasswords, setUngroupedPasswords] = useState([]);
// // //   const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);

// // //   useEffect(() => {
// // //     const fetchUngroupedPasswords = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const res = await api.get("/api/passwords/ungrouped");
// // //         setUngroupedPasswords(res.data);
// // //       } catch (error) {
// // //         toast.error("Ошибка при загрузке паролей.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchUngroupedPasswords();
// // //   }, []);

// // //   const handleTogglePassword = (passwordId) => {
// // //     setSelectedPasswordIds((prev) =>
// // //       prev.includes(passwordId)
// // //         ? prev.filter((id) => id !== passwordId)
// // //         : [...prev, passwordId]
// // //     );
// // //   };

// // //   const handleSelectAll = () => {
// // //     if (selectedPasswordIds.length === ungroupedPasswords.length) {
// // //       setSelectedPasswordIds([]);
// // //     } else {
// // //       setSelectedPasswordIds(ungroupedPasswords.map((p) => p._id));
// // //     }
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (selectedPasswordIds.length === 0) {
// // //       toast.info("Пожалуйста, выберите хотя бы один пароль.");
// // //       return;
// // //     }
// // //     setSaving(true);
// // //     try {
// // //       await api.put(`/api/groups/${groupId}/add-passwords`, {
// // //         passwordIds: selectedPasswordIds,
// // //       });
// // //       toast.success(`${selectedPasswordIds.length} пароль(ей) добавлено!`);
// // //       onSave();
// // //     } catch (error) {
// // //       toast.error("Ошибка при добавлении паролей.");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   return (
// // //     <Modal
// // //       title="Добавить пароли в группу"
// // //       onClose={onClose}
// // //       footer={
// // //         <>
// // //           <button
// // //             className="btn btn-secondary"
// // //             onClick={onClose}
// // //             disabled={saving}
// // //           >
// // //             Отмена
// // //           </button>
// // //           <button
// // //             className="btn btn-primary"
// // //             onClick={handleSubmit}
// // //             disabled={saving || selectedPasswordIds.length === 0}
// // //           >
// // //             <FaSave />{" "}
// // //             {saving
// // //               ? "Сохранение..."
// // //               : `Добавить (${selectedPasswordIds.length})`}
// // //           </button>
// // //         </>
// // //       }
// // //     >
// // //       {loading ? (
// // //         <p>Загрузка доступных паролей...</p>
// // //       ) : ungroupedPasswords.length === 0 ? (
// // //         <p>Все ваши пароли уже организованы в группы.</p>
// // //       ) : (
// // //         <div className="form-group">
// // //           <label>Отметьте пароли для включения в эту группу:</label>
// // //           <div className="mb-2">
// // //             <label
// // //               className="checkbox-container flex items-center gap-2"
// // //               style={{ fontWeight: "bold" }}
// // //             >
// // //               <input
// // //                 type="checkbox"
// // //                 checked={
// // //                   selectedPasswordIds.length > 0 &&
// // //                   selectedPasswordIds.length === ungroupedPasswords.length
// // //                 }
// // //                 onChange={handleSelectAll}
// // //               />
// // //               Выбрать все
// // //             </label>
// // //           </div>
// // //           <div
// // //             style={{
// // //               maxHeight: "40vh",
// // //               overflowY: "auto",
// // //               border: "1px solid #e9ecef",
// // //               padding: "1rem",
// // //               borderRadius: "var(--border-radius)",
// // //             }}
// // //           >
// // //             {ungroupedPasswords.map((password) => (
// // //               <label
// // //                 key={password._id}
// // //                 className="checkbox-container mb-2 flex items-center"
// // //                 style={{ display: "flex", alignItems: "center", gap: "10px" }}
// // //               >
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={selectedPasswordIds.includes(password._id)}
// // //                   onChange={() => handleTogglePassword(password._id)}
// // //                 />
// // //                 <div>
// // //                   <strong>{password.title}</strong>
// // //                   <br />
// // //                   <small style={{ color: "#6c757d" }}>
// // //                     {password.username}
// // //                   </small>
// // //                 </div>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </Modal>
// // //   );
// // // };

// // // export default AddPasswordsToGroupModal;

// // import React, { useState, useEffect } from "react";
// // import Modal from "./Modal";
// // import api from "../utils/api";
// // import { toast } from "react-toastify";
// // import { FaSave } from "react-icons/fa";

// // const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
// //   const [ungroupedPasswords, setUngroupedPasswords] = useState([]);
// //   const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   useEffect(() => {
// //     const fetchUngroupedPasswords = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await api.get("/api/passwords/ungrouped");
// //         setUngroupedPasswords(res.data);
// //       } catch (error) {
// //         toast.error("Ошибка при загрузке паролей.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUngroupedPasswords();
// //   }, []);

// //   const handleTogglePassword = (passwordId) => {
// //     setSelectedPasswordIds((prev) =>
// //       prev.includes(passwordId)
// //         ? prev.filter((id) => id !== passwordId)
// //         : [...prev, passwordId]
// //     );
// //   };

// //   const handleSelectAll = () => {
// //     if (selectedPasswordIds.length === ungroupedPasswords.length) {
// //       setSelectedPasswordIds([]);
// //     } else {
// //       setSelectedPasswordIds(ungroupedPasswords.map((p) => p._id));
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (selectedPasswordIds.length === 0) {
// //       toast.info("Пожалуйста, выберите хотя бы один пароль.");
// //       return;
// //     }
// //     setSaving(true);
// //     try {
// //       await api.put(`/api/groups/${groupId}/add-passwords`, {
// //         passwordIds: selectedPasswordIds,
// //       });
// //       toast.success(`${selectedPasswordIds.length} пароль(ей) добавлено!`);
// //       onSave();
// //     } catch (error) {
// //       toast.error("Ошибка при добавлении паролей.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <Modal
// //       title="Добавить пароли в группу"
// //       onClose={onClose}
// //       footer={
// //         <>
// //           <button
// //             className="btn btn-secondary"
// //             onClick={onClose}
// //             disabled={saving}
// //           >
// //             Отмена
// //           </button>
// //           <button
// //             className="btn btn-primary"
// //             onClick={handleSubmit}
// //             disabled={saving || selectedPasswordIds.length === 0}
// //           >
// //             <FaSave />{" "}
// //             {saving
// //               ? "Сохранение..."
// //               : `Добавить (${selectedPasswordIds.length})`}
// //           </button>
// //         </>
// //       }
// //     >
// //       {loading ? (
// //         <p>Загрузка доступных паролей...</p>
// //       ) : ungroupedPasswords.length === 0 ? (
// //         <p>Все ваши пароли уже организованы в группы.</p>
// //       ) : (
// //         <div className="form-group">
// //           <label>Отметьте пароли для включения в эту группу:</label>
// //           <div className="mb-2">
// //             <label
// //               className="checkbox-container flex items-center gap-2"
// //               style={{ fontWeight: "bold", cursor: "pointer" }}
// //             >
// //               <input
// //                 type="checkbox"
// //                 checked={
// //                   selectedPasswordIds.length > 0 &&
// //                   selectedPasswordIds.length === ungroupedPasswords.length
// //                 }
// //                 onChange={handleSelectAll}
// //               />
// //               Выбрать все
// //             </label>
// //           </div>
// //           <div
// //             style={{
// //               maxHeight: "40vh",
// //               overflowY: "auto",
// //               border: "1px solid #e9ecef",
// //               padding: "1rem",
// //               borderRadius: "var(--border-radius)",
// //             }}
// //           >
// //             {ungroupedPasswords.map((password) => (
// //               <label
// //                 key={password._id}
// //                 className="checkbox-container mb-2 flex items-center"
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedPasswordIds.includes(password._id)}
// //                   onChange={() => handleTogglePassword(password._id)}
// //                 />
// //                 <div>
// //                   <strong>{password.title}</strong>
// //                   <br />
// //                   <small style={{ color: "#6c757d" }}>
// //                     {password.username}
// //                   </small>
// //                 </div>
// //               </label>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </Modal>
// //   );
// // };

// // export default AddPasswordsToGroupModal;

// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { FaSave, FaSpinner, FaKey, FaSearch } from "react-icons/fa";
// import PropTypes from "prop-types";

// const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
//   const [ungroupedPasswords, setUngroupedPasswords] = useState([]);
//   const [filteredPasswords, setFilteredPasswords] = useState([]);
//   const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);

//   // Charger les mots de passe non groupés
//   useEffect(() => {
//     const fetchUngroupedPasswords = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await api.get("/api/passwords/ungrouped");
//         setUngroupedPasswords(res.data);
//         setFilteredPasswords(res.data);
//       } catch (error) {
//         console.error("Ошибка при загрузке паролей:", error);
//         setError("Ошибка при загрузке паролей");
//         toast.error("Ошибка при загрузке паролей.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (groupId) {
//       fetchUngroupedPasswords();
//     }
//   }, [groupId]);

//   // Filtrer les mots de passe selon le terme de recherche
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredPasswords(ungroupedPasswords);
//     } else {
//       const filtered = ungroupedPasswords.filter(
//         (password) =>
//           password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (password.url &&
//             password.url.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredPasswords(filtered);
//     }
//   }, [searchTerm, ungroupedPasswords]);

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
//       // Désélectionner tout
//       setSelectedPasswordIds([]);
//     } else {
//       // Sélectionner tous les mots de passe filtrés
//       setSelectedPasswordIds(filteredPasswords.map((p) => p._id));
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = async () => {
//     if (selectedPasswordIds.length === 0) {
//       toast.info("Пожалуйста, выберите хотя бы один пароль.");
//       return;
//     }

//     setSaving(true);
//     try {
//       await api.put(`/api/groups/${groupId}/add-passwords`, {
//         passwordIds: selectedPasswordIds,
//       });
//       toast.success(
//         `${selectedPasswordIds.length} пароль(ей) добавлено в группу!`
//       );
//       onSave(); // Callback pour actualiser la vue parent
//     } catch (error) {
//       console.error("Ошибка при добавлении паролей:", error);
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
//         <>
//           <button
//             className="btn btn-secondary"
//             onClick={onClose}
//             disabled={saving}
//             type="button"
//           >
//             Отмена
//           </button>
//           <button
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             disabled={saving || selectedPasswordIds.length === 0}
//             type="button"
//           >
//             {saving ? (
//               <>
//                 <FaSpinner
//                   style={{
//                     marginRight: "0.5rem",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 />
//                 Сохранение...
//               </>
//             ) : (
//               <>
//                 <FaSave style={{ marginRight: "0.5rem" }} />
//                 Добавить ({selectedPasswordIds.length})
//               </>
//             )}
//           </button>
//         </>
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
//           <p>Загрузка доступных паролей...</p>
//         </div>
//       ) : error ? (
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <p style={{ color: "#dc3545" }}>{error}</p>
//           <button
//             className="btn btn-secondary"
//             onClick={() => window.location.reload()}
//           >
//             Попробовать снова
//           </button>
//         </div>
//       ) : ungroupedPasswords.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "2rem" }}>
//           <FaKey size={40} color="#6c757d" style={{ marginBottom: "1rem" }} />
//           <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
//             Все ваши пароли уже организованы в группы.
//           </p>
//           <small style={{ color: "#6c757d" }}>
//             Создайте новые пароли или удалите их из других групп, чтобы добавить
//             их сюда.
//           </small>
//         </div>
//       ) : (
//         <div className="form-group">
//           <label
//             style={{
//               display: "block",
//               marginBottom: "1rem",
//               fontWeight: "bold",
//             }}
//           >
//             Отметьте пароли для включения в эту группу:
//           </label>

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
//                             textDecoration: "none",
//                           }}
//                         >
//                           {password.url}
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

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../utils/api";
import { toast } from "react-toastify";
import {
  FaSave,
  FaSpinner,
  FaKey,
  FaSearch,
  FaPlus,
  FaRefresh,
} from "react-icons/fa";
import PropTypes from "prop-types";

const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
  const [ungroupedPasswords, setUngroupedPasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);
  const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  // État pour le formulaire de création
  const [newPassword, setNewPassword] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });
  const [creating, setCreating] = useState(false);

  // Charger les mots de passe non groupés
  const fetchUngroupedPasswords = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Chargement des mots de passe non groupés...");

      // Récupérer les mots de passe non groupés
      const res = await api.get("/api/passwords/ungrouped");
      console.log("📦 Réponse reçue:", res.data);

      setUngroupedPasswords(res.data);
      setFilteredPasswords(res.data);

      // Récupérer des infos de debug
      const allPasswordsRes = await api.get("/api/passwords");
      const totalPasswords = allPasswordsRes.data.length;
      const ungroupedCount = res.data.length;

      setDebugInfo({
        total: totalPasswords,
        ungrouped: ungroupedCount,
        grouped: totalPasswords - ungroupedCount,
      });

      console.log(
        `📊 Stats: ${totalPasswords} total, ${ungroupedCount} non groupés, ${
          totalPasswords - ungroupedCount
        } groupés`
      );
    } catch (error) {
      console.error("❌ Erreur lors du chargement:", error);
      setError(error.response?.data?.msg || "Ошибка при загрузке паролей");
      toast.error("Ошибка при загрузке паролей.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchUngroupedPasswords();
    }
  }, [groupId]);

  // Filtrer les mots de passe selon le terme de recherche
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPasswords(ungroupedPasswords);
    } else {
      const filtered = ungroupedPasswords.filter(
        (password) =>
          password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (password.url &&
            password.url.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPasswords(filtered);
    }
  }, [searchTerm, ungroupedPasswords]);

  const handleTogglePassword = (passwordId) => {
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

      // Créer le mot de passe directement dans le groupe
      const response = await api.post("/api/passwords", {
        ...newPassword,
        groupId: groupId, // Assigner directement au groupe
      });

      console.log("✅ Mot de passe créé:", response.data);

      toast.success(
        `Пароль "${newPassword.title}" создан и добавлен в группу!`
      );

      // Réinitialiser le formulaire
      setNewPassword({
        title: "",
        username: "",
        password: "",
        url: "",
        notes: "",
      });
      setShowCreateForm(false);

      // Fermer le modal et actualiser
      onSave();
    } catch (error) {
      console.error("❌ Erreur création mot de passe:", error);
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

    setSaving(true);
    try {
      console.log("📤 Добавление существующих паролей в группу...");

      const response = await api.put(`/api/groups/${groupId}/add-passwords`, {
        passwordIds: selectedPasswordIds,
      });

      console.log("✅ Réponse serveur:", response.data);

      toast.success(
        `${selectedPasswordIds.length} пароль(ей) добавлено в группу!`
      );
      onSave();
    } catch (error) {
      console.error("❌ Erreur ajout mots de passe:", error);
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
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            {debugInfo && (
              <small style={{ color: "#6c757d" }}>
                Всего: {debugInfo.total}, В группах: {debugInfo.grouped}, Без
                группы: {debugInfo.ungrouped}
              </small>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
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
          <p>Загрузка доступных паролей...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</p>
          <button
            className="btn btn-secondary"
            onClick={fetchUngroupedPasswords}
          >
            <FaRefresh style={{ marginRight: "0.5rem" }} />
            Попробовать снова
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
              Назад к списку
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
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
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
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
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
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
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
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
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
                  padding: "0.5rem",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </div>
      ) : ungroupedPasswords.length === 0 ? (
        // Aucun mot de passe non groupé
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <FaKey size={40} color="#6c757d" style={{ marginBottom: "1rem" }} />
          <p
            style={{
              color: "#6c757d",
              fontSize: "1.1rem",
              marginBottom: "1rem",
            }}
          >
            Все ваши пароли уже организованы в группы.
          </p>
          <small
            style={{
              color: "#6c757d",
              marginBottom: "1.5rem",
              display: "block",
            }}
          >
            Создайте новые пароли или удалите их из других групп, чтобы добавить
            их сюда.
          </small>

          {debugInfo && (
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "1rem",
                borderRadius: "4px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              <strong>Информация:</strong>
              <br />
              Всего паролей: {debugInfo.total}
              <br />В группах: {debugInfo.grouped}
              <br />
              Без группы: {debugInfo.ungrouped}
            </div>
          )}

          <div
            style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
          >
            <button
              className="btn btn-success"
              onClick={() => setShowCreateForm(true)}
              type="button"
            >
              <FaPlus style={{ marginRight: "0.5rem" }} />
              Создать новый пароль
            </button>

            <button
              className="btn btn-secondary"
              onClick={fetchUngroupedPasswords}
              type="button"
            >
              <FaRefresh style={{ marginRight: "0.5rem" }} />
              Обновить
            </button>
          </div>
        </div>
      ) : (
        // Liste des mots de passe existants
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
              Отметьте пароли для включения в эту группу:
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
                        <div style={{ color: "#007bff", fontSize: "0.8rem" }}>
                          {password.url}
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
