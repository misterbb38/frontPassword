// import React, { useEffect } from "react";
// import { FaTimes } from "react-icons/fa";

// const Modal = ({ title, children, onClose, footer }) => {
//   // Empêcher le défilement du body quand la modale est ouverte
//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     // Nettoyer quand le composant est démonté
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   // Gérer la fermeture de la modale quand on clique en dehors
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div className="modal-backdrop" onClick={handleBackdropClick}>
//       <div className="modal">
//         <div className="modal-header">
//           <h2 className="modal-title">{title}</h2>
//           <button className="modal-close" onClick={onClose}>
//             <FaTimes />
//           </button>
//         </div>
//         <div className="modal-body">{children}</div>
//         {footer && <div className="modal-footer">{footer}</div>}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useEffect } from "react";
import PropTypes from "prop-types"; // Importer PropTypes
import { FaTimes } from "react-icons/fa";

/**
 * Un composant de modale réutilisable, accessible et robuste.
 * @param {object} props
 * @param {string} props.title - Le titre affiché dans l'en-tête de la modale.
 * @param {function} props.onClose - La fonction à appeler pour fermer la modale. Obligatoire.
 * @param {React.ReactNode} props.children - Le contenu à afficher dans le corps de la modale.
 * @param {React.ReactNode} [props.footer] - Le contenu optionnel à afficher dans le pied de page.
 */
const Modal = ({ title, children, onClose, footer }) => {
  // Effet pour gérer la fermeture avec la touche "Escape"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Utilisation de l'opérateur "optional chaining" (?.) pour appeler onClose
        // en toute sécurité, même si la prop n'est pas fournie.
        onClose?.();
      }
    };

    // Ajoute l'écouteur d'événement au document
    document.addEventListener("keydown", handleKeyDown);

    // Nettoyage : retire l'écouteur quand le composant est démonté pour éviter les fuites de mémoire
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); // L'effet se ré-exécute si la fonction onClose change

  // Empêcher le défilement de l'arrière-plan quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []); // Cet effet ne s'exécute qu'une seule fois à l'ouverture

  // Gérer la fermeture en cliquant sur le fond gris (backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.(); // Appel sécurisé de onClose
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// --- Définition des PropTypes ---
// Ceci est une "documentation" pour votre composant. React vous avertira
// dans la console si les props ne correspondent pas à ce qui est attendu.
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired, // `onClose` est une fonction et elle est obligatoire
  footer: PropTypes.node,
};

export default Modal;
