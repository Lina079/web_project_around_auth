import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import avatar from '../../../images/Avatar.png';
import pencil from '../../../images/Pencil.svg';

export default function Profile({ onEdit, onAdd, onEditAvatar}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img
          src={currentUser?.avatar || avatar}
          alt="Avatar del usuario"
          className="profile__avatar-image" />
          <img
          src={pencil}
          alt="Editar avatar"
          className="profile__avatar-pencil" />
        </div>

        <div className="profile__info">
          <div className="profile__name-container">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
          className="profile__editbutton"
          type="button"
          aria-label="Edit profile"
          onClick={onEdit}
          />
        </div>
        <p className="profile__description">{currentUser?.about}</p>
        </div>

        <button
        className="profile__addbutton"
        type="button"
        aria-label="Add card"
        onClick={onAdd}
        >
          +
        </button>
      </section>
  )
}


