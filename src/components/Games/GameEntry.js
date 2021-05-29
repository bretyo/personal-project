import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setSelectedGame} from '../../redux/gameReducer'

const GameEntry=(props)=>{
    const {selectedGame} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();
    console.log(props)
    return(
        <li>
            {props.game&&(
                <div>
                    <h2 onClick={()=>dispatch(setSelectedGame(props.game.game_id-1))} >{props.game.game_name}</h2>
                    {
                        selectedGame.game_name === props.game.game_name && (
                            <div>
                                <button onClick={props.push}>Play</button>
                            </div>
                        )
                    }
                </div>
            )}
        </li>
    )
}

export default GameEntry