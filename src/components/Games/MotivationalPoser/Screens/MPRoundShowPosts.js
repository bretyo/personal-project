import { useEffect, useState } from "react";
import MPAnswerOne from "./MPAnswerOne";
import MPAnswerTwo from "./MPAnswerTwo";

const MPRoundShowPosts=(props)=>{
    const {answers, switchScreen, nextScreen} = props
    const [showAnswers, setShowAnswers] = useState(true)
    const [currentAns, setCurrentAns] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentAns(currentAns + 1)
            if(currentAns >= answers.length){
                switchScreen(nextScreen) 
            }
        }, 5000);  
        return () => {
            clearTimeout(timeout)
        };
    },[currentAns]);

    const displayAns= answers.map(answer=>{
        return answer.prompt_type==='MPOne'? <MPAnswerOne  player={answer.player} image={answer.image} response={answer.response} /> : <MPAnswerTwo player={answer.player} image={answer.image} response={answer.response}/>
    })

    console.log(answers)
    return(
        <div>
            MP Round Show Posts!
            {showAnswers && displayAns[currentAns]}
        </div>
    )
}
export default MPRoundShowPosts;