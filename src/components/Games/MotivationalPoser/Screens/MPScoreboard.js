import { useEffect } from "react";

const MPScoreboard=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSwitchScreen()    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    const handleSwitchScreen=()=>{
        if(props.round==='round_1'){
            props.setRound('round_2')
            props.switchScreen('rounds')
        }
        else if(props.round ==='round_2'){
            props.setRound('final_round')
            props.switchScreen('rounds')
        }
        else{
            props.switchScreen('winner')
        }
    }

    return(
        <div>
            MP Scoreboard!
        </div>
    )
}
export default MPScoreboard;