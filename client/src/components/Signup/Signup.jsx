import './Signup.scss';
import { useSignup } from '../../utils/hooks/signup-hooks';

export default function Signup({ setIsSignedUp }) {
  const {
    error,
    errorMessage,
    success,
    signupValues,
    handleCancelClick,
    handleSignupChange,
    handleSignup
  } = useSignup(setIsSignedUp)
  
  return (
    <div className="signup">
      <header className="signup__header">
        <h1 className="signup__title">HOME BARISTA</h1>
      </header>
      <div className="signup__container">
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
            className={"signup__input"}>
          </input>
          <div className="signup__buttons">
            <button type="submit" className="signup__submit">Sign Up</button>
            <button className="signup__cancel" onClick={handleCancelClick}>Cancel</button>
          </div>
          {success || error || errorMessage 
            ? <div className="signup__message">{success}{error}{errorMessage}</div> 
            : null}
        </form>
      </div>
    </div>
  )
}