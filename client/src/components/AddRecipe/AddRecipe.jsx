import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAddRecipeForm } from '../../utils/hooks/form-hooks';
import { usePostRecipe } from '../../utils/hooks/post-hooks';
import { recipeValidator } from '../../utils/validators/recipe';
import Loader from '../Loader/Loader';
import PopUp from '../PopUp/PopUp';
import './AddRecipe.scss';

export default function AddRecipe({ methodName }) {
  const { username, beanId, methodId } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const { values, parameters, handleInputChange } = useAddRecipeForm(methodName);
  const { loading, error, success, setRecipeData } = usePostRecipe();
  const navigate = useNavigate();


  const handleAddRecipe = (event) => {
    event.preventDefault();
    const recipeValidation = recipeValidator(values, methodName);
    if (!recipeValidation.valid) {
      setErrorMessage(recipeValidation.message);
    } else {
      setErrorMessage('');
      const newRecipe = {
        ...values,
        bean_id: Number(beanId),
        method_id: Number(methodId),
        notes: ''
      }
      setRecipeData(newRecipe);
    }
  }
  
  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        navigate(`/${username}/${beanId}`)
      }, 1000)
    }
  }, [success, beanId, error, username, navigate])

  if (!methodName || loading) {
    return <Loader />
  }

  return (
    <form className="add-recipe" onSubmit={handleAddRecipe}>
      <h2 className="add-recipe__method">{methodName.toUpperCase()}</h2>
      <div className="add-recipe__parameters">
        {parameters.map((parameter, index) => {
          return <label className="add-recipe__label" key={index}>
            <h3 className="add-recipe__parameter">{parameter.toUpperCase()}</h3>
            <input 
              name={parameter} 
              value={values[parameter]} 
              onChange={handleInputChange}
              className={errorMessage.includes(parameter) ? "add-recipe__input add-recipe__input--invalid" : "add-recipe__input"}>  
            </input>
          </label>
        })}
      </div>
      <div className="add-recipe__buttons">
        <Link to={`/${username}/${beanId}/add-method`} className="add-recipe__cancel-link">
          <button className="add-recipe__cancel">Cancel</button>
        </Link>     
        <button type="submit" className="add-recipe__add" disabled={success || loading ? true : false}>Add Recipe</button>
      </div>
      <PopUp trigger={success ? success : error ? error : null} />
    </form>
  )
}