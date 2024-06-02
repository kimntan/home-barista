import { useParams } from 'react-router-dom';
import { useFetchRecipe } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import checkIcon from '../../assets/icons/CheckIcon.svg';
import './Recipe.scss';

export default function Recipe({ handleToggleDial }) {
  const { recipeId } = useParams();
  const { recipe, loading, error } = useFetchRecipe(recipeId);

  if (loading) {
    return <Loader />
  }

  let parameters;
  if (recipe.brew_method === 'Espresso') {
    parameters = [
      {name: "dose", value: recipe.dose},
      {name: "output", value: recipe.output},
      {name: "time", value: recipe.time},
      {name: "temp", value: recipe.temp},
      {name: "grind", value: recipe.grind_size}
    ]
  } else {
    parameters = [
      {name: "dose", value: recipe.dose},
      {name: "water", value: recipe.water},
      {name: "time", value: recipe.time},
      {name: "temp", value: recipe.temp},
      {name: "grind", value: recipe.grind_size}
    ]
  }

  return (
    <div className="recipe">
      <div className="recipe__header">
        <h2>{(recipe.brew_method).toUpperCase()} RECIPE</h2>
        <div className="recipe__toggle-container">
          <span className="recipe__dialing">dialing</span>
          <div className="recipe__toggle">
            <button className="recipe__toggle-button" onClick={handleToggleDial}></button>
          </div>
          <img src={checkIcon} alt="check icon" className="recipe__check"></img>
        </div>
      </div>
      <div className="recipe__parameters">
        {parameters.map((parameter, index) => {
          return <div key={index} className="recipe__parameter">
            <h3 className="recipe__parameter-name">{(parameter.name).toUpperCase()}</h3>
            <span className="recipe__parameter-value">{parameter.value}</span>
          </div>
        })}
      </div>
    </div>
  )
}