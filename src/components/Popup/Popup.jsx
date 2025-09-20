import closeIcon from '../../../images/popoup/Close-Icon.svg';
import React, { useEffect } from 'react';

export default function Popup({ title, children, onClose }) {

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);


  return (
    <>
    <div className="popup-backdrop" onClick={onClose}></div>
    <div className="popup popup_opened">
      <div className="popup__container-form">
        <button
          aria-label="Cerrar ventana"
          className="popup__close-btn"
          type="button"
          onClick={onClose}
          >
            <img
            src={closeIcon}
            alt="Cerrar ventana"
            className="popup__close-icon"
            />
          </button>
      <h2 className="popup__title">{title}</h2>
      <div className="popup__content">{children}</div>
    </div>
    </div>
    </>
  );
}

