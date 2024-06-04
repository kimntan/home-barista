export const recipeValidator = (values, methodName) => {
  const missingFields = [];

  if (methodName === 'Espresso') {
    for (const key in values) {
      if(key !== 'water') {
        if (!values[key]) {
          missingFields.push(key);
        }
      }
    }
  } else {
    for (const key in values) {
      if(key !== 'output') {
        if (!values[key]) {
          missingFields.push(key);
        }
      }
    }
  }

  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Please provide a value for ${missingFields.join(', ')}`
    }
  }

  return {
    valid: true
  }
}