import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {setSelectedGame} from '../../../../redux/gameReducer'

const MPStartScreen=(props)=>{
    const {socket, setRound, switchScreen, nextScreen, setPlayers ,players} = props
    const {selectedGame, games} = useSelector(store=>store.gameReducer)
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
                return _code;
            }
            const abc='qwertyuiopasdfghjklzxcvbm'
            _code = _code +  abc[Math.floor(Math.random() * abc.length)].toUpperCase()
            return generateCode(_code, num-1);
        }
        setCode(generateCode('',5))
    }, []) // <--- MUST KEEP TRACK OF SELECTED GAME BECAUSE IT WON'T UPDATE THE ROOM CODE IN THE FRONT END

// -----------SOCKET HANDLERS------------
    useEffect(()=>{
        if(selectedGame === selectedGameRef.current){
            socket.emit('start-room', {code})
        }
    }, [socket, code]) // <--- 

    useEffect(()=>{
        //function 
        const loginAttemptChecks= body=>{
            // console.log('players: ',playersRef.current.length)
            // console.log('selected game max: ', selectedGameRef.current.game_players_max)
            // console.log('body: ', body)
            // checks if any joined player has the same username
            let nameTaken = false;
            playersRef.current && playersRef.current.forEach(player=>{
                // console.log(player)
                if(player.username === body.username){
                    (nameTaken = true);
                } 
            })
            if(nameTaken) return {success: false, msg: 'Username Taken.'}
    
            // responds false if room max has been met
            if(playersRef.current.length === selectedGameRef.current.game_players_max){
                // console.log('Players Ref: ', {playersRef})
                // console.log('selected game: ', {selectedGame})
                return {success: false, msg: 'Room Full.'}
            } 
    
            // Adds player to players array
            setPlayers(prevPlayers=>[...prevPlayers, {...body, score: 0}]);
    
            // Returns confirmation for player to be added to room
            return {success: true, msg: 'Successfully Joined!'}
    
        }


        if(socket){
            // Players on Join component attempt to join room
            socket.on('attempt-join-room', (body)=>{
                

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
    }, [socket, playersRef])


    // --------------FUNCTIONS---------------

    const startCountdown=()=>{
        setRound('round_1')
        switchScreen(nextScreen)
    }

    


    console.log(playersRef.current.length)
    selectedGame && console.log(selectedGame.game_players_max)
    return(
        <div>
            {selectedGame ? (
                <div>
                    <h2>START SCREEN</h2>
                    <h3>Code: {code}</h3>
                    <h3>Players: {players.length}/{selectedGame.game_players_max}</h3>
                    {players.length >= selectedGame.game_players_min && <button onClick={startCountdown}>Start Game</button>}
                    <button onClick={()=>socket.emit('start-room', {code})}>Join room test</button>
                </div>
            ) : 
                <h2>Loading...</h2>
            }
        </div>
    )
}
export default MPStartScreen