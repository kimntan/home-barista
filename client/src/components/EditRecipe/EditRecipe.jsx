import { useParams } from 'react-router-dom';
import { useFetchRecipe } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import checkIcon from '../../assets/icons/CheckIcon.svg';
import './EditRecipe.scss';

export default function EditRecipe() {
  const { recipeId } = useParams();
  const { recipe, loading, error } = useFetchRecipe(recipeId);

  if (loading) {
    return <Loader />
  }

  console.log(recipe);

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
    <div className="edit-recipe">
      <div className="edit-recipe__header">
        <h2>{(recipe.brew_method).toUpperCase()} RECIPE</h2>
        <div className="edit-recipe__toggle-container">
          <span className="edit-recipe__dialing">dialing</span>
          <div className="edit-recipe__toggle">
            <button className="edit-recipe__toggle-button"></button>
          </div>
          <img src={checkIcon} alt="check icon" className="edit-recipe__check"></img>
        </div>
      </div>
      <form className="edit-recipe__form">
        <div className="edit-recipe__parameters">
          {parameters.map((parameter, index) => {
            return <label key={index} className="edit-recipe__label">
              <h3 className="edit-recipe__parameter">{parameter.parameter}</h3>
              <input type="text" name={parameter.parameter} className="edit-recipe__input"></input>
            </label>
          })}
        </div>
        <label className="edit-recipe__notes">
          <h3 className="edit-recipe__subheading">Notes:</h3>
          <textarea className="edit-recipe__text-area"></textarea>
        </label>
      </form>
    </div>
  )
}