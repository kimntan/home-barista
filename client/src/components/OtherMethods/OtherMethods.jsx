import { Link, useParams } from 'react-router-dom';
import { useFetchOtherMethods } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import RightIcon from '../../assets/icons/right-triangle.svg';
import './OtherMethods.scss';

export default function OtherMethods() {
  const { beanId } = useParams(); 
  const { beanMethods, loading } = useFetchOtherMethods(beanId);

  return (
    <div className="other-brew-methods">
        <h2>OTHER METHODS</h2>
        <div className="other-brew-methods__scroll-container">
          {loading ? <Loader /> :
            <ul className="other-brew-methods__list">
              {beanMethods.map(method => {
                return <li key={method.id} className="other-brew-methods__item">
                  <Link to={`/${beanId}/add-recipe/${method.id}`} state={method.brew_method}>
                    <img 
                    src={method.image} 
                    alt={`${method.method_name}`} 
                    className="other-brew-methods__equipment"/>
                  </Link>
                </li>
              })}
            </ul>
          }

          <img src={RightIcon} alt="Right arrow icon" className="other-brew-methods__right-arrow" />
        </div>
      </div>
  )
}