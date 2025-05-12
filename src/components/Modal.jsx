import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ title, children, onClose, footer }) => {
  // Empêcher le défilement du body quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Nettoyer quand le composant est démonté
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Gérer la fermeture de la modale quand on clique en dehors
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
