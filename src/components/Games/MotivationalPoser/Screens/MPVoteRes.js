const MPVoteRes =(props)=>{
    const {votes, answer} = props;
    const showVotes= votes? votes.map(vote=>{
        return <img  key={vote.id} src={vote.profileURL} />
    }) : null
    const joinedResp = answer.response.join('')
    return(
        <div className='result-wrapper'>
            <section className='submission-profile-pic'>
                <img  src={answer.user.profileURL} />
                <h2>{answer.user.user_name}</h2>
                
            </section>
            <section className='display-vote-results'>
                <div className='displayed-vote-result'>
                    <img src={answer.image} />
                    <section className='displayed-result-text'>
                        <p className={`${joinedResp.length > 120 && 'medium-response'} ${joinedResp.length>150 && 'big-response'}`}>{joinedResp}</p>

                    </section>
                    <section className='votes-from'>
                        {showVotes && showVotes}
                    </section>
                </div>
            </section>
        </div>
    )
}
export default MPVoteRes;