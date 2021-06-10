import { useEffect, useState } from "react";
import MPAnswer from "./MPAnswer";
import MPAnswerTwo from "./MPAnswerTwo";

const MPRoundShowPosts=(props)=>{
    const {answers, switchScreen, nextScreen} = props
    const [showAnswers, setShowAnswers] = useState(true)
    const [currentAns, setCurrentAns] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentAns(currentAns + 1)
            if(currentAns >= answers.length-1){
                switchScreen(nextScreen) 
            }
        }, 5000);  
        return () => {
            clearTimeout(timeout)
        };
    },[currentAns]);

    const displayAns= answers.map(answer=>{
        return <MPAnswer  player={answer.player} image={answer.image} response={answer.response} />
    })

    console.log(answers)
    return(
        <div className='display-posts'>
            {showAnswers && displayAns[currentAns]}
        </div>
    )
}
export default MPRoundShowPosts;