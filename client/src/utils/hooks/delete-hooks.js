import { useEffect, useMemo, useState } from 'react';
import HomeBaristaApi from '../api/home-barista-api';

export const useDeleteBean = (beanId) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if(deleteConfirm) {
      setLoading(true);
      const deleteData = async () => {
        const { data, error } = await homeBaristaApi.deleteBean(beanId)
        if (data) {
          setSuccess('This bean has been deleted')
          setLoading(false);
        } else {
          setError('Something went wrong... please try again later');
          setLoading(false);
          console.error(`Error deleting bean with ID ${beanId}: ${error}`)
        }
      }

      deleteData()
    }
  }, [homeBaristaApi, deleteConfirm, beanId])

  return { loading, error, success, setDeleteConfirm }
}