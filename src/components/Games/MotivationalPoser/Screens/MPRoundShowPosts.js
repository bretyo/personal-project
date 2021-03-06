import { useEffect, useState } from "react";
import MPAnswer from "./MPAnswer";

const MPRoundShowPosts=(props)=>{
    const {answers, switchScreen, nextScreen} = props
    const [currentAns, setCurrentAns] = useState(0);

    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentAns(currentAns + 1)
            if(currentAns >= answers.length-1){
                switchScreen(nextScreen) 
            }
        }, 9000);  
        return () => {
            clearTimeout(timeout)
        };
    },[currentAns, answers.length, nextScreen,switchScreen]);

    const displayAns= answers.map(answer=>{
        return <MPAnswer  player={answer.player} image={answer.image} response={answer.response} />
    })

    return(
        <div className='display-posts'>
            {displayAns[currentAns]}
        </div>
    )
}
export default MPRoundShowPosts;