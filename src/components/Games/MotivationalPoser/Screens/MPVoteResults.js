import { useEffect } from "react"
import MPVoteRes from "./MPVoteRes"

const MPVoteResults=(props)=>{
    const {answers, votes, nextScreen, switchScreen} = props

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            switchScreen(nextScreen)
        }, 8000)
        // console.log(count)
        return()=>{
            clearTimeout(timeout)
        }
    })

    const results = answers.map(answer=>{
        console.log('Vote result Anwer: ', answer)
        const votesFrom = votes[answer.user.user_name]?[...votes[answer.user.user_name]]: 0
        return <MPVoteRes key={answer.user.user_name} votes={votesFrom} answer={answer} />
    })
    return (
        <div>
            {results && results}
        </div>
    )
}
export default MPVoteResults