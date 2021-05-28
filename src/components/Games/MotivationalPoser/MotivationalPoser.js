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
import MPFinalShowPosts from './Screens/MPFinalShowPosts'
import MPFinalVote from './Screens/MPFinalVote'
import MPWinner from './Screens/MPWinner'

const MotivationalPoser =()=>{
    const [players, setPlayers] = useState([]) // This keeps track of players names, score
    const [round, setRound] = useState(0)
    const [screen,setScreen] = useState(null)
    const [socket, setSocket] = useState(null)
    const {selectedGame, games} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!socket){
            setSocket(io.connect())

        } //<---- to check if socket is already connected
        return()=>{
            if(socket){
                socket.disconnect()
                setSocket(null)

            }
        }
    }, [socket])
        
        
    useEffect(()=>{
        dispatch(setSelectedGame(0))
        setScreen('start')
    }, [dispatch, games, setScreen])
    
    const switchScreen=(name)=>{
        setScreen(name)
    }
        
    const screens = {
        start:  {name: 'start', screen:<MPStartScreen setSocket={setSocket} socket={socket} selectedGame={selectedGame} nextScreen='intro' switchScreen={switchScreen} setRound={setRound} players={players} setPlayers={setPlayers} />},
        intro: {name: 'intro', screen: <MPIntroScreen nextScreen='tutorial' switchScreen={switchScreen} players={players} setPlayers={setPlayers}  />},
        tutorial:  {name: 'tutorial', screen: <MPTutorialScreen nextScreen='rounds' switchScreen={switchScreen} />},
        rounds: {name: 'rounds', screen: <MPRoundsScreen switchScreen={switchScreen} round={round} />},
        show: {name:'show', screen: <MPRoundShowPosts nextScreen='vote' switchScreen={switchScreen} />},
        vote: {name:'vote', screen: <MPRoundVote nextScreen='scoreboard' switchScreen={switchScreen} players={players} setPlayers={setPlayers} />},
        scoreboard: {name:'scoreboard', screen: <MPScoreboard switchScreen={switchScreen} setRound={setRound} round={round} players={players} />},
        finalshow: {name:'finalshow', screen: <MPFinalShowPosts nextScreen='finalvote' switchScreen={switchScreen} />},
        finalvote: {name:'finalvote', screen: <MPFinalVote nextScreen='scoreboard' switchScreen={switchScreen} />},
        winner: {name:'winner', screen: <MPWinner nextScreen='credits' switchScreen={switchScreen} players={players} />},
        credits: {name:'credits', screen: <MPCredits switchScreen={switchScreen} players={players} />}
    }
        
        
    // console.log(`round: ${round}`)
    return(
        <div>
            {screen && screens[screen].screen}
        </div>
    )
}
export default MotivationalPoser 