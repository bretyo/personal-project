import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectedGame} from '../../redux/gameReducer'

const GameEntry=(props)=>{
    const {selectedGame} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();
    const {game} = props

    useEffect(()=>{
        return()=>{
            dispatch(setSelectedGame(-1))
        }
    },[dispatch])
    
    return(
        props.game?<li className='game-entry'>
           
            <h3 onClick={()=>dispatch(setSelectedGame(selectedGame.game_name === game.game_name?-1: game.game_id-1))} >{game.game_name}</h3>
            {
                selectedGame.game_name === game.game_name && (
                    <div className='game-info'>
                        <p>{game.game_description}</p>
                        <section className='game-details'>
                            <aside>Min Players: {game.game_players_min}</aside>
                            <aside>Max Players: {game.game_players_max}</aside>
                            <aside>Total Plays: {game.game_total_plays}</aside>
                        </section>
                        <button onClick={props.push}>Play</button>
                    </div>
                )
            }
                
        </li>
        :
        <h3>Loading...</h3>
    )
}

export default GameEntry