import { useEffect, useState } from 'react';
import { usePostUser } from "./post-hooks";
import { signupValidator } from '../validators/login';

export function useSignup(setIsSignedUp) {
  const {error, setError, success, setSuccess, setCredentials} = usePostUser();
  const [errorMessage, setErrorMessage] = useState('');
  const initialSignUpValues = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  const [signupValues, setSignupValues] = useState(initialSignUpValues)
  
  const handleCancelClick = (event) => {
    event.preventDefault();
    setIsSignedUp(true);
    setSuccess(null);
    setError(null);
  }

  const handleSignupChange = (event) => {
    const {name, value} = event.target;
    setSignupValues({
      ...signupValues, 
      [name]: value,
    })
  }

  const handleSignup = (event) => {
    event.preventDefault();
    setError(null);
    const signupValidation = signupValidator(signupValues);
    if (!signupValidation.valid) {
      setErrorMessage(signupValidation.message);
    } else {
      setErrorMessage('');
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      setCredentials(credentials);
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setIsSignedUp(true);
        setSignupValues(initialSignUpValues);
        setSuccess(null);
        setError(null);
      }, 1000)
    }
  }, [success])

  return {
    error,
    errorMessage,
    success,
    signupValues,
    handleCancelClick,
    handleSignupChange,
    handleSignup
  }
}