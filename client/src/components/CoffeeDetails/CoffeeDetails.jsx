import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import CoffeeImage from '../CoffeeImage/CoffeeImage';
import Loader from '../Loader/Loader';
import './CoffeeDetails.scss';
import BeanBrewMethods from '../BeanBrewMethods/BeanBrewMethods';

export default function CoffeeDetails() {
  const { beanId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);
  
  if (loading) {
    return <Loader />
  }

  return (
    <div className="coffee-details">
      <CoffeeImage bean={bean} />
      <BeanBrewMethods />
      <div className="coffee-details__section">
        <h2 className="coffee-details__subheading">ABOUT</h2>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">NAME</h3>
          <span className="coffee-details__value">{bean.bean_name}</span>
        </div>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">BRAND</h3>
          <span className="coffee-details__value">{bean.brand}</span>
        </div>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">ROAST</h3>
          <span className="coffee-details__value">{bean.roast_type}</span>
        </div>
        <div className="coffee-details__property">
          <h3 className="coffee-details__key">NOTES</h3>
          <span className="coffee-details__value">{bean.tasting_notes}</span>
        </div>
      </div>
    </div>
  )

}