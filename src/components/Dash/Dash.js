import { Link } from "react-router-dom";
import { useSpring,animated,config } from "react-spring";
const Dash =(props)=>{
    const loadDash = useSpring({config:config.slow, from:{transform: 'translateY(-500px)'}, to:{transform: 'translateY(0)'}})
    
    console.log(props.history)
    return(
        <animated.div style={loadDash} className='header-padded dashboard'>
            <section className='dash-desc'>
                <h2>WELCOME TO <span>BRETBOX</span></h2>
                <p>BretBox is is a hub for games (inspired by JackBox) you can play with your friends/family!</p>
                <p>As of now, only one game exists: Motivational Poser, but more games are to come soon! Click one of the buttons below to play it now!</p>
            </section>
            <section className='dash-newgame'>
                <p>(Note: Starting a game is best done on a laptop or device with a standard 1920/1080p size screen. Join the game from a device of your choice!)</p>
                <button onClick={()=>props.history.push('/games/m_poser')}>Start Motivational Poser</button>
                <button onClick={()=>props.history.push('/join')}>Join Game</button>
            </section>
        </animated.div>
    )
}
export default Dash;