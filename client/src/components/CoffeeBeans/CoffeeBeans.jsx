import Loader from '../Loader/Loader';
import SearchIcon from '../../assets/icons/search-24px.svg';
import { useFetchBeans } from '../../utils/hooks/api-hooks';
import './CoffeeBeans.scss';

export default function CoffeeBeans() {
  const {beans, loading, error} = useFetchBeans();
  console.log(error);

  return (
    <div className="coffee-beans">
      <div className="coffee-beans__header">
        <h2>BEANS</h2>
        <form className="search">
          <img src={SearchIcon} alt="Search icon" className="search__icon"></img>
          <input type="text" name="search" placeholder="Search..." className="search__input"></input>
        </form>
      </div>
      {loading ? <Loader /> :
        <ul className="coffee-beans__list">
          {beans.map(bean => {
            return <li key={bean.id} className="coffee-beans__item"><img 
              src={bean.image} 
              alt={`${bean.bean_name} coffee beans by ${bean.brand}`} 
              className="coffee-beans__coffee-bag"/></li>
          })}
        </ul>
      }

    </div>
  )
}