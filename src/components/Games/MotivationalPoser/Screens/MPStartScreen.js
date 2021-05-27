import { useEffect, useState } from "react"

const MPStartScreen=(props)=>{
    const [code, setCode] = useState(null)


    useEffect(()=>{
        setCode(generateCode('',5))
    },[])

    const generateCode=(_code, num)=>{
        if(num<=0){
            return _code;
        }
        const abc='qwertyuiopasdfghjklzxcvbm'
        _code = _code +  abc[Math.floor(Math.random() * abc.length)].toUpperCase()
        return generateCode(_code, num-1);
    }

    const startCountdown=()=>{

    }

    return(
        <div>
            <h2>MotivationalPoser</h2>
            <h3>Code: {code}</h3>
            <button onClick={()=>props.switchScreen(props.nextScreen)}>Start Game</button>
        </div>
    )
}
export default MPStartScreen