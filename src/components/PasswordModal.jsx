import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaKey, FaSave } from "react-icons/fa";

const PasswordModal = ({ password, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  // Предзаполнить форму, если мы изменяем существующий пароль
  useEffect(() => {
    if (password) {
      setFormData({
        title: password.title || "",
        username: password.username || "",
        password: password.password || "",
        url: password.url || "",
        notes: password.notes || "",
      });
    }
  }, [password]);

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

    if (!formData.title.trim()) {
      newErrors.title = "Название обязательно";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Пароль обязателен";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Modal
      title={password ? "Изменить пароль" : "Добавить новый пароль"}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Отмена
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <FaSave /> {password ? "Сохранить" : "Добавить"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: Gmail, Facebook, Банковский счет..."
          />
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Например: john.doe@example.com"
          />
          {errors.username && (
            <small className="text-danger">{errors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите ваш пароль"
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="url">URL (необязательно)</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Например: https://mail.google.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Заметки (необязательно)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Добавьте заметки или дополнительную информацию"
            rows="4"
          ></textarea>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
