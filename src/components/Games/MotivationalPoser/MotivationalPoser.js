import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setSelectedGame} from '../../../redux/gameReducer'

const MotivationalPoser =()=>{
    const [code, setCode] = useState(null)
    const {selectedGame} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        setCode(generateCode('',5))
        dispatch(setSelectedGame(0))
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