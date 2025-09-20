import React, { useEffect, useRef } from 'react';

export default function ImagePopup({ link, name, onClose }) {
const containerRef = useRef(null);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') onClose();
      }
    document.addEventListener('keydown', handleEscape);
    return () =>
      document.removeEventListener('keydown', handleEscape);
    }, [onClose]);


  return (
    <div
    className={`image-popup ${link ? "image-popup_opened" : ""}`}
    onMouseDown={(e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    }}>
      <div
      ref={containerRef}
      className="image-popup__content">
        <button
        aria-label="Cerrar"
        className="popup__close-btn"
        type="button"
        onClick={onClose}
        >
          &times;
        </button>
        <img
        src={link}
        alt="Imagen ampliada"
        className="image-popup__image" />
        <p className="image-popup__title">{name}</p>
      </div>
      </div>
  );
}