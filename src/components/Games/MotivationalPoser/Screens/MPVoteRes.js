const MPVoteRes =(props)=>{
    const {votes, answer} = props;
    const showVotes= votes? votes.map(vote=>{
        return <img key={vote.id} src={vote.profileURL} />
    }) : null
    return(
        <div>
            <h2>{answer.user.user_name}</h2>
            <img src={answer.image}/>
            <h3>{answer.response.join('')}</h3>
            {showVotes && showVotes}
        </div>
    )
}
export default MPVoteRes;