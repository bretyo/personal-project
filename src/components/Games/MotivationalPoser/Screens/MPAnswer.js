
const MPAnswer=(props)=>{
    const {image, response} = props
    const joinedResp = response.join('')
    return(
        <div  className='displayed-post'>
            <img src={image} />
            <section className='displayed-post-text'>
                <p className={`${joinedResp.length > 150 && 'medium-response'} ${joinedResp.length>220 && 'big-response'}`}>{joinedResp}</p>

            </section>
        </div>
    )
}
export default MPAnswer