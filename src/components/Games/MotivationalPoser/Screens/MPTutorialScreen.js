import { useSpring, animated } from 'react-spring'


const MPTutorialScreen=(props)=>{
    const {switchScreen, nextScreen} = props
    const slideIn= useSpring({from:  {transform: 'translateX(2000px)'}, to:{transform: 'translateX(0)'} }  )

    return(
        <animated.div style={slideIn} className='tutorial'>
            <div className='mp-prompt'>
                
                <img src={`https://images.unsplash.com/photo-1601902322950-cb5182a20b34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE0fHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`} alt='A picture of a woman who vaguely looks like she is going to eat a cat' />
            
                <div>
                    <p>You miss 100% of the </p>
                    <input readOnly={true} value='cats'/>
                    <p> that you don't </p>
                    <input readOnly={true} value='eat'/>
                    <p>.</p>
                    <button>Send</button>
                </div>
            </div>
            <section className='tut-text'>
                <h2>Tutorial!</h2>
                <p>At the start of the round, you will receive a random image (provided by Unsplash.com)</p> 
                <p>You will also receive an inspirational, and unfinished, quote!</p>
                <p>Fill in the blanks and send it before the timer runs out!</p> 
                <p>Once the round is over, you and your fellow players will vote for the most inspiring poster. </p>
                <p>The first two rounds, everyone will have a prompt of their own. But the third round, everybody has the same prompt.</p>
                <p>After three rounds, the player with the highest score wins!</p>
                <button onClick={()=>switchScreen(nextScreen)}>Start Round One</button>
            </section>
        </animated.div>
    )
}
export default MPTutorialScreen;