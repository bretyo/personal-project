import { useEffect } from "react";
import { useSelector } from "react-redux";

const MPScoreboard=(props)=>{
    const {players} = useSelector(store=>store.gameReducer)

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
    const sortedPlayers = players.sort((first,second)=>second.score - first.score )
    return(
        <div>
            MP Scoreboard!
            {players &&  sortedPlayers.map(player=>{
                return (
                    <div key={player.user_name}>
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default MPScoreboard;