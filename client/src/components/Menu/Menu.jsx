import { useState } from 'react';
import MenuIcon from '../../assets/icons/MenuIcon.svg';
import './Menu.scss';

export default function Menu({ setDeleteTrigger, item }) {
  const [menu, setMenu] = useState(false);

  const handleMenuOpen = () => {
    menu ? setMenu(false) : setMenu(true);
  }

  const handleMouseLeave = () => {
    setMenu(false);
  }

  const handleDeleteOpen = () => {
    setDeleteTrigger(true);
  }

  return (
    <div className="menu" onMouseLeave={handleMouseLeave} onMouseEnter={handleMenuOpen}>
      <img src={MenuIcon} alt="Menu icon" className="menu__icon" onClick={handleMenuOpen}/>
      <div className={menu ? "menu__container" : "menu__container menu__container--hidden"}>
        <ul className="menu__list">
          {item === 'bean' ? <li className="menu__item">Edit</li> : null}
          <li className="menu__item" onClick={handleDeleteOpen}>Delete</li>
        </ul>
      </div>
    </div>
  )
}