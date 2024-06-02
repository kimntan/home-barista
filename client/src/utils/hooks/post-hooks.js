import { useEffect, useMemo, useState } from "react";
import HomeBaristaApi from "../api/home-barista-api";

export const usePostBean = () => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [beanData, setBeanData] = useState(null);

  useEffect(() => {
    if (beanData) {
      const postData = async (beanData) => {
        try {
          await homeBaristaApi.postBean(beanData);
          setLoading(false);
        } catch (error) {
          setError(error);
          console.error(`Error posting new bean: ${error}`);
          setLoading(false);
        }
      }
  
      postData(beanData);
    }
  }, [homeBaristaApi, beanData]);


  return {loading, error, setBeanData};
}