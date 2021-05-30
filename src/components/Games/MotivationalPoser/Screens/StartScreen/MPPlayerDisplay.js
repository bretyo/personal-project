const MPPlayerDisplay=(props)=>{
    const {profileURL, user_name} = props
    return(
        <div>
            <img src={profileURL} alt={`${user_name}'s Profile Pic`} />
            <h3>{user_name}</h3>
        </div>
    )
}
export default MPPlayerDisplay