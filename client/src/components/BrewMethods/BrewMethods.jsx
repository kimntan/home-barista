import { useFetchMethods } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import RightIcon from '../../assets/icons/right-triangle.svg';
import './BrewMethods.scss';

export default function BrewMethods() {
  const { methods, loading } = useFetchMethods();
  return (
    <div className="brew-methods">
      <h2>BREW METHODS</h2>
      <div className="brew-methods__scroll-container">
        {loading ? <Loader /> :
          <ul className="brew-methods__list">
            {methods.map(method => {
              return <li key={method.id} className="brew-methods__item"><img 
                src={method.image} 
                alt={`${method.method_name}`} 
                className="brew-methods__equipment"/></li>
            })}
          </ul>
        }

        <img src={RightIcon} alt="Right arrow icon" className="brew-methods__right-arrow" />
      </div>
    </div>
  )
}