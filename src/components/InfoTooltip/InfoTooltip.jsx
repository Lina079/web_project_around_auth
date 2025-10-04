import { useEffect } from 'react';
import okIcon from '../../../images/Union-ok.svg';
import errorIcon from '../../../images/Union.svg';

export default function InfoTooltip({ isOpen, ok, message = '', onClose }) {
  if (!isOpen) return null;

  //cierre con ESC
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const title = ok
    ? '¡Correcto! Ya estás registrado.'
    : '¡Uy, algo salió mal! ';

  const text = message || (ok
    ? 'Ahora puedes iniciar sesión.'
    : 'Por favor, inténtalo de nuevo.'
  );

  return (
    <section
      className="tooltip"
      onClick={onClose}>
      <div
      className="tooltip__card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tooltip-title"
      aria-describedby="tooltip-text"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="tooltip__close"
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        >
          X
        </button>
        <div className={`tooltip__iconWrap ${ok ? "" : "tooltip__iconWrap--error"}`} aria-hidden="true">
          <img
            src={ok ? okIcon : errorIcon}
            alt=""
            className="tooltip__icon"
            aria-hidden="true"
          />
        </div>

        <h2 id="tooltip-title" className="tooltip__title" >
          {title}
        </h2>
          <p id="tooltip-text" className="tooltip__text">
            {text}
          </p>
      </div>
    </section>
  );
}





