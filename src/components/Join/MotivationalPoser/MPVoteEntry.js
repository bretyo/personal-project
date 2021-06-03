const MPVoteEntry=(props)=>{
    const {image, response, handleVote, user_name} = props
    return(
        <div>
            <img src={image} alt='' />
            <p>{response.join('')}</p>
            <button onClick={()=>handleVote(user_name)}>Vote for Above</button>
        </div>
    )
}
export default MPVoteEntry