import { useEffect, useState } from "react"
import { Socket } from "socket.io"

const MPStartScreen=(props)=>{
    const {socket, setRound, switchScreen, nextScreen, players, selectedGame} = props
    
    const startCountdown=()=>{
        setRound('round_1')
        switchScreen(nextScreen)
    }
    
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
    }, [])
// -----------SOCKET HANDLERS------------
    useEffect(()=>{
        if(selectedGame){
            socket.emit('start-room', {code})
        }
    }, [selectedGame, socket, code])

    useEffect(()=>{
        if(socket){
            

            socket.on('attempt-join-room', (body)=>{
                // if players.length !== game_players_max: add player to players; emit join player
                socket.emit('confirm-join', body)
                console.log(body);
            })
        }
    }, [socket])


    console.log(socket)
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