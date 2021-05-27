import { useEffect } from "react";

const MPFinalVote=(props)=>{
    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(6)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);
    return(
        <div>
            MP Final Vote!
        </div>
    )
}
export default MPFinalVote;