import { useEffect } from 'react'

const MPIntroScreen=(props)=>{

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(2)    }, 3000);  
        return () => {
            // props.setPlayers([...props.players, props.players[0] = {
            //     user_name: 'fartboi',
            //     playerNum: 1,
            //     score: 2000
            // }])
            clearTimeout(timeout)
        };
    },[]);
    
    return(
        <div>
            Intro Screen
        </div>
    )
}
export default MPIntroScreen