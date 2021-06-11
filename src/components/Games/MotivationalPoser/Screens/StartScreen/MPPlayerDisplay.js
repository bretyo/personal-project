import {useSpring, config, animated} from 'react-spring'
const MPPlayerDisplay=(props)=>{
    const {profileURL, user_name} = props
    const join = useSpring({
        config:config.stiff,
        from: { opacity: 0, transform: "translate3d(400px, 0px, 0px)", reverse: false, reset: false },
        to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
        delay: 300
    })
    return(
        <animated.div style={join} className='player-display'>
            <img src={profileURL} alt={`${user_name}'s Profile Pic`} />
            <h3>{user_name}</h3>
        </animated.div>
    )
}
export default MPPlayerDisplay