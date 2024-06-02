import { useEffect, useState } from 'react';

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

export const useEditRecipe = (recipe, loading) => {
  const initialValues = {
    dose: '',
    output: '',
    water: '',
    time: '',
    temp: '',
    grind: ''
  }
  const [values, setValues] = useState(initialValues)

  const handleParameterChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setValues({
      ...values, 
      [name]: value,
    })
  }
  
  let parameters;
  if (!loading) {
    if (recipe.brew_method === 'Espresso') {
      parameters = [
        {name: "dose", value: recipe.dose},
        {name: "output", value: recipe.output},
        {name: "time", value: recipe.time},
        {name: "temp", value: recipe.temp},
        {name: "grind", value: recipe.grind_size}
      ]
    } else {
      parameters = [
        {name: "dose", value: recipe.dose},
        {name: "water", value: recipe.water},
        {name: "time", value: recipe.time},
        {name: "temp", value: recipe.temp},
        {name: "grind", value: recipe.grind_size}
      ]
    } 
  }

  return {
    values, 
    handleParameterChange,
    parameters
  }
}