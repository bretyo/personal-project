import { useEffect } from "react";

const MPWinner=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(2)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);
    
    return(
        <div>
            MP Winner!
        </div>
    )
}
export default MPWinner;