const MPAnswerOne=(props)=>{
    const {image, response, player} = props
    return(
        <div>
            ANSWER TWO
            <img src={image} />
            <p>{response[0]}</p>
        </div>
    )
}
export default MPAnswerOne