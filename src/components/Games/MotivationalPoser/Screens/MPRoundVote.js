import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MPRoundVote=(props)=>{
    const {answers, socket, round, setVotes, nextScreen, switchScreen} = props;
    const{players} = useSelector(store=>store.gameReducer)
    const [count, setCount] = useState(20); // <-- default value of count = 20

    useEffect(()=>{
        players.forEach(player=>{
            socket.emit('host-send-votes', {answers: [...answers], playerID: player.id})
            setVotes(prevVotes=>{
                return {...prevVotes, [round]: {...prevVotes[round], [player.user_name]: []}}
            })
        })
    },[answers, players, round, socket, setVotes])

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            (count > 0) && (setCount(count-1))
            if(!count){
                socket.emit('round-end-server', {roomId: answers[0].roomId})
                switchScreen(nextScreen)//<-- NEED TO FIX THIS, BECAUSE ON THE FINAL ROUND IT DOESN'T GO TO THE CORRECT SCREEN AFTER FINAL ROUND. ALSO NEED TO ADD A TRANSITION STATE
            }
        }, 1000)
        return()=>{
            clearTimeout(timeout)
        }
    })

    // ------------SOCKET HANDLERS -------------
    useEffect(()=>{
        const getVotes=vote=>{
            const fromPlayer= players.find(pl=>pl.user_name === vote.fromUser)
                // let roundEnd = false;
                let end = false
                setVotes(prevVotes=>{
                    let voteNum=0;
                    for (const key in prevVotes[round]) {
                        voteNum +=prevVotes[round][key].length
                    }
                    (voteNum === players.length-1) && (end=true)
                    const username = vote.user.user_name
                    return {...prevVotes, [round]: {...prevVotes[round], [username]: [...prevVotes[round][username], fromPlayer]}}
                })
                if(end){
                    setCount(0)
                } 
        }
        if(socket){
            socket.on('server-send-host-vote', getVotes)
        }
        return()=>{
            if(socket){
                socket.off('server-send-host-vote',getVotes);
            }
        }
    },[socket, players, round, setVotes])

    return(
        <div className='round-screen'>
            <h2>VOTE</h2>
            <h4>{count}</h4>
        </div>
    )
}
export default MPRoundVote;