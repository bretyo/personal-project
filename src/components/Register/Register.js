import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setUser} from '../../redux/authReducer'
import {useState} from 'react'
const Register=()=>{
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passConf, setPassConf] = useState('')

    const dispatch = useDispatch();

    const handleRegister=()=>{
        if(!email || !password || !passConf){
            return window.alert('Make sure all fields are entered!')
        }
        if(password.length > 9){
            if(password === passConf){
                axios.post('/auth/register', {email, password})
                .then(res=>{
                    console.log(res.data)
                    dispatch(setUser(res.data))
                })
                .catch(err=>{
                    console.log(err)
                })
                
            }
            else{
                return window.alert('Passwords must Match!')
            }
        }
        else{
            return window.alert('Password must be greater than 9 characters!')
        }
    }

    return(
        <section className={'register'}>
            <div className={'register-inputs'}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
                <input type='password' value={passConf} onChange={(e)=>setPassConf(e.target.value)} placeholder='confirm password' />
            </div>
            <button onClick={handleRegister}>Register</button>
        </section>
    )
}
export default Register;
