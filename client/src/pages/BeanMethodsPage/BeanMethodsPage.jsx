import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import CoffeeDetails from '../../components/CoffeeDetails/CoffeeDetails';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import './BeanMethodsPage.scss';

export default function BeanMethodsPage() {
  const { beanId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="bean-methods-page">
      <Header />
      <div className="bean-methods-page__main">
        <CoffeeImage bean={bean} back={"/"}/>
        <div className="bean-methods-page__content">
          <CoffeeDetails bean={bean} />
          <Footer />
        </div>
      </div>
    </div>
  );
}