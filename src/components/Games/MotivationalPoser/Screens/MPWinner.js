import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setGames} from '../../../../redux/gameReducer'

const MPWinner=(props)=>{
    const{socket, switchScreen, nextScreen} = props
    const {players, selectedGame} = useSelector(store=>store.gameReducer)
    const winner = players.reduce((acc, curr)=>curr.score > acc.score? curr: acc ,{score:0})
    const dispatch = useDispatch();

    useEffect(()=>{
        const addToStats=(game,score,win, user_id)=>{
            
            axios.get(`/api/stats/${game}/${user_id}`)
            .then(res=>{
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
        axios.put(`/api/games/${selectedGame.game_id}`)
        .then(res=>{
            dispatch(setGames(res.data))
        })
        .catch(err=>console.log(err))
        players.forEach(player=>{
            player.user_id && addToStats(selectedGame.game_id, player.score, player===winner? 1:0, player.user_id)
            socket.emit('game-end', {playerID: player.id, win: player===winner?true:false})
        })

    },[winner, players, socket])

    useEffect(() => {
        const timeout = setTimeout(() => {
            switchScreen(nextScreen)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[nextScreen, switchScreen]);
    
    return(
        winner ? 
        <div className='winner'>
            <h2>WINNER!</h2>
            <img src={winner.profileURL} />
            <h3>{winner.user_name}</h3>
            
        </div>
        :
        <h3>Finding Winner...</h3>
    )
}
export default MPWinner;