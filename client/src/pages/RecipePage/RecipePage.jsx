import { useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Recipe from '../../components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import './RecipePage.scss';

export default function RecipePage() {
  const { beanId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="recipe-page">
      <Header />
      <div className="recipe-page__main">
        <CoffeeImage bean={bean} />
        <div className="recipe-page__content">
          <Recipe />
          <Footer />
        </div>
      </div>
    </div>
  )
}