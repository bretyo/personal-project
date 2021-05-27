import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setSelectedGame} from '../../../redux/gameReducer'
import io from 'socket.io-client'
import MPStartScreen from './Screens/MPStartScreen'
import MPIntroScreen from './Screens/MPIntroScreen'
import MPCredits from './Screens/MPCredits'
import MPTutorialScreen from './Screens/MPTutorialScreen'
import MPRoundsScreen from './Screens/MPRoundsScreen'
import MPRoundShowPosts from './Screens/MPRoundShowPosts'
import MPRoundVote from './Screens/MPRoundVote'
import MPScoreboard from './Screens/MPScoreboard'
import MPFinalRound from './Screens/Rounds/MPFinalRound'
import MPFinalVote from './Screens/MPFinalVote'
import MPWinner from './Screens/MPWinner'

const MotivationalPoser =()=>{
    const [playerCount,setPCount] = useState(0) // This exists so i can quickly save this to state when receiving an attempt to join instead of sending another emit and waiting on that before raising the player count.
    const [players, setPlayers] = useState([]) // This keeps track of players names, score
    const [round, setRound] = useState(0)
    const [screen,setScreen] = useState(null)
    const [socket, setSocket] = useState(null)
    const {selectedGame, games} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    
    useEffect(()=>{
        dispatch(setSelectedGame(0))
        setScreen(screens['start'].screen)
    }, [dispatch, games])
    
    
    const switchScreen=(name)=>{
        setScreen(screens[name].screen)
    }
    
    
    const screens = {
        start:  {screen: <MPStartScreen nextScreen='intro' switchScreen={switchScreen} setRound={setRound} players={players} setPlayers={setPlayers} />},
        intro: {screen: <MPIntroScreen switchScreen={switchScreen} players={players} setPlayers={setPlayers}  />},
        tutorial:  {screen: <MPTutorialScreen switchScreen={switchScreen} />},
        rounds: {screen: <MPRoundsScreen switchScreen={switchScreen} round={round} />},
        show: {screen: <MPRoundShowPosts switchScreen={switchScreen} />},
        vote: {screen: <MPRoundVote switchScreen={switchScreen} players={players} setPlayers={setPlayers} />},
        scoreboard: {screen: <MPScoreboard switchScreen={switchScreen} setRound={setRound} round={round} players={players} />},
        finalshow: {screen: <MPFinalRound switchScreen={switchScreen} />},
        finalvote: {screen: <MPFinalVote switchScreen={switchScreen} />},
        winner: {screen: <MPWinner switchScreen={switchScreen} players={players} />},
        credits: {screen: <MPCredits switchScreen={switchScreen} players={players} />}
    }


    console.log(players)
    return(
        <div>
            {screen}
        </div>
    )
}
export default MotivationalPoser 