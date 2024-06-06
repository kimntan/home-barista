import { useEffect } from 'react';
import { usePostLogin } from '../../utils/hooks/post-hooks';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login({ setIsSignedUp }) {
  const {loginError, loginSuccess, setLoginCredentials} = usePostLogin();
  const navigate = useNavigate();
  
  const handleSignUpClick = (event) => {
    event.preventDefault();
    setIsSignedUp(false);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const loginCredentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    setLoginCredentials(loginCredentials)
  }

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigate(`/${loginSuccess.username}`)
      }, 1000)
    }
  }, [loginSuccess])

  return (
    <div className="login">
      <header className="login__header">
        <h1 className="login__title">HOME BARISTA</h1>
      </header>
      <div className="login__container">
        <h2 className="login__prompt">Sign into your account</h2>
        <form className="login__form" onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username" className="login__input"></input>
          <input type="password" name="password" placeholder="Password" className="login__input"></input>
          <div className="login__buttons">
            <button className="login__signup" onClick={handleSignUpClick}>Sign Up</button>
            <button type="submit" className="login__submit">Login</button>
          </div>
          {loginSuccess || loginError 
          ? <div className="signup__message">{loginSuccess ? loginSuccess.message : null}{loginError}</div> 
          : null}
        </form>
      </div>
    </div>
  )
}