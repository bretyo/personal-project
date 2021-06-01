import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPlayers, setPrompts } from "../../../../redux/gameReducer"

const MPCredits=(props)=>{
    const{switchScreen} = props
    const{players,prompts} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch()
    console.log(players)

    const playAgain=()=>{
        let prevPlayers = [...players]
            prevPlayers.forEach(player => {
                player.score=0
            });
            console.log(prevPlayers)
        dispatch(setPlayers(prevPlayers))
        
        switchScreen('intro')
    }

    useEffect(()=>{
        dispatch(setPrompts({...prompts, images: [...prompts.images.slice(players.length * 2 + 2)]}))// <-- the math takes into account the players amount for all three rounds as well as the intro picture
    },[])

    return(
        <div>
            CREDITS SCREEN YO
            {players &&  players.map(player=>{
                return (
                    <div key={player.user_name}>
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })}
            <button onClick={()=>window.location.reload()}>Start Over? (New Players)</button>
            <button onClick={playAgain}>Play Again? (Same Players)</button>
        </div>
    )
}
export default MPCredits;