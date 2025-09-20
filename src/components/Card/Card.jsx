import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Card({ card, isLiked, onImageClick, onDelete, onLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const {name} = card;

  const cardLikeButtonClassName = `card__like-button${isLiked ? ' card__like-button_is-active' : ''}`;


  function handleLikeClick() {
    onLike(card);
  }

    return (
    <div className="element__container">
      <img
      src={card.link}
      alt={card.name}
      className="element__photo"
      onClick={() => onImageClick(card)}
      />
      <button
        className="element__trash-icon"
        aria-label="delete card"
        type="button"
        onClick={onDelete}
        />
       <div className="element__container-info">
        <h2 className="element__container-name-place">{name}</h2>

        <button
        className={cardLikeButtonClassName}
        aria-label="like card"
        type="button"
        onClick={handleLikeClick}
        />
        </div>
        </div>
  );
}

