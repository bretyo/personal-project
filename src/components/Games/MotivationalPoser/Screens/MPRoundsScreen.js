import { useEffect, useState } from "react";
import MPFinalRound from "./Rounds/MPFinalRound";
import MPRoundOne from "./Rounds/MPRoundOne";
import MPRoundTwo from "./Rounds/MPRoundTwo";

const MPRoundsScreen=(props)=>{
    const [screen, setScreen] = useState()

    useEffect(() => {
        handleScreenLoad(props.round)
    },[]);

    const handleScreenLoad=(index)=>{
        setScreen(screens[index])
    }

    const screens=[
        {name: 'round-1', screen: <MPRoundOne switchScreen={props.switchScreen} />},
        {name: 'round-2', screen: <MPRoundTwo switchScreen={props.switchScreen} />},
        {name: 'final-round', screen: <MPFinalRound switchScreen={props.switchScreen} /> }
    ]

    return (
        <div>
            MP ROUNDS: <br/>
            {screen}
        </div>
    )
}
export default MPRoundsScreen