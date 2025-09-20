import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function EditProfile ({ onUpdateUser, onClose }) {
const { currentUser } = useContext(CurrentUserContext);
const [name, setName] = useState('');
const [about, setAbout] = useState('');
const [nameError, setNameError] = useState('');
const [aboutError, setAboutError] = useState('');
const [isValid, setIsValid] = useState(false);
const [isLoading, setIsLoading] = useState(false);

/*useEffect(() => {
  setName(currentUser.name || '');
  setAbout(currentUser.about || '');
  setNameError('');
  setAboutError('');
}, [currentUser]); */

useEffect(() => {
  setIsValid(
    name.trim().length >= 2 &&
    name.trim().length <= 40 &&
    about.trim().length >= 2 &&
    about.trim().length <= 200 &&
    !nameError &&
    !aboutError
  );
}, [name, about, nameError, aboutError]);


function handleNameChange(e) {
  setName(e.target.value);
  setNameError(e.target.validationMessage);
}
function handleAboutChange(e) {
  setAbout(e.target.value);
  setAboutError(e.target.validationMessage);
}

async function handleSubmit(e) {
  e.preventDefault();
  if (!isValid || isLoading) return;
  setIsLoading(true);
  try {
    await onUpdateUser({name: name.trim(), about: about.trim()});
    onClose();
  } catch (error) {
    console.error('Error updating user:', error);
  }
  finally {
    setIsLoading(false);}
}

  return (
    <form
    className="popup__form"
    name="edit-profile-form"
    id="edit-profile-form"
    noValidate
    onSubmit={handleSubmit}
    >
    <div className="popup__form-item">
      <input
        className="popup__form-item-input"
        id="profile-name"
        name="name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        required
        type="text"
        value={name}
        onChange={handleNameChange}
        disabled={isLoading}
      />
      <div className="popup__line"></div>
      <span className="popup__form-input-error" id="name-error">{nameError}</span>
    </div>

    <div className="popup__form-item">
      <input
        className="popup__form-item-input"
        id="profile-description"
        name="description"
        placeholder="Acerca de mí"
        minLength="2"
        maxLength="200"
        required
        type="text"
        value={about}
        onChange={handleAboutChange}
        disabled={isLoading}
      />
      <div className="popup__line"></div>
      <span className="popup__form-input-error" id="description-error">{aboutError}</span>
    </div>

    <button
      className="popup__form-btn"
      type="submit"
      disabled={!isValid || isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}

