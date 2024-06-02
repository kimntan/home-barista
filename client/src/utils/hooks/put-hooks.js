import { useEffect, useMemo, useState } from "react";
import HomeBaristaApi from "../api/home-barista-api";

export const usePutRecipe = (recipeId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [formData, setFormData] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState(null);

  useEffect(() => {
    if (formData) {
      setSaveLoading(true);
      const putData = async (recipeId, recipe) => {
        try {
          const putData = await homeBaristaApi.editRecipe(recipeId, formData)
          setUpdatedRecipe(putData);
          setSaveLoading(false);
        } catch (error) {
          setSaveError(error);
          console.error(`Error editing recipe with ID ${recipeId}: ${error}`)
          setSaveLoading(false);
        }
      }

      putData(recipeId, formData)
    }
  }, [formData, recipeId])

  return {saveLoading, saveError, setFormData, updatedRecipe}
}