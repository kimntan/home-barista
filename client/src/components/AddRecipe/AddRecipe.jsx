import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAddRecipeForm } from '../../utils/hooks/form-hooks';
import { usePostRecipe } from '../../utils/hooks/post-hooks';
import Loader from '../Loader/Loader';
import './AddRecipe.scss';

export default function AddRecipe({ methodName }) {
  const { beanId, methodId } = useParams();
  const { values, parameters, handleInputChange } = useAddRecipeForm();
  const { loading, error, success, setRecipeData } = usePostRecipe();
  const navigate = useNavigate();


  const handleAddRecipe = (event) => {
    event.preventDefault();
    const newRecipe = {
      ...values,
      bean_id: beanId,
      method_id: methodId,
      notes: ''
    }
    setRecipeData(newRecipe);
    if(success) {
      setTimeout(() => {
        navigate(`/${beanId}`)
      }, 1500)
    }
  }

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
              className="add-recipe__input">  
            </input>
          </label>
        })}
      </div>
      <div className="add-recipe__buttons">
        <Link to={`/${beanId}/add-method`} className="add-recipe__cancel-link">
          <button className="add-recipe__cancel">Cancel</button>
        </Link>     
        <button type="submit" className="add-recipe__add">Add Recipe</button>
      </div>
    </form>
  )
}