import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
// import axios from 'axios'
import io from 'socket.io-client'
import MPPrompt from './MotivationalPoser/MPPrompt';


const Join =()=>{
    
    const[user_name, setUsername] = useState('');
    const[code,setCode] = useState('');
    const [joined, setJoined]= useState(false)
    const [waiting, setWaiting] = useState(true)
    const [waitText,setWaitText]=useState('');
    const [screen,setScreen] = useState(null)
    const {user} = useSelector(store=>store.authReducer)
    const [prompt, setPrompt] = useState({})

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

    // function saveText(text, filename){
    //     var a = document.createElement('a');
    //     a.setAttribute('href', 'data:text/json;charset=utf-8,'+encodeURIComponent(JSON.stringify(text)));
    //     a.setAttribute('download', filename);
    //     a.click()
    //   }
    // const unsplash = createApi({ accessKey: MY_ACCESS_KEY });
    // const handleUnsplashTest=()=>{
    //     console.log(MY_ACCESS_KEY)
    //     unsplash.photos.getRandom({
    //         count: 30,
    //         collectionIds:['vRNcKbAK9uQ']
    //       })
    //       .then(res=>{
    //           console.log(res.response)
    //           saveText(res.response, 'reTest.json')
    //       })
    //       .catch(err=>{
    //           console.log(err)
    //       })
    // }

    const screens = {
        MP_Prompt: {name: 'MP_Prompt', screen: <MPPrompt sendResponse={sendResponse} setWaiting={setWaiting} prompt={prompt} />}
    }

    console.log(waiting)
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