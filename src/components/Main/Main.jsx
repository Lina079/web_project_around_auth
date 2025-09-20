import {CurrentUserContext}  from '../../contexts/CurrentUserContext';
import  { useState, useContext} from 'react';
import Card from '../Card/Card';
import NewCard from './components/NewCard/NewCard';
import Popup from '../Popup/Popup';
import Profile from '../Profile/Profile';
import EditProfile from '../EditProfile/EditProfile';
import ImagePopup from './components/ImagePopup/ImagePopup';
import EditAvatar from './components/EditAvatar/EditAvatar';
import ConfirmDelete from './components/ConfirmDelete/ConfirmDelete';


  export default function Main({
    cards,
    onUpdateUser,
    onUpdateAvatar,
    onAddCard,
    onCardLike,
    onCardDelete }) {

    const [popup, setPopup] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cardToDelete, setCardToDelete] = useState(null);
    const { currentUser} = useContext(CurrentUserContext);


    const newCardPopup = {
    title: 'Nuevo lugar',
    children: (
      <NewCard
        onAddCard={(cardData) =>
          onAddCard(cardData)
          .then(() => setPopup(null))
        }
        onClose={() => setPopup(null)}
      />
    )
    };

    const editProfilePopup = {
    title: 'Editar perfil',
    children:
    <EditProfile
    onUpdateUser= { onUpdateUser }
    onClose={() => setPopup(null)}  />
    };

    const editAvatarPopup = {
    title: 'Cambiar foto de perfil',
    children: (
    <EditAvatar
    onUpdateAvatar={onUpdateAvatar}
    onClose={() => setPopup (null)}
     />
    ),
    };

  return (
    <main className="content page__section">
      <Profile
        onEdit={() => setPopup(editProfilePopup)}
        onAdd={() => setPopup(newCardPopup)}
        onEditAvatar={() => setPopup(editAvatarPopup)}
      />

      <section className="elements">
       {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          isLiked={card.isLiked}
          onImageClick={setSelectedImage}
          onDelete={() => setCardToDelete(card)}
          onLike={() => onCardLike(card)}
        />
       ))}

      </section>

      {popup && (
      <Popup onClose={() => setPopup(null)} title={popup.title}>
      {popup.children}
      </Popup>
    )}
      {selectedImage && (
        <ImagePopup
          link={selectedImage.link}
          name={selectedImage.name}
          onClose={() => setSelectedImage(null)}
        />
      )}
      {cardToDelete && (
        <Popup onClose={() => setCardToDelete(null)} title="¿Estás seguro?">
          <ConfirmDelete
            onConfirm={() => {
              onCardDelete(cardToDelete);
              setCardToDelete(null);
            }} />
        </Popup>
      )}
      </main>
  );
}
