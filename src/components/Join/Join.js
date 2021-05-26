import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'

const Join =()=>{
    const[username, setUsernam] = useState('');
    const[code,setCode] = useState('');
    const [joined, setJoined]= useState(false)

    const handleJoin=()=>{
        //client attempt join

        //if statment with client join-game or error
    }

    return(
        <div>
            <input value={username} onChange={e=>setUsernam(e.target.value)}  />
            <input value={code} onChange={e=>setCode(e.target.value)}  />
            <button onClick={handleJoin} >Join Game</button>
        </div>
    )
}
export default Join