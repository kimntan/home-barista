import { useEffect, useMemo, useState } from "react";
import HomeBaristaApi from "../api/home-barista-api";

export const usePutRecipe = (recipeId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);

  useEffect(() => {
    if (updatedRecipe) {
      const putData = async (recipeId, recipe) => {
        try {
          const data = await homeBaristaApi.editRecipe(recipeId, updatedRecipe)
          // console.log(data);
          setLoading(false);
        } catch (error) {
          setError(error);
          console.error(`Error editing recipe with ID ${recipeId}: ${error}`)
          setLoading(false);
        }
      }

      putData(recipeId, updatedRecipe)
    }
  }, [homeBaristaApi, updatedRecipe, recipeId])

  return {loading, error, updatedRecipe, setUpdatedRecipe}
}