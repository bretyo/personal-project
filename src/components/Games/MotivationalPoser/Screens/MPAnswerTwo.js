const MPAnswerTwo=(props)=>{
    const {image, response, player} = props
    return(
        <div className='displayed-post'>
            <img src={image} />
            <div className='displayed-post-text'>
                <p>{response[0]}</p>
                <p>{response[1]}</p>
            </div>
        </div>
    )
}
export default MPAnswerTwo