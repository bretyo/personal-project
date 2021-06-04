import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MPRoundVote=(props)=>{
    const {answers, socket, setAnswers,round, setVotes} = props;
    const{players} = useSelector(store=>store.gameReducer)

    useEffect(()=>{
        socket.emit('host-send-votes', {answers: [...answers]})
    },[socket])

    // ------------SOCKET HANDLERS -------------
    useEffect(()=>{
        if(socket){
            socket.on('server-send-host-vote', vote=>{
                const fromPlayer= players.find(pl=>pl.user_name === vote.fromUser)
                console.log(fromPlayer)
                console.log(vote.user)
                setVotes(prevVotes=>{
                    const username = vote.user.user_name
                    return {...prevVotes, [round]: {...prevVotes[round], [username]: prevVotes[round][username]? [...prevVotes[round][username], fromPlayer] : [fromPlayer]}}
                })
                // setVotes(prevVotes=>{
                //     return [...prevVotes, prevVotes[player].votes = [...prevVotes[player].votes, players[fromPlayer]]]
                // })
            })
        }
    },[socket])

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(props.nextScreen)    }, 1000 * 90);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    // console.log(votes)
    return(
        <div>
            MP Round Vote!
        </div>
    )
}
export default MPRoundVote;