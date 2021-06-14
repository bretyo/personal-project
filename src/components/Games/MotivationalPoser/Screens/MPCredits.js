import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlayers, setPrompts, setPlaying } from "../../../../redux/gameReducer"

const MPCredits=(props)=>{
    const{switchScreen, socket, room} = props
    const{players,prompts} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch()

    const playAgain=()=>{
        let prevPlayers = [...players]
            prevPlayers.forEach(player => {
                player.score=0
            });
        dispatch(setPlayers(prevPlayers))
        dispatch(setPlaying(true))
        
        
        switchScreen('intro')
    }

    const newGame=()=>{
        socket.emit('force-players-leave', room)
        window.location.reload()
    }

    useEffect(()=>{
        dispatch(setPlaying(false))
        dispatch(setPrompts({...prompts, images: [...prompts.images.slice(players.length * 2 + 2)]}))// <-- the math takes into account the players amount for all three rounds as well as the intro picture
    },[dispatch, players.length])

    return(
        <div className='credits'>
            <h2>FIN</h2>
            
            <button onClick={newGame}>Start Over? (New Players)</button>
            <button onClick={playAgain}>Play Again? (Same Players)</button>
        </div>
    )
}
export default MPCredits;