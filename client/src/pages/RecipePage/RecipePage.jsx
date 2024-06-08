import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useFetchSingleBean } from '../../utils/hooks/fetch-hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Recipe from '../../components/Recipe/Recipe';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import CoffeeImage from '../../components/CoffeeImage/CoffeeImage';
import Menu from '../../components/Menu/Menu';
import EditRecipe from '../../components/EditRecipe/EditRecipe';
import Delete from '../../components/Delete/Delete';
import './RecipePage.scss';

export default function RecipePage() {
  const [dial, setDial] = useState(false);
  const { beanId, recipeId } = useParams();
  const { bean, loading } = useFetchSingleBean(beanId);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const handleToggleDial = (event) => {
    if (dial) {
      setDial(false);
    } else {
      setDial(true);
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="recipe-page">
      <Header />
      <ErrorBoundary fallback={<Error />} >
        <div className="recipe-page__main">
          <CoffeeImage bean={bean} back={`/${beanId}`}/>
          <div className="recipe-page__content">
            <Menu setDeleteTrigger={setDeleteTrigger}/>
            {dial ? <EditRecipe handleToggleDial={handleToggleDial} /> : <Recipe handleToggleDial={handleToggleDial}/>}
            <Delete trigger={deleteTrigger} setDeleteTrigger={setDeleteTrigger} item="recipe" id={recipeId} nav={`/${beanId}`}/>
            <Footer />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  )
}