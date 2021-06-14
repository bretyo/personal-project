import { useEffect } from "react"
import MPVoteRes from "./MPVoteRes"

const MPVoteResults=(props)=>{
    const {answers, votes, nextScreen, switchScreen} = props
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            switchScreen(nextScreen)
        }, 8000)
        return()=>{
            clearTimeout(timeout)
        }
    })

    const results = answers.map(answer=>{
        const votesFrom = votes[answer.user.user_name]?[...votes[answer.user.user_name]]: 0
        return <MPVoteRes key={answer.user.user_name} votes={votesFrom} answer={answer} />
    })
    return (
        <div id='display-vote-results'>
            {results && results}
        </div>
    )
}
export default MPVoteResults