import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSelectedGame, setPlayers, setPlaying} from '../../../../../redux/gameReducer'
import MPPlayerDisplay from "./MPPlayerDisplay"
import badwordsRegExp from 'badwords/regexp'

const MPStartScreen=(props)=>{
    const {setRoom,socket, switchScreen, nextScreen} = props
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
        if(selectedGame === selectedGameRef.current && socket){
            setRoom(code)
            socket.emit('start-room', {code})
        }
    }, [socket, code, selectedGame]) // <--- 

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
            dispatch(setPlayers([...playersRef.current, {...body, score: 0, profileURL : `https://robohash.org/${body.id}.png?`}]))
    
            // Returns confirmation for player to be added to room
            return {success: true, msg: 'Successfully Joined!'}
    
        }

        const handleJoinAttempt=(body)=>{

                // Invokes login Attempts
                const response = loginAttemptChecks(body.player);
                if(response.success===true){
                    socket.emit('confirm-join', {...body, ...response}) 
                } 
                else{
                    socket.emit('reject-join', {...body, ...response})
                }
                
        }
        if(socket){
            // Players on Join component attempt to join room
            socket.on('attempt-join-room', handleJoinAttempt)
        }

        return()=>{
            if(socket){
                socket.off('attempt-join-room' ,handleJoinAttempt) // <--- important, otherwise we have listeners adding on top of each other.
            }
        }
    }, [socket, dispatch])


    // --------------FUNCTIONS---------------

    const startCountdown=()=>{
        dispatch(setPlaying(true))
        switchScreen(nextScreen)
    }

    return(
        <div >
            {selectedGame ? (
                <div className='start-screen'>
                    <section className='room-info'>
                        <h2>Motivational Poser</h2>
                        <h3><span>Code: {code}</span></h3>
                        <h3>-- Join game from any device at <span>bretboxgames.com/join</span> --</h3>
                        <h3 id='mp_players'>Players: {players.length}/{selectedGame.game_players_max}</h3>
                        { players.length >= selectedGame.game_players_min && <button onClick={startCountdown}>Start Game</button> }
                    </section>
                    <section className='player-display-section'>
                        {players && players.map(player=>{
                            return <MPPlayerDisplay key={player.user_name} profileURL={player.profileURL} user_name={player.user_name} />
                        })}
                    </section>
                </div>
            ) : 
                <h2>Loading...</h2>
            }
        </div>
    )
}
export default MPStartScreen