import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectedGame} from '../../redux/gameReducer'

const GameEntry=(props)=>{
    const {selectedGame} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();
    console.log(props)
    const {game} = props

    useEffect(()=>{
        return()=>{
            dispatch(setSelectedGame(-1))
        }
    },[dispatch])
    
//     game_name: "Motivational Poser"
// ​​
// game_players_max: 6
// ​​
// game_players_min: 3
// ​​
// game_total_plays: 30
    return(
        props.game?<li>
           
            <h3 onClick={()=>dispatch(setSelectedGame(game.game_id-1))} >{game.game_name}</h3>
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