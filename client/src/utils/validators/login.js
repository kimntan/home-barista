export const signupValidator = (signupValues) => {
  const missingFields = [];
  const invalidFields = [];

  for (const key in signupValues) {
    if (!signupValues[key]) {
      missingFields.push(key);
    }
    if (signupValues[key].length < 8) {
      invalidFields.push(key);
    }
  }

  if (missingFields.length > 0) {
    return {
      valid: false, 
      message: `Please provide a value for ${missingFields.join(' and ')}. `
    }
  }

  if (invalidFields.length > 0) {
    return {
      valid: false,
      message: `Please ensure fields have at least 8 characters. `
    }
  }

  if (signupValues.password !== signupValues.confirmPassword) {
    return {
      valid: false,
      message: `Passwords do not match. `
    }
  }

  return {
    valid: true
  }
}
