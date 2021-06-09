const MPVoteEntry=(props)=>{
    const {handleVote, answer} = props
    const joinedResp = answer.response.join('')
    return(
        <div className='vote-entry'>
            <img src={answer.image} alt='' />
            <section className='displayed-vote-text'>
                <p className={`${joinedResp.length > 150 && 'medium-response'} ${joinedResp.length>220 && 'big-response'}`}>{joinedResp}</p>

            </section>
            <div>
            <button onClick={()=>handleVote(answer)}>Vote for Above</button>

            </div>
        </div>
    )
}
export default MPVoteEntry