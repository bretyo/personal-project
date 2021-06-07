import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setGames,setSelectedGame, setPlayers} from '../../../../../redux/gameReducer'
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
            // console.log('code: ' + _code, 'num: ' + num)
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
            dispatch(setPlayers([...playersRef.current, {...body, score: 0, profileURL : `https://robohash.org/${body.id}.png`}]))
    
            // Returns confirmation for player to be added to room
            return {success: true, msg: 'Successfully Joined!'}
    
        }

        const handleJoinAttempt=(body)=>{
            // console.log(body)

                // Invokes login Attempts
                const response = loginAttemptChecks(body.player);
                // console.log(response)
                if(response.success===true){
                    socket.emit('confirm-join', {...body, ...response}) 
                } 
                else{
                    socket.emit('reject-join', {...body, ...response})
                }
                
                // console.log({...body, ...response});
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
    }, [socket])


    // --------------FUNCTIONS---------------

    const startCountdown=()=>{
        switchScreen(nextScreen)
    }

    const handleUnsplashTest=()=>{
        // console.log(MY_ACCESS_KEY)
        axios.get('/api/images')
          .then(res=>{
              console.log(res.data.response)
          })
          .catch(err=>{
              console.log(err)
          })
    }

    const handlePromptsTest=()=>{
        axios.get('/api/prompts/1')
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const addToStats=(game,score,win, user_id)=>{
        console.log(game)
        axios.put(`/api/games/${game}`)
        .then(res=>{
            dispatch(setGames(res.data))
        })
        .catch(err=>console.log(err))
        axios.get(`/api/stats/${game}/${user_id}`)
        .then(res=>{
            console.log(res.data)    
            if(res.data.length){
                axios.put(`/api/stats/${game}`, {wins: win, score, user_id})
                .then()
                .catch(err=>console.log(err))
            }
            else{
                axios.post(`/api/stats/${game}`, {wins: win, score, user_id})
                .then()
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    const handleSocketTest=()=>{
        const winner = players.reduce((acc, curr)=>curr.score > acc.score? curr: acc ,{score:-1})
        players.forEach(player=>{
            player.user_id && addToStats(selectedGame.game_id, player.score, player===winner? 1:0, player.user_id)
            socket.emit('game-end', {playerID: player.id, win: player===winner?true:false})
        })
    }

    // console.log(badwordsRegExp)
    // selectedGame && console.log(selectedGame.game_players_max)
    let utterance = new SpeechSynthesisUtterance("If i wasn't human, don't you think i'd tell you?");
    utterance.rate= 1.25;
    const audioatk=new Audio(atk)

    console.log(players)
    return(
        <div>
            {selectedGame ? (
                <div className='start-screen'>
                    <section className='room-info'>
                        <h2>Motivational Poser</h2>
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
                    <button onClick={handleSocketTest}>socket win/lose test</button>
                </div>
            ) : 
                <h2>Loading...</h2>
            }
        </div>
    )
}
export default MPStartScreen