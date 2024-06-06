import { useEffect, useMemo, useState } from "react";
import HomeBaristaApi from "../api/home-barista-api";

export const usePostBean = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
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
  const [error, setError] = useState(null);
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    if (credentials) {
      setLoading(true);
      const postData = async (credentials) => {
        const {data, error} = await homeBaristaApi.postUser(credentials);
        if (data) {
          setSuccess('New user created!');
          setLoading(false);
          setError(false);
        } else {
          setError('Username already exists. ');
          setLoading(false);
          console.error(`Error creating new user: ${error}`);
        }
      }

      postData(credentials);
    }
  }, [homeBaristaApi, credentials]);

  return {loading, error, setError, success, setSuccess, setCredentials};
}

export const usePostLogin = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [loginError, setError] = useState(null);
  const [loginSuccess, setSuccess] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState(null);

  useEffect(() => {
    if (loginCredentials) {
      setLoading(true);
      const postData = async (credentials) => {
        const {data, error} = await homeBaristaApi.postLogin(credentials);
        if (data) {
          setSuccess(data);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          if (error.response.status === 401) {
            setError('Invalid username or password');
          } else {
            setError('Unable to login at this time.');
          }
        }
      }

      postData(loginCredentials);
    }
  }, [homeBaristaApi, loginCredentials]);

  return {loading, loginError, loginSuccess, setLoginCredentials};
}