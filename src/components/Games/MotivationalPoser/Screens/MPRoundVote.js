import { useEffect } from "react";

const MPRoundVote=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(props.nextScreen)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    return(
        <div>
            MP Round Vote!
        </div>
    )
}
export default MPRoundVote;