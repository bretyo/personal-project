import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {setSelectedGame, setPlayers} from '../../../../../redux/gameReducer'
import axios from 'axios'
import MPPlayerDisplay from "./MPPlayerDisplay"
import badwordsRegExp from 'badwords/regexp'
import atk from './Atk_DM004.mp3'

const MPStartScreen=(props)=>{
    const {setRoom,socket, setRound, switchScreen, nextScreen} = props
    const {selectedGame, games, players} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

// ------------SELECTED GAME HANDLER----------

    useEffect(()=>{
        dispatch(setSelectedGame(0))
    },[games, dispatch]) // <--- KEEP TRACK OF GAMES BECAUSE THE GAMES ARRAY LOADS EMPTY AT FIRST

    const playersRef = useRef(players)
    useEffect(()=>{
        playersRef.current=players
    })

    const selectedGameRef = useRef(selectedGame);
    useEffect(()=>{
        selectedGameRef.current = selectedGame;
    })

// -------------CODE GENERATOR---------------
    
    const [code, setCode] = useState(null)
    useEffect(()=>{
        
        const generateCode=(_code, num)=>{
            console.log('code: ' + _code, 'num: ' + num)
            if(num<=0){
                if(_code.match(badwordsRegExp)){
                    return generateCode('', 6)
                }
                return _code;
            }
            const abc='qwertyuiopasdfghjklzxcvbnm'
            _code = _code +  abc[Math.floor(Math.random() * abc.length)].toUpperCase()
            return generateCode(_code, num-1);
        }
        setCode(generateCode('',6))
        
    }, []) // <--- MUST KEEP TRACK OF SELECTED GAME BECAUSE IT WON'T UPDATE THE ROOM CODE IN THE FRONT END

// -----------SOCKET HANDLERS------------
    useEffect(()=>{
        if(selectedGame === selectedGameRef.current){
            setRoom(code)
            socket.emit('start-room', {code})
        }
    }, [socket, code]) // <--- 

    useEffect(()=>{
        //function 
        const loginAttemptChecks= body=>{
            // checks if any joined player has the same username
            let nameTaken = false;
            playersRef.current && playersRef.current.forEach(player=>{
                if(player.user_name === body.user_name){
                    (nameTaken = true);
                } 
            })
            if(nameTaken) return {success: false, msg: 'Username Taken.'}
    
            // responds false if room max has been met
            if(playersRef.current.length === selectedGameRef.current.game_players_max){
                return {success: false, msg: 'Room Full.'}
            } 

    
            // Adds player to players array
            dispatch(setPlayers([...playersRef.current, {...body, score: 100, profileURL : `https://robohash.org/${body.id}.png`}]))
    
            // Returns confirmation for player to be added to room
            return {success: true, msg: 'Successfully Joined!'}
    
        }


        if(socket){
            // Players on Join component attempt to join room
            socket.on('attempt-join-room', (body)=>{
                console.log(body)

                // Invokes login Attempts
                const response = loginAttemptChecks(body);
                console.log(response)
                if(response.success===true){
                    socket.emit('confirm-join', {...body, ...response}) 
                } 
                else{
                    socket.emit('reject-join', {...body, ...response})
                }
                
                console.log({...body, ...response});
            })
        }
    }, [socket])


    // --------------FUNCTIONS---------------

    const startCountdown=()=>{
        switchScreen(nextScreen)
    }

    


    // console.log(badwordsRegExp)
    selectedGame && console.log(selectedGame.game_players_max)
    let utterance = new SpeechSynthesisUtterance("If i wasn't human, don't you think i'd tell you?");
    utterance.rate= 1.25;
    const audioatk=new Audio(atk)

    console.log(players)
    return(
        <div>
            {selectedGame ? (
                <div className='start-screen'>
                    <section className='room-info'>
                        <h2>Motivational Parsers</h2>
                        <h3>Code: {code}</h3>
                        <h3>Players: {players.length}/{selectedGame.game_players_max}</h3>
                        { /*players.length >= selectedGame.game_players_min &&*/ <button onClick={startCountdown}>Start Game</button> }
                    </section>
                    <section className='player-display-section'>
                        {players && players.map(player=>{
                            return <MPPlayerDisplay key={player.user_name} profileURL={player.profileURL} user_name={player.user_name} />
                        })}
                    </section>
                    {/* <button onClick={()=>socket.emit('start-room', {code})}>Join room test</button> */}
                    {/* <button onClick={()=>window.location.reload()}>Refresh page test</button> */}
                    <button onClick={()=>speechSynthesis.speak(utterance)}>Text to speech test</button>
                    <button onClick={()=>speechSynthesis.cancel()}>Cancel speech test</button>
                    {/* <button onClick={()=>audioatk.play()} >Audio Test</button> */}
                </div>
            ) : 
                <h2>Loading...</h2>
            }
        </div>
    )
}
export default MPStartScreen