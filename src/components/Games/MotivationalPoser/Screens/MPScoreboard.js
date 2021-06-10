import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setPlayers} from '../../../../redux/gameReducer'

const MPScoreboard=(props)=>{
    const {players} = useSelector(store=>store.gameReducer)
    const [showNewScore, setShowNewScore] = useState(false)
    const {round, setRound, switchScreen, votes} = props
    const dispatch= useDispatch()

    

    useEffect(() => {
        const changeScores=()=>{
            const baseScore = 200
            let winner = []
            for (const key in votes) {
                console.log(votes)
                console.log(key)
                if(!winner[0])  {winner.push(key);continue}
                console.log(winner)
                votes[key].length > votes[winner[0]].length ? winner = [key] : votes[key].length === votes[winner[0]].length ? winner= [...winner, key]: winner=winner;
            }   

            let newPlayers=[]
            players.forEach((player, index)=>{
                let newScore = votes[player.user_name].length * (round==='round_1'? baseScore : round==='round_2'? baseScore * 2 : baseScore * 3)
                console.log(newScore)
                if(winner.includes(player.user_name)) newScore = newScore*2;
                const newPlayer = {...player, score: player.score + newScore}
                newPlayers=[...newPlayers, newPlayer]
                console.log(newPlayers)
            })
            dispatch(setPlayers(newPlayers))
            
            setShowNewScore(true)
        }

        const handleSwitchScreen=()=>{
            if(round==='round_1'){
                setRound('round_2')
                switchScreen('rounds')
            }
            else if(round ==='round_2'){
                setRound('final_round')
                switchScreen('rounds')
            }
            else{
                switchScreen('winner')
            }
        }

        const timeout = setTimeout(() => {
            !showNewScore? changeScores(): handleSwitchScreen()    
        }, 5000);  
        return () => {
            clearTimeout(timeout)
        };
    },[showNewScore]);

    
    
    const sortedPlayers = players.sort((first,second)=>second.score - first.score )
    return(
        <div className='scoreboard'>
            <h2>SCOREBOARD</h2>
            {players &&  sortedPlayers.map((player, index)=>{
                return (
                    <div className='player-score' key={player.user_name}>
                        <img src={player.profileURL} alt={`${player.user_name}'s profile pic`} />
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default MPScoreboard;