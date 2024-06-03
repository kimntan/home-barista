import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import './AddBeanMethod.scss';
import OtherMethods from '../../components/OtherMethods/OtherMethods';

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
        <CoffeeImage bean={bean} />
        <div className="add-method-page__content">
          <OtherMethods />
          <Footer />
        </div>
      </div>
    </div>
  )
}