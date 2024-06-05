import { useEffect, useMemo, useState } from 'react';
import HomeBaristaApi from '../api/home-barista-api';

export const useDelete = (item, id) => {
  const homeBaristaApi = useMemo(() => new HomeBaristaApi(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if(deleteConfirm && item === 'bean') {
      setLoading(true);
      const deleteData = async () => {
        const { data, error } = await homeBaristaApi.deleteBean(id)
        if (data) {
          setSuccess('This bean has been deleted')
          setLoading(false);
        } else {
          setError('Something went wrong... please try again later');
          setLoading(false);
          console.error(`Error deleting bean with ID ${id}: ${error}`)
        }
      }
      deleteData()
    }

    if(deleteConfirm && item === 'recipe') {
      setLoading(true);
      const deleteData = async () => {
        const { data, error } = await homeBaristaApi.deleteRecipe(id)
        if (data) {
          setSuccess('This recipe has been deleted')
          setLoading(false);
        } else {
          setError('Something went wrong... please try again later')
          setLoading(false);
          console.error(`Error deleting recipe with ID ${id}: ${error}`)
        }
      }
      deleteData();
    }

  }, [homeBaristaApi, deleteConfirm, id, item])

  return { loading, error, success, setDeleteConfirm }
}