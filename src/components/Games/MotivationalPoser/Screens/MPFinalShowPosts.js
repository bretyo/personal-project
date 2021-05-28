import { useEffect } from "react";

const MPFinalShowPosts=(props)=>{
    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(props.nextScreen)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);
    return(
        <div>
            MP Final Show Posts;
        </div>
    )
}
export default MPFinalShowPosts;