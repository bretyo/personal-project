import { useEffect } from 'react'

const MPIntroScreen=(props)=>{
    const{players, setPlayers, switchScreen} = props

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.switchScreen(props.nextScreen)    }, 3000);  
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
            {players &&  players.map(player=>{
                return (
                    <div key={player.user_name}>
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default MPIntroScreen