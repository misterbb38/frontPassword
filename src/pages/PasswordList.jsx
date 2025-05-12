import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaShare,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// Компоненты
import PasswordModal from "../components/PasswordModal";
import ShareModal from "../components/ShareModal";
import ConfirmModal from "../components/ConfirmModal";

const PasswordList = () => {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [search, setSearch] = useState("");

  // Состояния для модальных окон
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);

  useEffect(() => {
    fetchPasswords();
  }, []);

  // Получить все пароли
  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/passwords");
      setPasswords(res.data);
    } catch (error) {
      toast.error("Ошибка при получении паролей");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Фильтровать пароли в соответствии с поиском
  const filteredPasswords = passwords.filter(
    (password) =>
      password.title.toLowerCase().includes(search.toLowerCase()) ||
      password.username.toLowerCase().includes(search.toLowerCase()) ||
      password.url.toLowerCase().includes(search.toLowerCase())
  );

  // Показать/скрыть пароль
  const toggleShowPassword = (id) => {
    if (showPasswordId === id) {
      setShowPasswordId(null);
    } else {
      setShowPasswordId(id);
    }
  };

  // Копировать в буфер обмена
  //   const copyToClipboard = (text) => {
  //     navigator.clipboard
  //       .writeText(text)
  //       .then(() => toast.success("Скопировано в буфер обмена!"))
  //       .catch(() => toast.error("Ошибка при копировании"));
  //   };

  // Копировать в буфер обмена
  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      // Для современных браузеров в защищенном контексте
      navigator.clipboard
        .writeText(text)
        .then(() => toast.success("Скопировано в буфер обмена!"))
        .catch((error) => {
          console.error("Ошибка при копировании:", error);
          toast.error("Ошибка при копировании");
        });
    } else {
      // Запасной вариант для старых браузеров
      try {
        // Создаем временный элемент input
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Делаем элемент невидимым
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);

        // Выбираем текст и копируем
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");

        // Удаляем временный элемент
        document.body.removeChild(textArea);

        if (successful) {
          toast.success("Скопировано в буфер обмена!");
        } else {
          toast.error("Ошибка при копировании");
        }
      } catch (error) {
        console.error("Ошибка при копировании:", error);
        toast.error("Ошибка при копировании");
      }
    }
  };
  // Открыть модальное окно для добавления пароля
  const openAddModal = () => {
    setCurrentPassword(null);
    setModalOpen(true);
  };

  // Открыть модальное окно для редактирования пароля
  const openEditModal = (password) => {
    setCurrentPassword(password);
    setModalOpen(true);
  };

  // Открыть модальное окно для общего доступа к паролю
  const openShareModal = (password) => {
    setCurrentPassword(password);
    setShareModalOpen(true);
  };

  // Открыть модальное окно подтверждения для удаления пароля
  const openDeleteModal = (password) => {
    setCurrentPassword(password);
    setConfirmModalOpen(true);
  };

  // Обработать добавление или изменение пароля
  // const handleSavePassword = async (passwordData) => {
  //   try {
  //     if (currentPassword) {
  //       // Обновление
  //       await api.put(`/api/passwords/${currentPassword.id}`, passwordData);
  //       toast.success("Пароль успешно обновлен");
  //     } else {
  //       // Добавление
  //       await api.post("/api/passwords", passwordData);
  //       toast.success("Пароль успешно добавлен");
  //     }

  //     fetchPasswords();
  //     setModalOpen(false);
  //   } catch (error) {
  //     toast.error("Ошибка при сохранении пароля");
  //     console.error(error);
  //   }
  // };

  const handleSavePassword = async (passwordData) => {
    try {
      if (currentPassword && currentPassword.id) {
        // Обновление - vérifier que l'ID existe
        await api.put(`/api/passwords/${currentPassword.id}`, passwordData);
        toast.success("Пароль успешно обновлен");
      } else {
        // Добавление
        await api.post("/api/passwords", passwordData);
        toast.success("Пароль успешно добавлен");
      }

      fetchPasswords();
      setModalOpen(false);
    } catch (error) {
      toast.error("Ошибка при сохранении пароля");
      console.error(error);
    }
  };

  // Обработать общий доступ к паролю
  const handleSharePassword = async (userIds) => {
    try {
      await api.put(`/api/passwords/${currentPassword.id}`, {
        ...currentPassword,
        sharedWith: userIds,
      });

      toast.success("Общий доступ успешно обновлен");
      fetchPasswords();
      setShareModalOpen(false);
    } catch (error) {
      toast.error("Ошибка при настройке общего доступа к паролю");
      console.error(error);
    }
  };

  // Обработать удаление пароля
  const handleDeletePassword = async () => {
    try {
      await api.delete(`/api/passwords/${currentPassword.id}`);

      toast.success("Пароль успешно удален");
      fetchPasswords();
      setConfirmModalOpen(false);
    } catch (error) {
      toast.error("Ошибка при удалении пароля");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="password-list-header">
        <div>
          <h1>Менеджер паролей</h1>
          <p className="subtitle">Управляйте всеми своими паролями безопасно</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Добавить пароль
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Ваши пароли</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              placeholder="Поиск пароля..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          {loading ? (
            <div className="text-center py-4">Загрузка...</div>
          ) : filteredPasswords.length > 0 ? (
            filteredPasswords.map((password) => (
              <div key={password.id} className="card password-card mb-3">
                <div className="card-body">
                  <div className="password-card-header mb-3">
                    <div className="password-info">
                      <h3 className="password-title">{password.title}</h3>
                      <p className="password-username">{password.username}</p>
                      {password.url && (
                        <a
                          href={
                            password.url.startsWith("http")
                              ? password.url
                              : `https://${password.url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {password.url}
                        </a>
                      )}
                    </div>
                    <div className="password-actions">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => toggleShowPassword(password.id)}
                        title={
                          showPasswordId === password.id ? "Скрыть" : "Показать"
                        }
                      >
                        {showPasswordId === password.id ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => copyToClipboard(password.password)}
                        title="Копировать"
                      >
                        <FaCopy />
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => openEditModal(password)}
                        title="Изменить"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => openShareModal(password)}
                        title="Поделиться"
                      >
                        <FaShare />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => openDeleteModal(password)}
                        title="Удалить"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="password-field">
                    <div className="password-field-label">Пароль:</div>
                    <div
                      className={`password-field-value ${
                        showPasswordId !== password.id ? "password-hidden" : ""
                      }`}
                    >
                      {password.password}
                    </div>
                  </div>

                  {password.notes && (
                    <div className="password-field">
                      <div className="password-field-label">Заметки:</div>
                      <div className="password-field-value">
                        {password.notes}
                      </div>
                    </div>
                  )}

                  <div className="mt-2">
                    <small className="text-gray-500">
                      {password.userId === user.id
                        ? "Вы владелец"
                        : "Доступно вам"}
                      {password.sharedWith &&
                        password.sharedWith.length > 0 &&
                        " • Доступно " +
                          password.sharedWith.length +
                          " пользователям"}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p>Пароли не найдены</p>
              <button className="btn btn-primary mt-3" onClick={openAddModal}>
                <FaPlus /> Добавить ваш первый пароль
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно добавления/редактирования пароля */}
      {modalOpen && (
        <PasswordModal
          password={currentPassword}
          onSave={handleSavePassword}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Модальное окно общего доступа */}
      {shareModalOpen && (
        <ShareModal
          password={currentPassword}
          onSave={handleSharePassword}
          onClose={() => setShareModalOpen(false)}
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {confirmModalOpen && (
        <ConfirmModal
          title="Удалить пароль"
          message={`Вы уверены, что хотите удалить пароль "${currentPassword?.title}"?`}
          confirmLabel="Удалить"
          onConfirm={handleDeletePassword}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PasswordList;
