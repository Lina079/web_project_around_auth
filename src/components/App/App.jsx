import { useState, useEffect} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import Footer from '../Footer/Footer';
import './App.css';
import '../../index.css';



function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(error => {
        console.error("Error al cargar la info del usuario:", error);
      });

    api.getCardList()
      .then(cardsData => {
        setCards(cardsData);
      })
      .catch(error => {
        console.error("Error al cargar las tarjetas:", error);
      });
  }, []);

  function handleUpdateUser({name, about}) {
    return api.updateUserInfo({name, about})
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      })
      .catch((error) => {
        console.error
        ("Error al actualizar la info del usuario:", error);
        throw error;
      });
      }

  function handleUpdateAvatar({ avatar }) {
    return api.setUserAvatar({ avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      })
      .catch((error) => {
        console.error('Error al actualizar el avatar:', error);
        throw error;
      });
  }

  function handleAddCard({ name, link }) {
    return api.addCard({ name, link })
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        return newCard;
      })
      .catch((error) => {
        console.error('Error al agregar la tarjeta:', error);
        throw error;
      });
  }

  function handleCardLike(card) {
    api.changeLikeCardStatus(card._id, !card.isLiked)
      .then((updatedCard) => {
        setCards((prev) =>
          prev.map((c) => (c._id === updatedCard._id ? updatedCard : c))
        );
      })
      .catch((error) => {
        console.error('Error al cambiar el estado de like:', error);
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error('Error al eliminar la tarjeta:', error);
      });
  }


  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <Header />
        <main className="page__content">
        <Main
        cards={cards}
        onUpdateUser={handleUpdateUser}
        onUpdateAvatar={handleUpdateAvatar}
        onAddCard={handleAddCard}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App


