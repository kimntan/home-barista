import { useParams } from 'react-router-dom';
import { useFetchSingleBean, useFetchSingleBeanMethods } from '../../utils/hooks/fetch-hooks';
import CoffeeImage from '../CoffeeImage/CoffeeImage';
import Loader from '../Loader/Loader';
import './CoffeeDetails.scss';
import BeanBrewMethods from '../BeanBrewMethods/BeanBrewMethods';

export default function CoffeeDetails() {
  const { beanId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);
  const { beanMethods } = useFetchSingleBeanMethods(beanId)
  
  if (loading) {
    <Loader />
  }

  return (
    <div className="coffee-details">
      <CoffeeImage bean={bean} />
      <BeanBrewMethods />
    </div>
  )

}