import { useEffect } from "react";

const MPFinalRound=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(7)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    return(
        <div>
            MP Final Round!
        </div>
    )
}
export default MPFinalRound;