import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../images/Vector.png';


export default function Header ({ isLoggedIn, email, onLogout }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isPublic = pathname === '/signin' || pathname === '/signup';

  //cierra el menu al cambiar de pagina
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  //cierra el menu al ensanchar la pantalla
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 520) setOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }, []);

  useEffect(() => {
    const onKey =(e) => {
      if (e.key === 'Escape') setOpen(false); };
      if (open) window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const publicLink =
      pathname === '/signin'
        ? <Link className="header__link" to="/signup">Regístrate</Link>
        : <Link className="header__link" to="/signin">Iniciar sesión</Link>;


  return (
    <header
      className={[
        'header',
        open ? 'is-open' : '',
        isPublic ? 'is-public' : 'is-auth',
      ].join(' ').trim()}
    >
      <div className="header__bar">
        <img
          src={logo}
          alt="Around the U.S."
          className="header__logo"
        />

        {isLoggedIn ? (
          <>
            <nav className="header__nav header__nav--desktop">
              <span className="header__email">{email}</span>
              <button
                type="button"
                className="header__logout"
                onClick={onLogout}
                >
                Cerrar sesión
                </button>
            </nav>
            {/* Botón menú hamburguesa */}
            <button
              type="button"
              className="header__burger"
              aria-label="Abrir menú"
              aria-controls="header-mobile"
              aria-expanded={open}
              onClick={() => {
                console.log('click. Estado antes:', open);
                setOpen(v => !v);
              }}
              >
                <span></span><span></span><span></span>
              </button>
          </>
        ) : (
          <nav className="header__nav">
            {publicLink}
          </nav>
        )}
      </div>

      <div className="header__line" aria-hidden="true"></div>

        {/* Menu movil */}

      {isLoggedIn && (
        <aside
          id="header-mobile"
          className="header__mobile"
          role="dialog"
          aria-modal="true"
          >
          <div className="header__mobileBody">
            <p className="header__email header__email--mobile">{email}</p>
            <button
              type="button"
              className="header__logout header__logout--mobile"
              onClick={onLogout}
              >
              Cerrar sesión
              </button>

            <div className="header__mobileBar">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className="header__logo"
              />
              <button
                type="button"
                className="header__close"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                >
                X
              </button>
            </div>

          <div className="header__line header__line--mobile" aria-hidden="true"></div>
          </div>
          </aside>
        )}
    </header>
    );
    }





