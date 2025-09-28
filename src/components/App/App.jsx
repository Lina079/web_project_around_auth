import { useState, useEffect} from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Login from '../../pages/Login';
import Register from '../../pages/Register';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import { register as registerUser, login as loginUser, checkToken, token as authToken } from '../../utils/auth.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


import './App.css';
import '../../index.css';

// Ruta protegida
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  const navigate = useNavigate();


 // Estado de la app
  const [currentUser, setCurrentUser] = useState({});
  const [authEmail, setAuthEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ tooltip, setTooltip ] = useState({ open: false, ok: false, message: '' });

  // Validar token al cargar la app
  useEffect(() => {
    const token = authToken.get();
    if (!token) return;

    checkToken(token)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setAuthEmail(data.email);
        setCurrentUser((prev) => ({ ...prev, email: data.email }));
        navigate('/', { replace: true });
      })
      .catch(() => {
        authToken.clear();
        setIsLoggedIn(false);
      });
  }, []);

  // Cargar datos iniciales SOLO si hay sesión iniciada

  useEffect(() => {
    if (!isLoggedIn) return;

    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.error('Error al cargar los datos iniciales:', error);
      });
  }, [isLoggedIn]);

  //Handlers de autenticación
  async function handleRegister({ email, password }) {
    try {
      await registerUser({ email, password });
      setTooltip({ open: true, ok: true, message: '' });
    } catch (error) {
      setTooltip({
        open: true,
        ok: false,
        message: error?.message || 'No se pudo registrar el usuario',
      });
    }
  }
  async function handleLogin({ email, password }) {
    try {
    const { token} = await loginUser({ email, password });
    authToken.set(token);
    setIsLoggedIn(true);

    const { data } = await checkToken(token);
    setAuthEmail(data.email);
    setCurrentUser((prev) => ({ ...prev, email: data.email }));
    navigate('/', { replace: true });
  } catch (error) {
    setTooltip({
      open: true,
      ok: false,
      message: error?.message || 'No se pudo iniciar sesión.',
    });
  }
}

  function handleLogout() {
    authToken.clear();
    setIsLoggedIn(false);
    setAuthEmail('');
    navigate('/signin');
  }

  // Handlers de la app (perfil, avatar, cards)

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

  //Rutas

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        {/* Header global para todas las páginas */}
        <Header
         isLoggedIn={isLoggedIn}
         email={authEmail}
         onLogout={handleLogout}
        />
      </div>


      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/signin"
          element={
            isLoggedIn ? <Navigate to="/" replace />
            : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/" replace />
            : <Register onRegister={handleRegister} />
          }
        />
        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
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
                </>
            </ProtectedRoute>
          }
        />
        {/* Redirección para rutas no definidas */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
        />
      </Routes>
      <InfoTooltip
        isOpen={tooltip.open}
        ok={tooltip.ok}
        message={tooltip.message}
        onClose={() => {
         const wasOk = tooltip.ok;
         setTooltip({ open: false, ok: false, message: '' });
          if (wasOk) navigate('/signin', { replace: true });
        }}
      />
    </CurrentUserContext.Provider>
  );
}


