import { useEffect, useState } from "react";
import MPFinalRound from "./Rounds/MPFinalRound";
import MPRoundOne from "./Rounds/MPRoundOne";
import MPRoundTwo from "./Rounds/MPRoundTwo";

const MPRoundsScreen=(props)=>{
    const [screenRound, setScreenRound] = useState()
    const [count, setCount] = useState(5); // <-- default value of count = 90
    const[roundStarted, setRoundStarted] = useState(false)

    const {round, switchScreen} = props
    useEffect(() => {
        handleScreenLoad(round)
        // console.log(round)
    },[]);

    useEffect(()=>{

    },[round])

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            roundStarted && setCount(count-1)
            !count && switchScreen('show')//<-- NEED TO FIX THIS, BECAUSE ON THE FINAL ROUND IT DOESN'T GO TO THE CORRECT SCREEN AFTER FINAL ROUND. ALSO NEED TO ADD A TRANSITION STATE
        }, 1000)
        console.log(count)
        return()=>{
            clearTimeout(timeout)
        }
    })

    const handleScreenLoad=(round)=>{
        console.log({round})
        setScreenRound(round)
    }

    const screens={
        round_1: {name:'round_1', screen: <MPRoundOne nextScreen='show' switchScreen={props.switchScreen} />},
        round_2: {name:'round_2', screen: <MPRoundTwo nextScreen='show' switchScreen={props.switchScreen} />},
        final_round: {name:'final_round', screen: <MPFinalRound nextScreen='finalshow' switchScreen={props.switchScreen} /> }
    }

    return (
        <div>
            MP ROUNDS: <br/>
            {screenRound && screens[screenRound].screen}
            <button onClick={()=>setRoundStarted(true)}>Start Round</button>
        </div>
    )
}
export default MPRoundsScreen