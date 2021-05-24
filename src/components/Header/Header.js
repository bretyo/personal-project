import './Header.css'
import {useState} from 'react'
import Register from '../Register/Register';
import SignIn from '../SignIn/SignIn';
import { Link } from 'react-router-dom';

const Header=(props)=>{
    const [logging, setLogging] = useState(false)
    const [registering, setRegistering] = useState(false);
    const [signingIn, setSigningIn] = useState(false)
    //Temp local loggedIn state for Header

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

    // console.log(logging)
    return(
        <header>
            <div className='header-container'>
                <Link to='/'><h1>BretBox</h1></Link>
                <Link to='/join'><h2>Join Game</h2></Link>
                <Link to='/games'><h2>Start Game</h2></Link>
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
            </div>
        </header>
    )
}
export default Header