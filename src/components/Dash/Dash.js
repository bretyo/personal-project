import MPAnswer from "../Games/MotivationalPoser/Screens/MPAnswer"
import MPVoteRes from "../Games/MotivationalPoser/Screens/MPVoteRes"
import { useSpring,useTransition, animated, config } from 'react-spring'
import { useState } from "react";

const Dash =()=>{
    const count =10;
    const[roundEnded,setRoundEnded] = useState(false)
    const [showIntro,setShowIntro]=useState(true)

    const intro = useSpring({
        config:config.molasses,
        from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)", reverse: false, reset: false },
        to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    })

    const transition = useTransition(showIntro,{})
    
    const image=`https://images.unsplash.com/photo-1614595402938-ecee8416e6b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`

    const changeStuff=()=>{
        setShowIntro(t=>!t)
    }

    return(
        <div className='intro-screen'>
            {showIntro &&<animated.div style={intro} className='intro-wrapper'>
                <img src={image} />
                <section >
                    <p>Motivational Poser</p>
                </section>
            </animated.div>}
        </div>
    )
}
export default Dash;