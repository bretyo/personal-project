import {useState, useEffect} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import axios from 'axios'
import io from 'socket.io-client'

const Join =()=>{
    const[username, setUsername] = useState('');
    const[code,setCode] = useState('');
    const [joined, setJoined]= useState(false)

    // ---------- SOCKET HANDLERS ------------
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
        if(!socket){ //<---- to check if socket is already connected
            setSocket(io.connect())

        }
        else{
            socket.on('join-room',()=>{
                socket.emit('player-join')
            })
        }



        return()=>{
            if(socket){
                socket.disconnect()
                setSocket(null)

            }
        }
    }, [socket])

    const handleJoin=()=>{
        // needs to check if username is <= 12 length

        //client attempt join
        socket.emit('attempt-join', {code, player: {username, id: socket.id}})

        //if statment with client join-game or error
    }

    return(
        <div>
            <input placeholder='username' value={username} onChange={e=>setUsername(e.target.value)}  />
            <input placeholder='code' value={code} onChange={e=>setCode(e.target.value)}  />
            <button onClick={handleJoin} >Join Game</button>
        </div>
    )
}
export default Join