import './Header.css'
import {useState} from 'react'
import Register from '../Register/Register';
import SignIn from '../SignIn/SignIn';
const Header=()=>{
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

    const handleRegister=()=>{
        setLogging(false)
        setRegistering(true)
    }

    const handleSignIn=()=>{
        setLogging(false)
        setSigningIn(true)
    }

    console.log(logging)
    return(
        <header>
            <div className='header-container'>
                <h1>BretBox</h1>
                <h2>Join Game</h2>
                <h2>Start Game</h2>
                <div>
                    <button onClick={handleLogToggle}>Sign In/Register</button>
                    {
                        logging&&(
                            <div>
                                <button onClick={handleRegister}>Register New Account</button>
                                <button onClick={handleSignIn} >Sign In with Existing</button>
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
            </div>
        </header>
    )
}
export default Header