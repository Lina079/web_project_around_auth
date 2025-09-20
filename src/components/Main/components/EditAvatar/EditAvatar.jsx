import { useState, useEffect, useContext, useRef } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  const { currentUser } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);
  const [avatarError, setAvatarError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   if (avatarRef.current) {
     avatarRef.current.value = '';
    }
    setAvatarError('');
    setIsValid(false);
  }, []);

  function handleAvatarChange(e) {
    const errorMsg = e.target.validationMessage;
    setAvatarError(errorMsg);

    const value = e.target.value.trim();

    setIsValid(value !== '' && !errorMsg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setIsLoading(true);
    try {
      await onUpdateAvatar({ avatar: avatarRef.current.value.trim() });
      onClose();
    } catch (error) {
      console.error('Error al actualizar el avatar:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          className="popup__form-item-avatar"
          id="avatar"
          name="avatar"
          placeholder="URL de la imagen"
          type="url"
          ref={avatarRef}
          onChange={handleAvatarChange}
          required
          disabled={isLoading}
        />
        <div className="popup__line"></div>
        <span className="popup__form-input-error" id="avatar-error">{avatarError}</span>
      </div>
      <button
      type="submit"
      className="popup__form-btn"
      disabled={!isValid || isLoading}>
      {isLoading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}

