import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
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
      <div className="bean-methods-page__main">
        <CoffeeImage bean={bean} />
        <div className="bean-methods-page__content">
          <Footer />
        </div>
      </div>
    </div>
  )
}