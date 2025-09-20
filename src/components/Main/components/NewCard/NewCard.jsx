import { useState, useEffect } from 'react';

export default function NewCard({ onAddCard, onClose }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameError, setNameError] = useState('');
  const [linkError, setLinkError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsValid(
      name.trim().length >= 2 &&
      name.trim().length <= 30 &&
      link.trim() &&
      !nameError &&
      !linkError
    );
  }, [name, link, nameError, linkError]);

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setIsLoading(true);
    try {
      await onAddCard({name: name.trim(), link: link.trim()});
      onClose();
  } catch (error) {
      console.error('Error al agregar la tarjeta:', error);
    } finally {
      setIsLoading(false);
    }
    setName('');
    setLink('');
  }


  return (
    <form
      className="popup__form"
      name="add-place"
      onSubmit={handleSubmit}
      noValidate>

        <div className="popup__form-item">
          <input
            type="text"
            name="name"
            placeholder="Nombre del lugar"
            className="popup__form-item-input"
            value={name}
            onChange={handleNameChange}
            required
            minLength="2"
            maxLength="30"
            disabled={isLoading}
          />
          <div className="popup__line"></div>
          <span className="popup__form-input-error" id="name-error">{nameError}</span>
        </div>

        <div className="popup__form-item">
          <input
            type="url"
            name="link"
            placeholder="URL de la imagen"
            className="popup__form-item-input"
            value={link}
            onChange={handleLinkChange}
            required
            disabled={isLoading}
          />
          <div className="popup__line"></div>
          <span className="popup__form-input-error" id="link-error">{linkError}</span>
        </div>

        <button
        type="submit"
        className={`popup__form-btn${isLoading ? ' popup__form-btn_loading' : ''}`}
        disabled={!isValid || isLoading}>
          {isLoading ? 'Creando...' : 'Crear'}
        </button>
      </form>
  );
}

