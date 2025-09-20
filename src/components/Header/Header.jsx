import logo from '../../../images/Vector.png';
import line from '../../../images/Line.png';

export default function Header (){
  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
        />
        <img
        src={line}
        alt="Decorative line"
        className="header__line"
        />
    </header>
  );
}