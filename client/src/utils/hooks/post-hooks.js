import { useEffect, useMemo, useState } from "react";
import HomeBaristaApi from "../api/home-barista-api";

export const usePostBean = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);
  const [beanData, setBeanData] = useState(null);

  useEffect(() => {
    if (beanData) {
      setLoading(true);
      const postData = async (beanData) => {
        const { data, error } = await homeBaristaApi.postBean(beanData);
        if (data) {
          setSuccess('New coffee bean added!')
          setLoading(false);
        } else {
          setError('Something went wrong... please try again later');
          setLoading(false);
          console.error(`Error posting new bean: ${error}`);
        }
      }
  
      postData(beanData);
    }
  }, [homeBaristaApi, beanData]);

  return { loading, error, success, setBeanData };
}

export const usePostRecipe = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    if (recipeData) {
      setLoading(true);
      const postData = async (recipeData) => {
        const {data, error} = await homeBaristaApi.postRecipe(recipeData);
        if (data) {
          setSuccess('New recipe added!');
          setLoading(false);
        } else {
          setError('Something went wrong... please try again later');
          setLoading(false);
          console.error(`Error posting new recipe: ${error}`);
        }
      }

      postData(recipeData);
    }
  }, [homeBaristaApi, recipeData]);

  return { loading, error, success, setRecipeData };
}

export const usePostUser = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    if (credentials) {
      setLoading(true);
      const postData = async (credentials) => {
        const {data, error} = await homeBaristaApi.postUser(credentials);
        if (data) {
          setSuccess('New user created');
          setLoading(false);
        } else {
          setError('Something went wrong... Please try again later');
          setLoading(false);
          console.error(`Error creating new user: ${error}`);
        }
      }

      postData(credentials);
    }
  }, [homeBaristaApi, credentials]);

  return {loading, error, success, setCredentials};
}