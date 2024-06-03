export const beanValidator = (values) => {
  const missingFields = [];

  for (const key in values) {
    if(key === 'name' || key === 'brand') {
      if (!values[key]) {
        missingFields.push(key);
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
