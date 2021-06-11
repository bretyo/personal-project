import MPAnswer from "../Games/MotivationalPoser/Screens/MPAnswer"
import MPVoteRes from "../Games/MotivationalPoser/Screens/MPVoteRes"
import { useSpring,useTransition, animated, config } from 'react-spring'
import { useState } from "react";

const Dash =()=>{
    const count =10;
    const[roundEnded,setRoundEnded] = useState(false)
    const [showIntro,setShowIntro]=useState(true)

    const join = useSpring({
        config:config.wobbly,
        from: { opacity: 0, transform: "translate3d(25%, 0px, 0px)", reverse: false, reset: false },
        to: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    })

    const transition = useTransition(showIntro,{})
    
    const image=`https://images.unsplash.com/photo-1614595402938-ecee8416e6b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`

    const changeStuff=()=>{
        setShowIntro(t=>!t)
    }
    const   profileURL="https://robohash.org/VIzXjd-1TmHJyAm3AAQ.png";
    const user_name = 'ASDF'
    return(
        <div>
            
        </div>
    )
}
export default Dash;