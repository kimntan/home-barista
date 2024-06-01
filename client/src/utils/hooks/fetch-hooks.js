import { useEffect, useMemo, useState } from 'react';
import HomeBaristaApi from '../api/home-barista-api';

export const useFetchBeans = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [beans, setBeans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await homeBaristaApi.getAllBeans();
        setBeans(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(`Error fetching all beans: ${error}`);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi]);

  return {beans, loading, error};
}

export const useFetchMethods = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await homeBaristaApi.getAllMethods();
        setMethods(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(`Error fetching all methods: ${error}`);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi]);

  return {methods, loading, error}
}

export const useFetchSingleBean = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [bean, setBean] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await homeBaristaApi.getBean(beanId);
        setBean(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(`Error fetching coffee bean with id ${beanId}`);
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi, beanId])

  return {bean, loading, error}
}

export const useFetchSingleBeanMethods = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  console.log(beanId);
  const [beanMethods, setBeanMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await homeBaristaApi.getBeanMethods(beanId);
        setBeanMethods(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(`Error fetching coffee bean methods for bean with id ${beanId}`)
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi, beanId])

  return {beanMethods, loading, error}
}

