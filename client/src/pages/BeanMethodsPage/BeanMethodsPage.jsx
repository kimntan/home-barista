import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import CoffeeDetails from '../../components/CoffeeDetails/CoffeeDetails';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import Menu from '../../components/Menu/Menu';
import './BeanMethodsPage.scss';
import Delete from '../../components/Delete/Delete';
import { useState } from 'react';

export default function BeanMethodsPage() {
  const { beanId } = useParams();
  const [deleteTrigger, setDeleteTrigger] = useState(false);
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
          <Menu setDeleteTrigger={setDeleteTrigger}/>
          <CoffeeDetails bean={bean} />
          <Delete trigger={deleteTrigger} setDeleteTrigger={setDeleteTrigger}/>
          <Footer />
        </div>
      </div>
    </div>
  );
}