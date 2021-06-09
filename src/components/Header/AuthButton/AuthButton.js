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
        <li className={`auth-menu-btn`}>
            <h4 onClick={handleLogToggle}>{logging || registering || signingIn? 'Cancel' : 'Sign In/Register'}</h4>
            {
                logging&&(
                    <div className='reg-sign-btns'>
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
        </li>
    )
}
export default AuthButton;