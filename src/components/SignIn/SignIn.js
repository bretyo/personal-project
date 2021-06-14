import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setUser} from '../../redux/authReducer'
import {useState} from 'react'
const SignIn=()=>{
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin=()=>{
        axios.post('/auth/login', {email, password})
        .then(res=>{
            dispatch(setUser(res.data))
        })
        .catch(err=>{
            window.alert(err)
            console.log(err)
        })
    }

    return(
        <div className='login'>
            <div className='login-inputs'>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
            </div>
            <button onClick={handleLogin}>Sign In</button>
        </div>
    )
}
export default SignIn