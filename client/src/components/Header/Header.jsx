import { Link, useParams } from 'react-router-dom';
import { useFetchUser } from '../../utils/hooks/fetch-hooks';
import HomeBaristaApi from '../../utils/api/home-barista-api';
import './Header.scss';

export default function Header() {
  const homeBaristaApi = new HomeBaristaApi();
  const { user } = useFetchUser();
  const { username } = useParams();

  const handleLogout = async () => {
    await homeBaristaApi.postLogout();
  }

  return (
    <header className="header">
      <Link to={`/${username}`} className="header__link">
        <h1>HOME BARISTA</h1>
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