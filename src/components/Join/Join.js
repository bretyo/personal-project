import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
// import axios from 'axios'
import io from 'socket.io-client'

const Join =()=>{
    const[user_name, setUsername] = useState('');
    const[code,setCode] = useState('');
    const [joined, setJoined]= useState(false)
    const [waiting, setWaiting] = useState(true)
    const [waitText,setWaitText]=useState('');
    const [screen,setScreen] = useState('')
    const {user} = useSelector(store=>store.authReducer)

    // ---------- SOCKET HANDLERS ------------
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
        if(!socket){ //<---- to check if socket is already connected
            setSocket(io.connect())

        }
        else{
            socket.on('join-room',()=>{
                setWaitText('Successfully Joined!')
                setJoined(true)
                socket.emit('player-join')
            })

            socket.on('join-failed',(body)=>{
                window.alert(body.msg)
            })

        }



        return()=>{
            if(socket){
                socket.disconnect()
                setSocket(null)

            }
        }
    }, [socket])

    const handleUsernameChanges=(text)=>{
        if(text.length > 12){
            text = text.slice(0, 12)
        }
        setUsername(text)
    }

    const handleJoin=()=>{
        // needs to check if username is only A-Z
        const letters = /^[A-Z0-9]+$/
        !user_name.match(letters) ? window.alert('NO SPECIAL CHARACTERS OR SPACES!') :
        //client attempt join
        socket.emit('attempt-join', {code, player: {...user,user_name: user_name, id: socket.id}});

        //if statment with client join-game or error
    }
    console.log({user})
    return(
        <div>
            {!joined?
                (<div>
                    <input placeholder='username' value={user_name} onChange={e=>handleUsernameChanges(e.target.value.toUpperCase())}  />
                    <input placeholder='code' value={code} onChange={e=>setCode(e.target.value.toUpperCase())}  />
                    <button onClick={handleJoin} >Join Game</button>
                </div>)
            :
                waiting? <h2>{waitText}</h2> : {screen}
            }

        </div>
    )
}
export default Join