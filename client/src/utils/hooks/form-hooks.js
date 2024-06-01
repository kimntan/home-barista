import { useState } from 'react';

export const useAddBeanForm = () => {
  const [photoUpload, setPhotoUpload] = useState(false);
  const initialValues = {
    name: '',
    brand: '',
    roast: '',
    notes: '',
    product_url: '',
    image_url: ''
  }
  const [values, setValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState(0);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values, 
      [name]: value,
    })
  }
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const handlePhotoUpload = (event) => {
    event.preventDefault();
    setPhotoUpload(false);
    if (values.image_url) {
      setUploadedImage(values.image_url);
    }
    if (!values.image_url) {
      setUploadedImage(null);
    }
  }

  let bean = "BEAN";
  let brand = "By Brand";
  if (values.name) {
    bean = values.name;
  }
  if (values.brand) {
    brand = values.brand;
  }

  return {
    photoUpload,
    setPhotoUpload,
    initialValues,
    values,
    setValues,
    imageFile,
    setImageFile,
    handleInputChange,
    uploadedImage,
    setUploadedImage,
    handlePhotoUpload,
    bean,
    brand,
  }
}