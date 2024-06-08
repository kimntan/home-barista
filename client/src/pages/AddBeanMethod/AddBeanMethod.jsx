import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import OtherMethods from '../../components/OtherMethods/OtherMethods';
import './AddBeanMethod.scss';

export default function AddBeanMethod() {
  const { beanId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="add-method-page">
      <Header />
      <div className="add-method-page__main">
        <CoffeeImage bean={bean} back={`/${beanId}`}/>
        <div className="add-method-page__content">
          <OtherMethods />
          <Footer />
        </div>
      </div>
    </div>
  )
}