import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <h1>HOME BARISTA</h1>
      </Link>
      <span className="header__username">Username</span>
    </header>
  )
}