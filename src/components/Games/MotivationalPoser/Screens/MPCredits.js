const MPCredits=(props)=>{
    const{players, setPlayers, switchScreen} = props
    console.log(players)

    const playAgain=()=>{
        setPlayers(prevPlayers=>{
            prevPlayers.forEach(player => {
                player.score=0
            });
            return [...prevPlayers]
        })
        switchScreen('intro')
    }

    return(
        <div>
            CREDITS SCREEN YO
            {players &&  players.map(player=>{
                return (
                    <div key={player.playerNum}>
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })}
            <button onClick={()=>window.location.reload()}>Start Over? (New Players)</button>
            <button onClick={playAgain}>Play Again? (Same Players)</button>
        </div>
    )
}
export default MPCredits;