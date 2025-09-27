export default function InfoTooltip({ isOpen, ok, message, onClose}) {
  if (!isOpen) return null;

  const title = ok ? '¡Registro exitoso!' : '¡Uy... Algo salió mal :(';
  const text = ok
    ? (message || 'Ahora puedes iniciar sesión.')
    : (message || 'Por favor, inténtalo de nuevo.');

  return (
    <div className="popup popup_opened" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
        <h2 className="popup__title" style={{ textAlign: 'center' }}>{title}</h2>
        <p className="popup__text" style={{ textAlign: 'center' }}>{text}</p>
      </div>
    </div>
  );

}