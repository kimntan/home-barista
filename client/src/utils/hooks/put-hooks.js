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
      const putData = async (recipeId) => {
        const { data, error } = await homeBaristaApi.editRecipe(recipeId, formData);
        if (data) {
          setUpdatedRecipe(data);
          setSaveLoading(false);
        } else {
          setSaveError(error);
          setSaveLoading(false);
          console.error(`Error editing recipe with ID ${recipeId}: ${error}`)
        }
      }
      
      putData(recipeId, formData)
    }
  }, [homeBaristaApi, formData, recipeId])

  return { 
    saveLoading, 
    saveError, 
    setFormData, 
    updatedRecipe }
}

export const usePutBean = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(null);
  const [updatedBean, setUpdatedBean] = useState(null);

  useEffect(() => {
    if (formData) {
      setLoading(true);
      const putData = async (beanId) => {
        const {data, error} = await homeBaristaApi.editBean(beanId, formData);
        if (data) {
          setUpdatedBean(data);
          setLoading(false);
        } else {
          setError(error);
          setLoading(false);
          console.error(`Error editing bean with ID ${beanId}: ${error}`)
        }
      }

      putData(beanId, formData)
    }
  }, [homeBaristaApi, formData, beanId])

  return {
    loading, 
    error,
    setFormData,
    updatedBean
  }
}