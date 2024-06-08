import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import CoffeeDetails from '../../components/CoffeeDetails/CoffeeDetails';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import Menu from '../../components/Menu/Menu';
import Delete from '../../components/Delete/Delete';
import './BeanMethodsPage.scss';

export default function BeanMethodsPage() {
  const { username, beanId } = useParams();
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const { bean, loading } = useFetchSingleBean(beanId);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="bean-methods-page">
      <Header />
      <ErrorBoundary fallback={<Error />} >
        <div className="bean-methods-page__main">
          <CoffeeImage bean={bean} back={`/${username}`}/>
          <div className="bean-methods-page__content">
            <Menu setDeleteTrigger={setDeleteTrigger} item ="bean"/>
            <CoffeeDetails bean={bean} />
            <Delete trigger={deleteTrigger} setDeleteTrigger={setDeleteTrigger} item="bean" id={beanId} nav={`/${username}`}/>
            <Footer />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}