// import './Games.css'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import GameEntry from './GameEntry';
import {setSelectedGame} from '../../redux/gameReducer'

const Games =(props)=>{
    const {games} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setSelectedGame(-1))
    }, [dispatch])

    // console.log(games)
    return(
        <div className='games-container'>
            {
                games ?(
                <ul className='game-list'>
                    <GameEntry game={games[0]} push={()=>props.history.push('/games/m_poser')} />
                    <GameEntry game={games[1]} push={()=>props.history.push('/games/m_poser')} />
                </ul>

                )
                :(
                    <h2>Loading...</h2>
                )
            }
        </div>
    )
}
export default Games