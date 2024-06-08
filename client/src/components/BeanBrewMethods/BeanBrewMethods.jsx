import { Link, useParams } from 'react-router-dom';
import { useFetchSingleBeanMethods } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import './BeanBrewMethods.scss';

export default function BeanBrewMethods() {
  const { beanId } = useParams(); 
  const { beanMethods, loading } = useFetchSingleBeanMethods(beanId);

  return (
    <div className="bean-brew-methods">
        <h2>BREW METHODS</h2>
        <div className="bean-brew-methods__scroll-container">
          {loading ? <Loader /> :
            <ul className="bean-brew-methods__list">
              {beanMethods.map(method => {
                return <li key={method.id} className="bean-brew-methods__item">
                  <Link to={`/${beanId}/${method.id}`}>
                    <img 
                    src={method.image} 
                    alt={`${method.method_name}`} 
                    className="bean-brew-methods__equipment"/>
                  </Link>
                </li>
              })}
            </ul>
          }
        </div>
        <Link to={`/${beanId}/add-method`} className="bean-brew-methods__button-link">
          <button className="bean-brew-methods__button">Add Method</button>
        </Link>
      </div>
  )
}