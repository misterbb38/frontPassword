import React from "react";
import Modal from "./Modal";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Отмена
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel || "Подтвердить"}
          </button>
        </>
      }
    >
      <div className="text-center mb-4">
        <FaExclamationTriangle size={40} color="#ef476f" />
      </div>
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmModal;
