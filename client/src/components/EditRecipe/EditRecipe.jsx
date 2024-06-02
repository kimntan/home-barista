import { useParams } from 'react-router-dom';
import { useFetchRecipe } from '../../utils/hooks/fetch-hooks';
import Loader from '../Loader/Loader';
import checkIcon from '../../assets/icons/CheckIcon.svg';
import './EditRecipe.scss';
import { useEffect, useState } from 'react';
import { useEditRecipe } from '../../utils/hooks/form-hooks';

export default function EditRecipe({ handleToggleDial }) {
  const { recipeId } = useParams();
  const { recipe, loading, error } = useFetchRecipe(recipeId);
  const { values, handleParameterChange, parameters } = useEditRecipe(recipe, loading);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="edit-recipe">
      <div className="edit-recipe__header">
        <h2>{(recipe.brew_method).toUpperCase()} RECIPE</h2>
        <div className="edit-recipe__toggle-container">
          <span className="edit-recipe__dialing">dialing</span>
          <div className="edit-recipe__toggle">
            <button className="edit-recipe__toggle-button" onClick={handleToggleDial}></button>
          </div>
          <img src={checkIcon} alt="check icon" className="edit-recipe__check"></img>
        </div>
      </div>
      <form className="edit-recipe__form">
        <div className="edit-recipe__parameters">
          {parameters.map((parameter, index) => {
            return <label key={index} className="edit-recipe__label">
              <h3 className="edit-recipe__parameter">{(parameter.name).toUpperCase()}</h3>
              <input 
                type="text" 
                name={parameter.name} 
                placeholder={parameter.value} 
                value={values[parameter.name]}
                onChange={handleParameterChange}
                className="edit-recipe__input"> 
              </input>
            </label>
          })}
        </div>
        <label className="edit-recipe__notes">
          <h3 className="edit-recipe__subheading">Notes:</h3>
          <textarea className="edit-recipe__text-area"></textarea>
        </label>
      </form>
      <div className="previous-settings">
        <p className="previous-settings__label">Last brew settings:</p>
        <div className="previous-settings__container">
          {parameters.map((parameter, index) => {
            return <div key={index} className="previous-settings__parameter">
              <h3 className="previous-settings__name">{(parameter.name).toUpperCase()}</h3>
              <span className="previous-settings__value">{parameter.value}</span>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}