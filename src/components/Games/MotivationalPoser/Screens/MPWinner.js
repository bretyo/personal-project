import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setGames} from '../../../../redux/gameReducer'

const MPWinner=(props)=>{
    const{socket} = props
    const {players, selectedGame} = useSelector(store=>store.gameReducer)
    const winner = players.reduce((acc, curr)=>curr.score > acc.score? curr: acc ,{score:0})
    const dispatch = useDispatch();

    useEffect(()=>{
        const addToStats=(game,score,win, user_id)=>{
            console.log(game)
            axios.put(`/api/games/${game}`)
            .then(res=>{
                dispatch(setGames(res.data))
            })
            .catch(err=>console.log(err))
            axios.get(`/api/stats/${game}/${user_id}`)
            .then(res=>{
                console.log(res.data)    
                if(res.data.length){
                    axios.put(`/api/stats/${game}`, {wins: win, score, user_id})
                    .then()
                    .catch(err=>console.log(err))
                }
                else{
                    axios.post(`/api/stats/${game}`, {wins: win, score, user_id})
                    .then()
                    .catch(err=>console.log(err))
                }
            })
            .catch(err=>console.log(err))
        }
        players.forEach(player=>{
            player.user_id && addToStats(selectedGame.game_id, player.score, player===winner? 1:0, player.user_id)
            socket.emit('game-end', {playerID: player.id, win: player===winner?true:false})
        })

    },[])

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(props.nextScreen)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);
    
    return(
        winner ? 
        <div>
            MP Winner!
            <img src={winner.profileURL} />
            <h2>{winner.user_name}</h2>
            
        </div>
        :
        <h3>Finding Winner...</h3>
    )
}
export default MPWinner;