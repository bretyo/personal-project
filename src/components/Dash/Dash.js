import MPAnswer from "../Games/MotivationalPoser/Screens/MPAnswer"
import MPVoteRes from "../Games/MotivationalPoser/Screens/MPVoteRes"
import { useSpring,useTransition, animated, config } from 'react-spring'
import { useState } from "react";
// import { config } from "dotenv";

const Dash =()=>{
    const count =10;
    const[roundEnded,setRoundEnded] = useState(false)

    const outOfTime = useSpring({config:config.slow, to: {transform: roundEnded?'translateY(0)':'translateY(1000px)'}, from: 'translateY(1000px)' })
    
    const image=`https://images.unsplash.com/photo-1614595402938-ecee8416e6b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`

    const changeStuff=()=>{
        setRoundEnded(true)
    }

    return(
        <div className='round-screen'>
            <h2>ROUND ONE</h2>
            {!roundEnded&&<h4  className={`${count <=10? 'time-low': ''}`}>{count}</h4>}
            {roundEnded&&< animated.h2 style={outOfTime}>LET'S SEE YOUR POSTS</animated.h2>}
            <button onClick={changeStuff}>change </button>
        </div>
    )
}
export default Dash;