import { useLocation, useParams } from 'react-router-dom';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import './AddRecipePage.scss';
import AddRecipe from '../../components/AddRecipe/AddRecipe';

export default function AddRecipePage() {
  const { beanId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);
  const location = useLocation();
  const methodName = location.state;

  if (loading) {
    return <Loader />
  }
  return (
    <div className="add-recipe-page">
      <Header />
      <div className="add-recipe-page__main">
        <CoffeeImage bean={bean} />
        <div className="add-recipe-page__content">
          <AddRecipe methodName={methodName}/>
          <Footer />
        </div>
      </div>
    </div>
  )
}