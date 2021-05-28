import { useEffect, useState } from "react";
import MPFinalRound from "./Rounds/MPFinalRound";
import MPRoundOne from "./Rounds/MPRoundOne";
import MPRoundTwo from "./Rounds/MPRoundTwo";

const MPRoundsScreen=(props)=>{
    const [screen, setScreen] = useState()
    const {round} = props
    useEffect(() => {
        handleScreenLoad(round)
        // console.log(round)
    },[]);

    const handleScreenLoad=(round)=>{
        console.log({round})
        setScreen(round)
    }

    const screens={
        round_1: {name:'round_1', screen: <MPRoundOne nextScreen='show' switchScreen={props.switchScreen} />},
        round_2: {name:'round_2', screen: <MPRoundTwo nextScreen='show' switchScreen={props.switchScreen} />},
        final_round: {name:'final_round', screen: <MPFinalRound nextScreen='finalshow' switchScreen={props.switchScreen} /> }
    }

    return (
        <div>
            MP ROUNDS: <br/>
            {screen && screens[screen].screen}
        </div>
    )
}
export default MPRoundsScreen