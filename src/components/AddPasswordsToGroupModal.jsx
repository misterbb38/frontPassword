// // src/components/AddPasswordsToGroupModal.jsx

// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { FaSave } from "react-icons/fa";

// const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
//   const [ungroupedPasswords, setUngroupedPasswords] = useState([]);
//   const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchUngroupedPasswords = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/api/passwords/ungrouped");
//         setUngroupedPasswords(res.data);
//       } catch (error) {
//         toast.error("Ошибка при загрузке паролей.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUngroupedPasswords();
//   }, []);

//   const handleTogglePassword = (passwordId) => {
//     setSelectedPasswordIds((prev) =>
//       prev.includes(passwordId)
//         ? prev.filter((id) => id !== passwordId)
//         : [...prev, passwordId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedPasswordIds.length === ungroupedPasswords.length) {
//       setSelectedPasswordIds([]);
//     } else {
//       setSelectedPasswordIds(ungroupedPasswords.map((p) => p._id));
//     }
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
//       toast.success(`${selectedPasswordIds.length} пароль(ей) добавлено!`);
//       onSave();
//     } catch (error) {
//       toast.error("Ошибка при добавлении паролей.");
//     } finally {
//       setSaving(false);
//     }
//   };

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
//           >
//             Отмена
//           </button>
//           <button
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             disabled={saving || selectedPasswordIds.length === 0}
//           >
//             <FaSave />{" "}
//             {saving
//               ? "Сохранение..."
//               : `Добавить (${selectedPasswordIds.length})`}
//           </button>
//         </>
//       }
//     >
//       {loading ? (
//         <p>Загрузка доступных паролей...</p>
//       ) : ungroupedPasswords.length === 0 ? (
//         <p>Все ваши пароли уже организованы в группы.</p>
//       ) : (
//         <div className="form-group">
//           <label>Отметьте пароли для включения в эту группу:</label>
//           <div className="mb-2">
//             <label
//               className="checkbox-container flex items-center gap-2"
//               style={{ fontWeight: "bold" }}
//             >
//               <input
//                 type="checkbox"
//                 checked={
//                   selectedPasswordIds.length > 0 &&
//                   selectedPasswordIds.length === ungroupedPasswords.length
//                 }
//                 onChange={handleSelectAll}
//               />
//               Выбрать все
//             </label>
//           </div>
//           <div
//             style={{
//               maxHeight: "40vh",
//               overflowY: "auto",
//               border: "1px solid #e9ecef",
//               padding: "1rem",
//               borderRadius: "var(--border-radius)",
//             }}
//           >
//             {ungroupedPasswords.map((password) => (
//               <label
//                 key={password._id}
//                 className="checkbox-container mb-2 flex items-center"
//                 style={{ display: "flex", alignItems: "center", gap: "10px" }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedPasswordIds.includes(password._id)}
//                   onChange={() => handleTogglePassword(password._id)}
//                 />
//                 <div>
//                   <strong>{password.title}</strong>
//                   <br />
//                   <small style={{ color: "#6c757d" }}>
//                     {password.username}
//                   </small>
//                 </div>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default AddPasswordsToGroupModal;

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../utils/api";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

const AddPasswordsToGroupModal = ({ groupId, onSave, onClose }) => {
  const [ungroupedPasswords, setUngroupedPasswords] = useState([]);
  const [selectedPasswordIds, setSelectedPasswordIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUngroupedPasswords = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/passwords/ungrouped");
        setUngroupedPasswords(res.data);
      } catch (error) {
        toast.error("Ошибка при загрузке паролей.");
      } finally {
        setLoading(false);
      }
    };

    fetchUngroupedPasswords();
  }, []);

  const handleTogglePassword = (passwordId) => {
    setSelectedPasswordIds((prev) =>
      prev.includes(passwordId)
        ? prev.filter((id) => id !== passwordId)
        : [...prev, passwordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPasswordIds.length === ungroupedPasswords.length) {
      setSelectedPasswordIds([]);
    } else {
      setSelectedPasswordIds(ungroupedPasswords.map((p) => p._id));
    }
  };

  const handleSubmit = async () => {
    if (selectedPasswordIds.length === 0) {
      toast.info("Пожалуйста, выберите хотя бы один пароль.");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/api/groups/${groupId}/add-passwords`, {
        passwordIds: selectedPasswordIds,
      });
      toast.success(`${selectedPasswordIds.length} пароль(ей) добавлено!`);
      onSave();
    } catch (error) {
      toast.error("Ошибка при добавлении паролей.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Добавить пароли в группу"
      onClose={onClose}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={saving}
          >
            Отмена
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving || selectedPasswordIds.length === 0}
          >
            <FaSave />{" "}
            {saving
              ? "Сохранение..."
              : `Добавить (${selectedPasswordIds.length})`}
          </button>
        </>
      }
    >
      {loading ? (
        <p>Загрузка доступных паролей...</p>
      ) : ungroupedPasswords.length === 0 ? (
        <p>Все ваши пароли уже организованы в группы.</p>
      ) : (
        <div className="form-group">
          <label>Отметьте пароли для включения в эту группу:</label>
          <div className="mb-2">
            <label
              className="checkbox-container flex items-center gap-2"
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={
                  selectedPasswordIds.length > 0 &&
                  selectedPasswordIds.length === ungroupedPasswords.length
                }
                onChange={handleSelectAll}
              />
              Выбрать все
            </label>
          </div>
          <div
            style={{
              maxHeight: "40vh",
              overflowY: "auto",
              border: "1px solid #e9ecef",
              padding: "1rem",
              borderRadius: "var(--border-radius)",
            }}
          >
            {ungroupedPasswords.map((password) => (
              <label
                key={password._id}
                className="checkbox-container mb-2 flex items-center"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedPasswordIds.includes(password._id)}
                  onChange={() => handleTogglePassword(password._id)}
                />
                <div>
                  <strong>{password.title}</strong>
                  <br />
                  <small style={{ color: "#6c757d" }}>
                    {password.username}
                  </small>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddPasswordsToGroupModal;
