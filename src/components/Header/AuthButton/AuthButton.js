import {useState} from 'react'
import Register from '../../Register/Register';
import SignIn from '../../SignIn/SignIn';

const AuthButton=(props)=>{

    const [logging, setLogging] = useState(false)
    const [registering, setRegistering] = useState(false);
    const [signingIn, setSigningIn] = useState(false)

    const handleLogToggle=()=>{
        if(signingIn || registering){
            signingIn && setSigningIn(false)
            registering && setRegistering(false)

        }
        else setLogging(!logging)
    }

    const toggleRegister=()=>{
        setLogging(false)
        setRegistering(true)
    }

    const toggleSignIn=()=>{
        setLogging(false)
        setSigningIn(true)
    }

    return(
        <div>
            <button onClick={handleLogToggle}>{logging || registering || signingIn? 'Cancel' : 'Sign In/Register'}</button>
            {
                logging&&(
                    <div>
                        <button onClick={toggleRegister}>Register New Account</button>
                        <button onClick={toggleSignIn} >Sign In with Existing</button>
                    </div>
                )
            }
            {
                registering && <Register/>
            }
            {
                signingIn && <SignIn />
            }
        </div>
    )
}
export default AuthButton;