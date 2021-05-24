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
            console.log(res.data)
            dispatch(setUser(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
            <button onClick={handleLogin}>Sign In</button>
        </div>
    )
}
export default SignIn