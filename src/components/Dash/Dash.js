import { useState } from "react"
import MPPlayerDisplay from '../Games/MotivationalPoser/Screens/StartScreen/MPPlayerDisplay'

const Dash =(props)=>{
    const selectedGame = {
        game_players_max: 6,
        game_players_min: 3

    }
    const code = 'ASDFGH'

     const players = [
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
     ]

    const startCountdown=()=>{

    }
    return(
        <div className='header-padded'>
                <div className='start-screen'>
                    <section className='room-info'>
                        <h2>Motivational Poser</h2>
                        <h3>Code: {code} </h3>
                        <h4>--- Join online at bretboxgames.com/join ---</h4>
                        <h3>Players: {players.length}/{selectedGame.game_players_max}</h3>
                        { players.length >= selectedGame.game_players_min && <button onClick={startCountdown}>Start Game</button> }
                    </section>
                    <section className='player-display-section'>
                        {players && players.map(player=>{
                            return <MPPlayerDisplay key={player.user_name} profileURL={player.profileURL} user_name={player.user_name} />
                        })}
                    </section>
                </div>
        </div>
    )
}
export default Dash;