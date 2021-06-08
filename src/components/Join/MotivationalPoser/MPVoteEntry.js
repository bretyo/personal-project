const MPVoteEntry=(props)=>{
    const {handleVote, answer} = props
    return(
        <div className='vote-entry displayed-post'>
            <img src={answer.image} alt='' />
            <p>{answer.response.join('')}</p>
            <button onClick={()=>handleVote(answer)}>Vote for Above</button>
        </div>
    )
}
export default MPVoteEntry