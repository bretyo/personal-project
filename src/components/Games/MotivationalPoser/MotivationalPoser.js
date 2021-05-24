import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setSelectedGame} from '../../../redux/gameReducer'

const MotivationalPoser =()=>{
    const {selectedGame} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSelectedGame(0))
    }, [dispatch])
    return(
        <div>
            MotivationalPoser
        </div>
    )
}
export default MotivationalPoser 