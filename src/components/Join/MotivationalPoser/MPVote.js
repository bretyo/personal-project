import { useEffect } from "react"
import MPVoteEntry from "./MPVoteEntry"

const MPVote=(props)=>{
    const {answers, handleVote, my_name, socket, setWaiting} = props
    const answMap =answers && answers.map(answer=>{
        return answer.user.user_name !== my_name &&  <MPVoteEntry key={answer.user.user_name} answer={answer} handleVote={handleVote} />
    })

    useEffect(()=>{

        const roundEnd=()=>{
            setWaiting(true);
        }

        socket.on('round-end-client',roundEnd);

    return()=>{
        socket.off('round-end-client', roundEnd)
    }
    },[])

    console.log(answers)
    return(
        <div className='vote-screen display-votes'>
                {answMap}
        </div>
    )
}
export default MPVote