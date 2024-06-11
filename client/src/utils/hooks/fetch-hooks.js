import { useEffect, useMemo, useState } from 'react';
import HomeBaristaApi from '../api/home-barista-api';
import { useNavigate } from 'react-router-dom';

export const useFetchUser = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getUser();
      if (error) {
        console.error(`Error fetching user: ${error}`);
      } else {
        setUser(data);
      }
    }

    fetchData();
  }, [homeBaristaApi])

  return { user }
}

export const useFetchBeans = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [beans, setBeans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getAllBeans(search);
      if (error) {
        if (error.response.status === 401) {
          navigate("/login");
        }
        setError('Error retrieving coffee beans');
        setLoading(false);
        console.error(`Error fetching all beans: ${error}`);
      } else {
        setBeans(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi, navigate, search]);

  return { beans, loading, error, setSearch };
}

export const useFetchSingleBean = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [bean, setBean] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getBean(beanId);
      if (error) {
        setError('Error retrieving info');
        setLoading(false);
        console.error(`Error fetching coffee bean with id ${beanId}: ${error}`);
      } else {
        setBean(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi, beanId])

  return { bean, loading, error }
}

export const useFetchMethods = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getAllMethods();
      if (error) {
        setError('Error retrieving methods');
        setLoading(false);
        console.error(`Error fetching all methods: ${error}`);
      } else {
        setMethods(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi]);

  return { methods, loading, error }
}

export const useFetchSingleBeanMethods = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [beanMethods, setBeanMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getBeanMethods(beanId);
      if (error) {
        setError('Error retrieving methods');
        setLoading(false);
        console.error(`Error fetching coffee bean methods for bean with ID ${beanId}: ${error}`)
      } else {
        setBeanMethods(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi, beanId])

  return { beanMethods, loading, error }
}

export const useFetchOtherMethods = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [beanMethods, setBeanMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getOtherMethods(beanId);
      if (error) {
        setError('Error retrieving methods');
        setLoading(false);
        console.error(`Error fetching other coffee bean methods for bean with ID ${beanId}: ${error}`)
      } else {
        setBeanMethods(data);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi, beanId])

  return { beanMethods, loading, error }
}

export const useFetchRecipe = (recipeId, updatedRecipe) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await homeBaristaApi.getRecipe(recipeId);
      if (data) {
        setRecipe(data);
        setLoading(false);
      } else {
        setError(error);
        setLoading(false);
        console.error(`Error fetching recipe with id ${recipeId}: ${error}`);
      }
    }

    fetchData();
  }, [homeBaristaApi, recipeId, updatedRecipe])

  return { recipe, loading, error }
}