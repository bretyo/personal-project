import { useEffect, useState } from "react"

const MPStartScreen=(props)=>{
    const [code, setCode] = useState(null)
    const {setRound, switchScreen, nextScreen} = props

    
    const generateCode=(_code, num)=>{
        if(num<=0){
            return _code;
        }
        const abc='qwertyuiopasdfghjklzxcvbm'
        _code = _code +  abc[Math.floor(Math.random() * abc.length)].toUpperCase()
        return generateCode(_code, num-1);
    }
    
    const startCountdown=()=>{
        setRound('round_1')
        switchScreen(nextScreen)
    }

    useEffect(()=>{
        setCode(generateCode('',5))
    }, [])

    return(
        <div>
            <h2>START SCREEN</h2>
            <h3>Code: {code}</h3>
            <button onClick={startCountdown}>Start Game</button>
        </div>
    )
}
export default MPStartScreen