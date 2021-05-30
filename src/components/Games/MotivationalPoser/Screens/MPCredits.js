const MPCredits=(props)=>{

    console.log(props.players)

    return(
        <div>
            FINISH SCREEN YO
            {props.players &&  props.players.map(player=>{
                return (
                    <div key={player.playerNum}>
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default MPCredits;