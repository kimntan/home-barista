import { useEffect, useMemo, useState } from "react";
import HomeBaristaApi from "../api/home-barista-api";

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
        setLoading(false);
      }
    }

    fetchData();
  }, [homeBaristaApi]);

  return {methods, loading, error}
}
