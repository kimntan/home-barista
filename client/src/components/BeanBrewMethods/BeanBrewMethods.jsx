import { useParams } from 'react-router-dom';
import { useFetchSingleBeanMethods } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import './BeanBrewMethods.scss';

export default function BeanBrewMethods() {
  const { beanId } = useParams(); 
  const { beanMethods, loading, error } = useFetchSingleBeanMethods(beanId);

  return (
    <div className="bean-brew-methods">
        <h2>BREW METHODS</h2>
        <div className="bean-brew-methods__scroll-container">
          {loading ? <Loader /> :
            <ul className="bean-brew-methods__list">
              {beanMethods.map(method => {
                return <li key={method.id} className="bean-brew-methods__item">
                  <img 
                  src={method.image} 
                  alt={`${method.method_name}`} 
                  className="bean-brew-methods__equipment"/>
                </li>
              })}
            </ul>
          }
        </div>
        <button className="bean-brew-methods__button">Add Method</button>
      </div>
  )
}