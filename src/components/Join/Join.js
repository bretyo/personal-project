import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
// import axios from 'axios'
import io from 'socket.io-client'
import MPPrompt from './MotivationalPoser/MPPrompt';
import MPVote from './MotivationalPoser/MPVote';


const Join =()=>{
    
    const[user_name, setUsername] = useState('');
    const[code,setCode] = useState('');
    const [joined, setJoined]= useState(false)
    const [waiting, setWaiting] = useState(true)
    const [waitText,setWaitText]=useState('');
    const [screen,setScreen] = useState(null)
    const {user} = useSelector(store=>store.authReducer)
    const [prompt, setPrompt] = useState({})
    const [answers, setAnswers] = useState([])

    // ---------- SOCKET HANDLERS ------------
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
        if(!socket){ //<---- to check if socket is already connected
            setSocket(io.connect())

        }
        else{
            socket.on('join-room',(body)=>{
                setWaitText('Successfully Joined!')
                setJoined(true)
                socket.emit('player-join', body.code)
            })

            socket.on('join-failed',(body)=>{
                window.alert(body.msg)
            })

            socket.on('leave-room', ()=>{
                socket.emit('leave-room-relay', code)
                setJoined(false)
            })

            socket.on('receive-prompt',(body)=>{
                console.log(body)
                setPrompt(body)
                if(body.game==='MP'){
                    setScreen('MP_Prompt')
                }
                setWaiting(false)
                // !screen && setWaiting(true)
            })

            socket.on('server-send-clients-votes',body=>{
                console.log(body)
                setAnswers(body.answers)
                if(body.answers[0].game==='MP'){
                    setScreen('MP_Vote')
                }
                setWaiting(false)
            })

            socket.on('round-end-client',()=>{
                !waiting && setWaiting(true);
                socket.emit('client-send-response', {...prompt, user: {...user, user_name}})
                //I will emit the image and prompt with no answer
                // socket.emit
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
        if(text.length > 10){
            text = text.slice(0, 10)
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

    const sendResponse=(response)=>{
        // emit to gameID the response, which will be the prompt with an added Answer key
        socket.emit('client-send-response', {...prompt, response, user: {...user, user_name}})
        setWaiting(true)
    }

    const handleVote=(vote)=>{
        socket.emit('client-send-vote', {vote: {...vote, fromUser: user_name}, hostId: prompt.gameSocketId})
        setWaiting(true)
        console.log(vote)
    }

    const screens = {
        MP_Prompt: {name: 'MP_Prompt', screen: <MPPrompt sendResponse={sendResponse} setWaiting={setWaiting} prompt={prompt} />},
        MP_Vote: {name: 'MP_Vote', screen: <MPVote my_name={user_name} handleVote={handleVote} answers={answers} />}
    }

    console.log(screen)
    return(
        <div>
            {!joined?
                (<div>
                    <input placeholder='username' value={user_name} onChange={e=>handleUsernameChanges(e.target.value.toUpperCase())}  />
                    <input placeholder='code' value={code} onChange={e=>setCode(e.target.value.toUpperCase())}  />
                    <button onClick={handleJoin} >Join Game</button>
                </div>)
            :
                waiting? <h2>{waitText}</h2> : screens[screen].screen
            }
            {/* <button onClick={handleUnsplashTest}>Testing the Unsplash get</button> */}

        </div>
    )
}
export default Join