import { Link, useLocation } from 'react-router-dom';
import logo from '../../../images/Vector.png';
import line from '../../../images/Line.png';

export default function Header ({ isLoggedIn, email, onLogout }) {
  const { pathname } = useLocation();

  // Link que se muestra en paginas públicas
  const publicLink =
  pathname === '/signin'
    ? <Link className="header__link" to="/signup">Regístrate</Link>
    : <Link className="header__link" to="/signin">Iniciar sesión</Link>;
  return (
    <header className="header page__section">
      <div className="header__container">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
        />
        {/* decorativo: alt vacío */}
        <img
        src={line}
        alt="Decorative line"
        aria-hidden="true"
        className="header__line"
        />
        </div>

        <nav className="header__nav">
          {isLoggedIn ? (
            <>
            <span className="header__email">{email}</span>
            <button
              type="button"
              className="header__logout"
              onClick={onLogout}
              >
                Cerrar Sesíon
              </button>
            </>
          ) : (
            publicLink
          )}
        </nav>
    </header>
  );
}