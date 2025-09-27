import { useEffect } from 'react';

export default function InfoTooltip({ isOpen, ok, message = '', onClose }) {
  if (!isOpen) return null;

  //cierre con ESC
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const title = ok ? '¡Registro exitoso!' : '¡Uy... Algo salió mal :(';
  const text = message || (ok ? 'Ahora puedes iniciar sesión.' : 'Por favor, inténtalo de nuevo.');

  return (
    <div
      className="popup popup_opened"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tooltip-title"
      aria-describedby="tooltip-text"
    >
    <div
      className="popup__container"
      onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
        <h2 id="tooltip-title" className="popup__title" style={{ textAlign: 'center' }}>
          {title}
        </h2>
        <p id="tooltip-text"
          className="popup__text"
          style={{ textAlign: 'center' }}>
          {text}
        </p>
      </div>
    </div>
  );
}



