import { useEffect } from "react";

const MPRoundTwo=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(4)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    return(
        <div>
            MP Round Two!
        </div>
    )
}
export default MPRoundTwo;