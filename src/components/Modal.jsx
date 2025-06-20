// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { FaTimes } from "react-icons/fa";

// /**
//  * Un composant de modale réutilisable, accessible et robuste.
//  * @param {object} props
//  * @param {string} props.title - Le titre affiché dans l'en-tête de la modale.
//  * @param {function} props.onClose - La fonction à appeler pour fermer la modale. Obligatoire.
//  * @param {React.ReactNode} props.children - Le contenu à afficher dans le corps de la modale.
//  * @param {React.ReactNode} [props.footer] - Le contenu optionnel à afficher dans le pied de page.
//  */
// const Modal = ({ title, children, onClose, footer }) => {
//   // Effet pour gérer la fermeture avec la touche "Escape"
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         onClose?.();
//       }
//     };

//     // Ajoute l'écouteur d'événement au document
//     document.addEventListener("keydown", handleKeyDown);

//     // Empêcher le défilement de l'arrière-plan quand la modale est ouverte
//     document.body.style.overflow = "hidden";

//     // Nettoyage : retire l'écouteur quand le composant est démonté
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "unset";
//     };
//   }, [onClose]);

//   // Gérer la fermeture en cliquant sur le fond gris (backdrop)
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose?.();
//     }
//   };

//   return (
//     <div
//       className="modal-backdrop"
//       onClick={handleBackdropClick}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         className="modal"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modal-title"
//         onClick={(e) => e.stopPropagation()} // Empêcher la fermeture lors du clic sur le modal
//         style={{
//           backgroundColor: "white",
//           borderRadius: "8px",
//           maxWidth: "500px",
//           width: "90%",
//           maxHeight: "90vh",
//           overflowY: "auto",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//         }}
//       >
//         <div
//           className="modal-header"
//           style={{
//             padding: "1rem",
//             borderBottom: "1px solid #e9ecef",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <h2
//             id="modal-title"
//             className="modal-title"
//             style={{ margin: 0, fontSize: "1.25rem" }}
//           >
//             {title}
//           </h2>
//           <button
//             className="modal-close"
//             onClick={onClose}
//             aria-label="Fermer la modale"
//             style={{
//               background: "none",
//               border: "none",
//               fontSize: "1.2rem",
//               cursor: "pointer",
//               padding: "0.5rem",
//               borderRadius: "4px",
//             }}
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <div className="modal-body" style={{ padding: "1rem" }}>
//           {children}
//         </div>

//         {footer && (
//           <div
//             className="modal-footer"
//             style={{
//               padding: "1rem",
//               borderTop: "1px solid #e9ecef",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: "0.5rem",
//             }}
//           >
//             {footer}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Définition des PropTypes
// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
//   footer: PropTypes.node,
// };

// export default Modal;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

/**
 * Un composant de modale réutilisable, accessible et robuste.
 * @param {object} props
 * @param {string} props.title - Le titre affiché dans l'en-tête de la modale.
 * @param {function} props.onClose - La fonction à appeler pour fermer la modale. Obligatoire.
 * @param {React.ReactNode} props.children - Le contenu à afficher dans le corps de la modale.
 * @param {React.ReactNode} [props.footer] - Le contenu optionnel à afficher dans le pied de page.
 * @param {boolean} [props.closeOnBackdropClick=false] - Si true, permet de fermer en cliquant sur le fond.
 * @param {boolean} [props.closeOnEscape=true] - Si true, permet de fermer avec la touche Escape.
 */
const Modal = ({
  title,
  children,
  onClose,
  footer,
  closeOnBackdropClick = false,
  closeOnEscape = true,
}) => {
  // Effet pour gérer la fermeture avec la touche "Escape"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose?.();
      }
    };

    // Ajoute l'écouteur d'événement au document
    document.addEventListener("keydown", handleKeyDown);

    // Empêcher le défilement de l'arrière-plan quand la modale est ouverte
    document.body.style.overflow = "hidden";

    // Nettoyage : retire l'écouteur quand le composant est démonté
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, closeOnEscape]);

  // Gérer la fermeture en cliquant sur le fond gris (backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose?.();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Empêcher la fermeture lors du clic sur le modal
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="modal-header"
          style={{
            padding: "1rem",
            borderBottom: "1px solid #e9ecef",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            id="modal-title"
            className="modal-title"
            style={{ margin: 0, fontSize: "1.25rem" }}
          >
            {title}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Fermer la modale"
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "1rem" }}>
          {children}
        </div>

        {footer && (
          <div
            className="modal-footer"
            style={{
              padding: "1rem",
              borderTop: "1px solid #e9ecef",
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Définition des PropTypes
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  footer: PropTypes.node,
  closeOnBackdropClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
};

export default Modal;
