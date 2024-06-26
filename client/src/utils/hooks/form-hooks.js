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
  const [imageFile, setImageFile] = useState('');

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values, 
      [name]: value,
    })
  }

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
    console.log(imageFile);
  }
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const handlePhotoUpload = (event) => {
    event.preventDefault();
    setPhotoUpload(false);
    if (values.image_url) {
      setUploadedImage(values.image_url);
    }
    if (imageFile) {
      setUploadedImage(URL.createObjectURL(imageFile));
    }
    if (!values.image_url && !imageFile) {
      setUploadedImage(null);
    }
    console.log(imageFile);
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
    handleImageFileChange,
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
  const [values, setValues] = useState(initialValues);
  const [notes, setNotes] = useState('');
  const [parameters, setParameters] = useState([]);
  
  useEffect(() => {
    if (!loading) {
      setNotes(recipe.notes);

      if (recipe.brew_method === 'Espresso') {
        setParameters([
          {name: "dose", value: recipe.dose},
          {name: "output", value: recipe.output},
          {name: "time", value: recipe.time},
          {name: "temp", value: recipe.temp},
          {name: "grind", value: recipe.grind}
        ])
        setValues({
          "dose": recipe.dose,
          "output": recipe.output,
          "time": recipe.time,
          "temp": recipe.temp,
          "grind": recipe.grind
        })
      } else {
        setParameters([
          {name: "dose", value: recipe.dose},
          {name: "water", value: recipe.water},
          {name: "time", value: recipe.time},
          {name: "temp", value: recipe.temp},
          {name: "grind", value: recipe.grind}
        ])
        setValues({
          "dose": recipe.dose,
          "water": recipe.water,
          "time": recipe.time,
          "temp": recipe.temp,
          "grind": recipe.grind
        })
      } 
    }
  }, [recipe, loading])

  const handleParameterChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setValues({
      ...values, 
      [name]: value,
    })
  }

  const handleNoteInputChange = (event) => {
    setNotes(event.target.value);
  }

  return {
    values, 
    handleParameterChange,
    parameters,
    notes, 
    handleNoteInputChange
  }
}

export const useAddRecipeForm = (methodName) => {
  const initialValues = {
    dose: '',
    output: '',
    water: '',
    time: '',
    temp: '',
    grind: ''
  }

  const [values, setValues] = useState(initialValues);
  let parameters;

  if (methodName === 'Espresso') {
    parameters = [
      'dose',
      'output',
      'time',
      'temp',
      'grind'
    ]
  } else {
    parameters = [
      'dose',
      'water',
      'time',
      'temp',
      'grind'
    ]
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    setValues({
      ...values, 
      [name]: value,
    })
  }

  return {
    values,
    parameters,
    handleInputChange
  }
}