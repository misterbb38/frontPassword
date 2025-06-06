// import React from "react";
// import Modal from "./Modal";
// import { FaExclamationTriangle } from "react-icons/fa";

// const ConfirmModal = ({
//   title,
//   message,
//   confirmLabel,
//   onConfirm,
//   onCancel,
// }) => {
//   return (
//     <Modal
//       title={title}
//       onClose={onCancel}
//       footer={
//         <>
//           <button className="btn btn-secondary" onClick={onCancel}>
//             Отмена
//           </button>
//           <button className="btn btn-danger" onClick={onConfirm}>
//             {confirmLabel || "Подтвердить"}
//           </button>
//         </>
//       }
//     >
//       <div className="text-center mb-4">
//         <FaExclamationTriangle size={40} color="#ef476f" />
//       </div>
//       <p>{message}</p>
//     </Modal>
//   );
// };

// export default ConfirmModal;

import React from "react";
import Modal from "./Modal";
import { FaExclamationTriangle } from "react-icons/fa";
import PropTypes from "prop-types";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  children,
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  onConfirm,
  onCancel,
  onClose,
}) => {
  // Gérer le rendu conditionnel
  if (isOpen === false) return null;

  // Utiliser onClose comme fallback pour onCancel
  const handleCancel = onCancel || onClose;

  return (
    <Modal
      title={title}
      onClose={handleCancel}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button className="btn btn-danger" onClick={onConfirm} type="button">
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="text-center mb-4">
        <FaExclamationTriangle size={40} color="#ef476f" />
      </div>
      {/* Flexibilité : children ou message */}
      {children || <p>{message}</p>}
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  children: PropTypes.node,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
};

export default ConfirmModal;
