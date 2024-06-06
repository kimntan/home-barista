import { useState } from 'react';
import Signup from '../../components/Signup/Signup';
import Login from '../../components/Login/Login';
import './Landing.scss';

export default function Landing() {
    const [isSignedUp, setIsSignedUp] = useState(true);

    return (
      <>
        {isSignedUp ? <Login setIsSignedUp={setIsSignedUp}/> : <Signup setIsSignedUp={setIsSignedUp}/>}
      </>
    )
}