import { useParams } from 'react-router-dom';
import { useFetchRecipe } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import checkIcon from '../../assets/icons/CheckIcon.svg';
import './Recipe.scss';

export default function Recipe() {
  const { recipeId } = useParams();
  const { recipe, loading, error } = useFetchRecipe(recipeId);

  if (loading) {
    return <Loader />
  }

  let parameters;
  if (recipe.brew_method === 'Espresso') {
    parameters = [
      {parameter: "DOSE", value: recipe.dose},
      {parameter: "OUTPUT", value: recipe.output},
      {parameter: "TIME", value: recipe.time},
      {parameter: "TEMP", value: recipe.temp},
      {parameter: "GRIND", value: recipe.grind_size}
    ]
    console.log(parameters);
  } else {
    parameters = [
      {parameter: "DOSE", value: recipe.dose},
      {parameter: "WATER", value: recipe.water},
      {parameter: "TIME", value: recipe.time},
      {parameter: "TEMP", value: recipe.temp},
      {parameter: "GRIND", value: recipe.grind_size}
    ]
  }

  return (
    <div className="recipe">
      <div className="recipe__header">
        <h2>{(recipe.brew_method).toUpperCase()} RECIPE</h2>
        <div className="recipe__toggle-container">
          <span className="recipe__dialing">dialing</span>
          <div className="recipe__toggle">
            <button className="recipe__toggle-button"></button>
          </div>
          <img src={checkIcon} alt="check icon" className="recipe__check"></img>
        </div>
      </div>
      <div className="recipe__parameters">
        {parameters.map((parameter, index) => {
          return <div key={index} className="recipe__parameter">
            <h3 className="recipe__parameter-name">{parameter.parameter}</h3>
            <span className="recipe__parameter-value">{parameter.value}</span>
          </div>
        })}
      </div>
    </div>
  )
}