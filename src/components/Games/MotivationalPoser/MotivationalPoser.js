import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setSelectedGame} from '../../../redux/gameReducer'
import io from 'socket.io-client'

const MotivationalPoser =()=>{
    const MIN_PLAYERS = 3;
    const MAX_PLAYERS = 6;
    const [playerCount,setPCount] = useState(0) // This exists so i can quickly save this to state when receiving an attempt to join instead of sending another emit and waiting on that before raising the player count.
    const [players, setPlayers] = useState([]) // This keeps track of players names, score
    const [code, setCode] = useState(null)
    const [socket, setSocket] = useState(null)
    const {selectedGame} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSelectedGame(0))
        setCode(generateCode('',5))
        setSocket(io.connect())
    }, [dispatch])

    const generateCode=(_code, num)=>{
        if(num<=0){
            return _code;
        }
        const abc='qwertyuiopasdfghjklzxcvbm'
        _code = _code +  abc[Math.floor(Math.random() * abc.length)].toUpperCase()
        return generateCode(_code, num-1);
    }

    console.log(selectedGame)

    return(
        <div>
            <h2>MotivationalPoser</h2>
            <h3>Code: {code}</h3>
            <button>Start Game</button>
        </div>
    )
}
export default MotivationalPoser 