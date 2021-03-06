// import './MotivationalPoser.css'
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
import MPWinner from './Screens/MPWinner'
import MPVoteResults from './Screens/MPVoteResults'

const MotivationalPoser =()=>{
    const [round, setRound] = useState(0)
    const [screen,setScreen] = useState(null)
    const [socket, setSocket] = useState(null)
    const [room,setRoom] = useState('')
    const [answers, setAnswers] = useState({
        round_1:[],
        round_2: [],
        final_round: []
    }); // This will update when players send answers
    const [votes, setVotes] = useState({
        round_1:[],
        round_2:[],
        final_round:[]
    }) // THIS WILL KEEP TRACK OF HOW MANY PEOPLE VOTED FOR THE USER ON THE ROUND
    const {players, playing} = useSelector(store=>store.gameReducer)// This keeps track of players names, score
    const dispatch = useDispatch();

    

    useEffect(()=>{
        if(!socket){
            setSocket(io.connect())
            dispatch(setPlayers([]))
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
    }, [socket, room,dispatch])
        
    useEffect(()=>{
        setScreen('start')
    }, [setScreen])
    
    const switchScreen=(name)=>{
        setScreen(name)
    }
        
    const screens = {
        start:  {name: 'start', screen:<MPStartScreen setRoom={setRoom} setSocket={setSocket} socket={socket}  nextScreen='intro' switchScreen={switchScreen} />},
        intro: {name: 'intro', screen: <MPIntroScreen setAnswers={setAnswers} setVotes={setVotes}  setRound={setRound} nextScreen='tutorial' switchScreen={switchScreen}  />},
        tutorial:  {name: 'tutorial', screen: <MPTutorialScreen nextScreen='rounds' switchScreen={switchScreen} />},
        rounds: {name: 'rounds', screen: <MPRoundsScreen setAnswers={setAnswers} roomId={room} socket={socket}  switchScreen={switchScreen} round={round} />},
        show: {name:'show', screen: <MPRoundShowPosts answers={round==='round_1'? answers.round_1 : round==='round_2' ? answers.round_2 : answers.final_round} nextScreen='vote' switchScreen={switchScreen} />},
        vote: {name:'vote', screen: <MPRoundVote setVotes={setVotes} round={round} socket={socket} answers={round==='round_1'? answers.round_1 : round==='round_2' ? answers.round_2 : answers.final_round} nextScreen='results' switchScreen={switchScreen} />},
        results: {name: 'results', screen: <MPVoteResults votes={round==='round_1'? votes.round_1 : round==='round_2' ? votes.round_2 : votes.final_round} answers={round==='round_1'? answers.round_1 : round==='round_2' ? answers.round_2 : answers.final_round} nextScreen='scoreboard' switchScreen={switchScreen} />},
        scoreboard: {name:'scoreboard', screen: <MPScoreboard votes={round==='round_1'? votes.round_1 : round==='round_2' ? votes.round_2 : votes.final_round} switchScreen={switchScreen} setRound={setRound} round={round} />},
        winner: {name:'winner', screen: <MPWinner socket={socket} nextScreen='credits' switchScreen={switchScreen} players={players} />},
        credits: {name:'credits', screen: <MPCredits answers={answers} socket={socket} room={room} switchScreen={switchScreen} />}
    }
        
        
    return(
        <div className={`m-poser ${!playing ? 'header-padded': 'm-poser-resize'}`}>
            {screen && screens[screen].screen}
        </div>
    )
}
export default MotivationalPoser 