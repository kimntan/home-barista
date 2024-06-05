import { useEffect, useState } from 'react';
import { usePostUser } from '../../utils/hooks/post-hooks';
import { signupValidator } from '../../utils/validators/login';
import HomePage from '../HomePage/HomePage';
import './Landing.scss';

export default function Landing() {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {error, setError, success, setSuccess, setCredentials} = usePostUser();
  const [errorMessage, setErrorMessage] = useState('');
  const initialSignUpValues = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  const [signupValues, setSignupValues] = useState(initialSignUpValues)
  
  const handleSignUpClick = (event) => {
    event.preventDefault();
    setIsSignedUp(false);
  }

  const handleBackClick = () => {
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

  const renderLogin = () => (
    <div className="login">
      <header className="login__header">
        <h1 className="login__title">HOME BARISTA</h1>
      </header>
      <div className="login__container">
        <h2 className="login__prompt">Sign into your account</h2>
        <form className="login__form" action={"http://localhost:8080/api/login"} method={"POST"}>
          <input type="text" name="username" placeholder="Username" className="login__input"></input>
          <input type="password" name="password" placeholder="Password" className="login__input"></input>
          <div className="login__buttons">
            <button className="login__signup" onClick={handleSignUpClick}>Sign Up</button>
            <button type="submit" className="login__submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderSignup = () => (
    <div className="signup">
    <header className="signup__header">
      <h1 className="signup__title">HOME BARISTA</h1>
    </header>
    <div className="signup__container">
      <button className="signup__back" onClick={handleBackClick}>Back</button>
      <h2 className="signup__prompt">Make an account</h2>
      <form className="signup__form" onSubmit={handleSignup}>
        <input 
          type="text" 
          name="username" 
          value={signupValues.username} 
          placeholder="Username" 
          onChange={handleSignupChange}
          className="signup__input">
        </input>
        <input 
          type="password" 
          name="password" 
          value={signupValues.password} 
          placeholder="Password" 
          onChange={handleSignupChange}
          className="signup__input">
        </input>
        <input 
          type="password" 
          name="confirmPassword" 
          value={signupValues.confirmPassword} 
          placeholder="Confirm password" 
          onChange={handleSignupChange}
          className="signup__input">
        </input>
        <button type="submit" className="signup__submit">Sign Up</button>
        {success || error || errorMessage 
          ? <div className="signup__message">{success}{error}{errorMessage}</div> 
          : null}
      </form>
    </div>
  </div>
  )

  if (!isSignedUp) return renderSignup();
  if (!isLoggedIn) return renderLogin();

  return (
    <HomePage />
  )
}