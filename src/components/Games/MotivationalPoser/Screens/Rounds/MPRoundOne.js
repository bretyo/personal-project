import { useEffect } from "react";

const MPRoundOne =(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(4)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    return(
        <div>
            MP Round One!
        </div>
    )
}
export default MPRoundOne;