import { useEffect } from "react";

const MPRoundShowPosts=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(2)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    return(
        <div>
            MP Round Show Posts!
        </div>
    )
}
export default MPRoundShowPosts;