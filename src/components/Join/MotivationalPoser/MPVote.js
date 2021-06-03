import MPVoteEntry from "./MPVoteEntry"

const MPVote=(props)=>{
    const {answers, handleVote, my_name} = props
    const answMap =answers && answers.map(answer=>{
        return answer.user.user_name !== my_name &&  <MPVoteEntry key={answer.user.user_name} image={answer.image} user_name={answer.user.user_name} response={answer.response} handleVote={handleVote} />
    })
    console.log(answers)
    return(
        <div>
            {answMap}
        </div>
    )
}
export default MPVote