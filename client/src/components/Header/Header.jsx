import { Link } from 'react-router-dom';
import { useFetchUser } from '../../utils/hooks/fetch-hooks';
import HomeBaristaApi from '../../utils/api/home-barista-api';
import Logo from '../../assets/logo/logo.png';
import './Header.scss';

export default function Header() {
  const homeBaristaApi = new HomeBaristaApi();
  const { user } = useFetchUser();

  const handleLogout = async () => {
    await homeBaristaApi.postLogout();
  }

  return (
    <header className="header">
      <Link to={"/"} className="header__link">
        <img src={Logo} alt="Home barista logo" className="header__logo"/>
        <h1 className="header__title">HOME BARISTA</h1>
      </Link>
      <div className="header__user-info">
      <span className="header__username">{user ? user.username : 'Username'}</span>
      <span className="header__username">|</span>
      <Link to="/login" className="header__link">
        <span className="header__signout" onClick={handleLogout}>Signout</span>
      </Link>
      </div>
    </header>
  )
}