import { useState } from 'react';
import MenuIcon from '../../assets/icons/MenuIcon.svg';
import './Menu.scss';

export default function Menu() {
  const [menu, setMenu] = useState(false);

  const handleMenuClick = () => {
    menu ? setMenu(false) : setMenu(true);
  }

  const handleMouseLeave = () => {
    setMenu(false);
  }

  return (
    <div className="menu" onMouseLeave={handleMouseLeave}>
      <img src={MenuIcon} alt="Menu icon" className="menu__icon" onClick={handleMenuClick}/>
      <div className={menu ? "menu__container" : "menu__container menu__container--hidden"}>
        <ul className="menu__list">
          <li className="menu__item">Edit</li>
          <li className="menu__item">Delete</li>
        </ul>
      </div>
    </div>
  )
}