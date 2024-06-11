import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchBeans } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import SearchIcon from '../../assets/icons/search-24px.svg';
import RightIcon from '../../assets/icons/right-triangle.svg';
import './CoffeeBeans.scss';

export default function CoffeeBeans() {
  const {beans, loading, setSearch} = useFetchBeans();
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    setScroll(true);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchInput = event.target.search.value;
    setSearch(searchInput);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="coffee-beans">
      <div className="coffee-beans__header">
        <h2>BEANS</h2>
        <form className="search" onSubmit={handleSearchSubmit}>
          <img src={SearchIcon} alt="Search icon" className="search__icon"></img>
          <input 
            type="text" 
            name="search" 
            placeholder="Search..." 
            className="search__input"
            onChange={handleSearchChange}>
          </input>
        </form>
      </div>
      <div className="coffee-beans__scroll-container">

        {loading ? <Loader /> :
          <ul className="coffee-beans__list">
            {beans.map(bean => {
              let image;
              if (bean.image) {
                image = 
                  <li key={bean.id} className={scroll ? "coffee-beans__item coffee-beans__item--scroll" : "coffee-beans__item"}>
                    <Link to={`/${bean.id}`} className="coffee-beans__link">
                      <img 
                        src={bean.image} 
                        alt={`${bean.bean_name} coffee beans by ${bean.brand}`} 
                        className="coffee-beans__coffee-bag"/>
                    </Link>
                  </li>

              } else {
                image = 
                  <li key={bean.id} className={scroll ? "coffee-beans__item coffee-beans__item--scroll" : "coffee-beans__item"}>
                    <Link to={`/${bean.id}`} className="coffee-beans__link" key={bean.id}>
                      <div className="coffee-beans__placeholder">
                        <span className="coffee-beans__placeholder-name">{bean.bean_name}</span>
                        <span className="coffee-beans__placeholder-brand">{bean.brand}</span>
                      </div>
                    </Link>
                  </li>
              }
              return image;
            })}
          </ul>
        }

        <img src={RightIcon} alt="Right arrow icon" className="coffee-beans__right-arrow" onClick={handleScroll} />
      </div>
      <Link to={"add-bean"} className="coffee-beans__button-link">
        <button className="coffee-beans__button">Add new bean</button>
      </Link>
    </div>
  )
}