import { Link } from "react-router-dom"
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../../../redux/authReducer'
import axios from "axios"

const UserDisplay =(props)=>{
    const {setNavShow} = props;
    const [showOptions, setShowOptions] = useState(false)
    const [changeUsername, setChangeUsername] = useState(false);
    const [username, setUsername] = useState('')
    const {user} = useSelector(store=>store.authReducer)
    const dispatch = useDispatch();

    const updateUsername=()=>{
        if(username.length <= 12){
            setShowOptions(false);
            setChangeUsername(false)
            axios.put('/auth/change_username', {username})
            .then(res=>{
                dispatch(setUser(res.data))

            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            window.alert('username must be 12 characters or less')
        }
    }

    const handleLogout=()=>{
        setNavShow(false);
        setShowOptions(false);
        axios.delete(`/auth/logout`)
        .then(res=>{
            console.log(res)
            dispatch(setUser(null))
        })
        .catch(err=>console.log)
    }

    console.log(user)
    return(
        <li className='user-display'>
            <h4 onClick={()=>setShowOptions(!showOptions)} >Welcome, {props.user.user_name}</h4>
            {showOptions && <aside>
                {!changeUsername? <button onClick={()=>setChangeUsername(!changeUsername)}>Change Username</button> : (
                    <div>
                        <input value={username} onChange={e=>setUsername(e.target.value)} />
                        <button onClick={updateUsername}>Confirm</button>
                    </div>
                )}
                {!changeUsername && <Link onClick={()=>setNavShow(false)} to='/account'><button onClick={()=>setShowOptions(!showOptions)}>Go to Account Details</button></Link>}
                {!changeUsername && <button onClick={handleLogout}>Logout</button>}
            </aside>}
        </li>
    )
}
export default UserDisplay