const MPAnswerTwo=(props)=>{
    const {image, response, player} = props
    return(
        <div>
            ANSWER TWO
            <img src={image} />
            <p>{response[0]}</p>
            <p>{response[1]}</p>
        </div>
    )
}
export default MPAnswerTwo