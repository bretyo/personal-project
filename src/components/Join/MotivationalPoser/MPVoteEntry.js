const MPVoteEntry=(props)=>{
    const {handleVote, answer} = props
    return(
        <div>
            <img src={answer.image} alt='' />
            <p>{answer.response.join('')}</p>
            <button onClick={()=>handleVote(answer)}>Vote for Above</button>
        </div>
    )
}
export default MPVoteEntry