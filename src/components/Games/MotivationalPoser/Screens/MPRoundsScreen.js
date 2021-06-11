import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MPFinalRound from "./Rounds/MPFinalRound";
import MPRoundOne from "./Rounds/MPRoundOne";
import MPRoundTwo from "./Rounds/MPRoundTwo";
import {setPrompts} from '../../../../redux/gameReducer'
import { useSpring, animated, config } from 'react-spring'

const MPRoundsScreen=(props)=>{
    const [screenRound, setScreenRound] = useState()
    const [count, setCount] = useState(90); // <-- default value of count = 90
    const[roundStarted, setRoundStarted] = useState(false)
    const[roundEnded,setRoundEnded] = useState(false)
    const{prompts, players} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    const {round, switchScreen, socket, roomId, setAnswers} = props

    useEffect(()=>{
        const getResponse=(body)=>{
            const player= players.find(player=>body.user.user_name===player.user_name)
                let roundEnd = false;
                console.log(player)
                console.log(body)
                setAnswers(prevAnswers=>{
                    prevAnswers[round].length=== players.length-1 && (roundEnd = true);
                    if(round==='round_1'){
                        console.log(prevAnswers)
                        return {...prevAnswers, round_1: [...prevAnswers.round_1, {...body, user: {...player } } ] }
                    }
                    if(round==='round_2'){
                        return {...prevAnswers, round_2: [...prevAnswers.round_2, {...body, user: {...player } } ] }
                    }
                    if(round==='final_round'){
                        return {...prevAnswers, final_round: [...prevAnswers.final_round, {...body, user: {...player } } ] }
                    }
                })
                roundEnd && setCount(0)
        }
        if(socket){
            socket.on('send-host-response', getResponse)
        }
        return()=>{
            if(socket){
                socket.off('send-host-response', getResponse);
            }
        }
    },[])

    useEffect(() => {
        handleScreenLoad(round)
        // console.log(round)
    },[]);

    useEffect(()=>{

    },[round])

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            (roundStarted&& count > 0) && setCount(count-1)
            if(!count && !roundEnded){
                socket.emit('round-end-server', {roomId})
                setRoundStarted(false)
                setRoundEnded(true);
                //<-- NEED TO FIX THIS, BECAUSE ON THE FINAL ROUND IT DOESN'T GO TO THE CORRECT SCREEN AFTER FINAL ROUND. ALSO NEED TO ADD A TRANSITION STATE
            }
        }, 1000)
        console.log(count)
        return()=>{
            clearTimeout(timeout)
        }
    })

    useEffect(()=>{
        const timeout=setTimeout(() => {
            roundEnded && switchScreen('show')
        }, 3000);

        return()=>{
            clearTimeout(timeout)
        }
    },[roundEnded])

    const handleScreenLoad=(round)=>{
        console.log({round})
        setScreenRound(round)
    }

    useEffect(()=>{
        const startRound=()=>{
            setRoundStarted(true)
            let promptNumFinal = Math.floor(Math.random() * prompts.prompts.length);//<-- this is for the final prompt, which everyone will share
            players.forEach((element,index) => {
                let promptNum = Math.floor(Math.random() * prompts.prompts.length);
                if(round==='round_1' || round==='round_2'){
                    socket.emit('send-prompt', 
                    {
                        playerId: element.id,
                        prompt:{...prompts.prompts[promptNum],
                            gameSocketId: socket.id ,
                        //  ^^^^ the points of gameID is for the players to send their responses directly to the game rather than to the whole room
                            game: 'MP', 
                            image: prompts.images[round==='round_1'? index+1: index+1+players.length].urls.regular,
                            roomId }})
                    dispatch(setPrompts({...prompts, prompts: prompts.prompts.splice(promptNum, 1)}))// <--- this deletes the prompt from the store
                }
                else{
                    socket.emit('send-prompt', {
                        playerId: element.id,
                        prompt:{...prompts.prompts[promptNumFinal], 
                            gameSocketId: socket.id, 
                            game: 'MP', 
                            image: prompts.images[players.length*2 + 1].urls.regular,
                            roomId}})
                    index ===players.length-1 && dispatch(setPrompts({...prompts, prompts: prompts.prompts.splice(promptNumFinal, 1)})) // <--- this deletes the prompt from the store on the last player's iteration
    
                }
            });
            console.log(prompts.prompts)
        }
        const timeout= setTimeout(()=>{
            startRound();
        }, 3000)

        return()=>{
            clearTimeout(timeout)
        }
    },[])

    

    const screens={
        round_1: {name:'round_1', screen: <MPRoundOne nextScreen='show' switchScreen={props.switchScreen} />},
        round_2: {name:'round_2', screen: <MPRoundTwo nextScreen='show' switchScreen={props.switchScreen} />},
        final_round: {name:'final_round', screen: <MPFinalRound nextScreen='finalshow' switchScreen={props.switchScreen} /> }
    }

    const outOfTime = useSpring({config:config.slow, to: {transform: roundEnded?'translateY(0)':'translateY(1000px)'}, from: 'translateY(1000px)' })

    
    return (
        <div className='round-screen'>
            {screenRound && screens[screenRound].screen}
            {(roundStarted&&!roundEnded) && <h4 className={`${count <=10? 'time-low': ''}`}>{count}</h4>}
            {roundEnded && < animated.h2 style={outOfTime}>LET'S SEE YOUR POSTS</animated.h2>}
        </div>
    )
}
export default MPRoundsScreen