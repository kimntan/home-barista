import { useState } from 'react';
import { usePostUser } from '../../utils/hooks/post-hooks';
import HomePage from '../HomePage/HomePage';
import './Landing.scss';

export default function Landing() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [match, setMatch] = useState(true);
  const {loading, error, success, setCredentials} = usePostUser();
  
  const initialSignUpValues = {
    username: '',
    password: '',
    confirmPassword: ''
  }
  const [signupValues, setSignupValues] = useState(initialSignUpValues)

  const handleSignUpClick = () => {
    setIsLoggedIn(false);
    setIsSignedUp(true);
  }

  const handleBackClick = () => {
    setIsLoggedIn(true);
    setIsSignedUp(false);
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
    if (event.target.password.value !== event.target.confirmPassword.value) {
      setMatch(false);
    } else {
      setMatch(true);
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      console.log(credentials);
    }
  }

  const renderLogin = () => (
    <div className="login">
      <header className="login__header">
        <h1 className="login__title">HOME BARISTA</h1>
      </header>
      <div className="login__container">
        <h2 className="login__prompt">Sign into your account</h2>
        <form className="login__form">
          <input type="text" name="username" placeholder="Username" className="login__input"></input>
          <input type="text" name="password" placeholder="Password" className="login__input"></input>
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
          type="text" 
          name="password" 
          value={signupValues.password} 
          placeholder="Password" 
          onChange={handleSignupChange}
          className={!match ? "signup__input signup__input--invalid" : "signup__input"}>
        </input>
        <input 
          type="text" 
          name="confirmPassword" 
          value={signupValues.confirmPassword} 
          placeholder="Confirm password" 
          onChange={handleSignupChange}
          className={!match ? "signup__input signup__input--invalid" : "signup__input"}>
        </input>
        <button type="submit" className="signup__submit">Sign Up</button>
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