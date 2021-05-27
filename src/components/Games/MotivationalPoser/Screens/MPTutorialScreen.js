import { useEffect } from "react";

const MPTutorialScreen=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(3)    }, 3000);  
        return () => {
            clearTimeout(timeout)
        };
    },[]);

    return(
        <div>
            MP TUTORIAL SCREEN YO
        </div>
    )
}
export default MPTutorialScreen;