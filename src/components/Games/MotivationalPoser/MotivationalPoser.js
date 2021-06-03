import './MotivationalPoser.css'
import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {setPlayers} from '../../../redux/gameReducer'
import io from 'socket.io-client'
import MPStartScreen from './Screens/StartScreen/MPStartScreen'
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
    const [round, setRound] = useState(0)
    const [screen,setScreen] = useState(null)
    const [socket, setSocket] = useState(null)
    const [room,setRoom] = useState('')
    const [images,setImages] = useState('')
    const {selectedGame, players} = useSelector(store=>store.gameReducer)// This keeps track of players names, score
    const dispatch = useDispatch();

    

    useEffect(()=>{
        if(!socket){
            setSocket(io.connect())

        } //<---- to check if socket is already connected
        return()=>{
            if(socket){
                // The below two lines disconnect players from the room
                socket.emit('force-players-leave', room)
                dispatch(setPlayers([]))
                socket.disconnect()
                setSocket(null)
            }
        }
    }, [socket, room])
        
    useEffect(()=>{
        setScreen('start')
    }, [setScreen])
    
    const switchScreen=(name)=>{
        setScreen(name)
    }
        
    const screens = {
        start:  {name: 'start', screen:<MPStartScreen setRoom={setRoom} setSocket={setSocket} socket={socket}  nextScreen='intro' switchScreen={switchScreen} />},
        intro: {name: 'intro', screen: <MPIntroScreen setRound={setRound} nextScreen='tutorial' switchScreen={switchScreen}  />},
        tutorial:  {name: 'tutorial', screen: <MPTutorialScreen nextScreen='rounds' switchScreen={switchScreen} />},
        rounds: {name: 'rounds', screen: <MPRoundsScreen roomId={room} socket={socket} images={images} switchScreen={switchScreen} round={round} />},
        show: {name:'show', screen: <MPRoundShowPosts nextScreen='vote' switchScreen={switchScreen} />},
        vote: {name:'vote', screen: <MPRoundVote nextScreen='scoreboard' switchScreen={switchScreen} />},
        scoreboard: {name:'scoreboard', screen: <MPScoreboard switchScreen={switchScreen} setRound={setRound} round={round} />},
        finalshow: {name:'finalshow', screen: <MPFinalShowPosts nextScreen='finalvote' switchScreen={switchScreen} />},
        finalvote: {name:'finalvote', screen: <MPFinalVote nextScreen='scoreboard' switchScreen={switchScreen} />},
        winner: {name:'winner', screen: <MPWinner nextScreen='credits' switchScreen={switchScreen} players={players} />},
        credits: {name:'credits', screen: <MPCredits socket={socket} room={room} switchScreen={switchScreen} />}
    }
        
        
    socket && console.log(images)
    return(
        <div>
            {screen && screens[screen].screen}
        </div>
    )
}
export default MotivationalPoser 