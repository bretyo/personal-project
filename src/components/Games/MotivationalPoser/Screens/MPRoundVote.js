import { useEffect } from "react";

const MPRoundVote=(props)=>{
    const {answers, socket} = props;

    useEffect(()=>{
        socket.emit('host-send-votes', {answers: [...answers]})
    },[socket])

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(props.nextScreen)    }, 1000 * 10);  
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