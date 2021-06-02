import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MPFinalRound from "./Rounds/MPFinalRound";
import MPRoundOne from "./Rounds/MPRoundOne";
import MPRoundTwo from "./Rounds/MPRoundTwo";
import {setPrompts} from '../../../../redux/gameReducer'

const MPRoundsScreen=(props)=>{
    const [screenRound, setScreenRound] = useState()
    const [count, setCount] = useState(5); // <-- default value of count = 90
    const[roundStarted, setRoundStarted] = useState(false)
    const{prompts, players} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    const {round, switchScreen, socket, roomId} = props
    useEffect(() => {
        handleScreenLoad(round)
        // console.log(round)
    },[]);

    useEffect(()=>{

    },[round])

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            (roundStarted&& count > 0) && setCount(count-1)
            if(!count){
                socket.emit('round-end-server', {roomId})
                switchScreen('show')//<-- NEED TO FIX THIS, BECAUSE ON THE FINAL ROUND IT DOESN'T GO TO THE CORRECT SCREEN AFTER FINAL ROUND. ALSO NEED TO ADD A TRANSITION STATE
            }
        }, 1000)
        console.log(count)
        return()=>{
            clearTimeout(timeout)
        }
    })

    const handleScreenLoad=(round)=>{
        console.log({round})
        setScreenRound(round)
    }

    const startRound=()=>{
        setRoundStarted(true)
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
                        image: prompts.images[round==='round_1'? index+1: index+1+players.length].urls.raw,roomId }})
                dispatch(setPrompts({...prompts, prompts: prompts.prompts.splice(promptNum, 1)}))
            }
            else{
                socket.emit('send-prompt', {
                    playerId: element.id,
                    prompt:{...prompts.prompts[promptNum], gameSocketId: socket.id, game: 'MP_F', roomId}})
                index ===players.length-1 && dispatch(setPrompts({...prompts, prompts: prompts.prompts.splice(promptNum, 1)}))

            }
        });
        console.log(prompts.prompts)
    }

    const screens={
        round_1: {name:'round_1', screen: <MPRoundOne nextScreen='show' switchScreen={props.switchScreen} />},
        round_2: {name:'round_2', screen: <MPRoundTwo nextScreen='show' switchScreen={props.switchScreen} />},
        final_round: {name:'final_round', screen: <MPFinalRound nextScreen='finalshow' switchScreen={props.switchScreen} /> }
    }

    return (
        <div>
            MP ROUNDS: <br/>
            {screenRound && screens[screenRound].screen}
            <button onClick={startRound}>Start Round</button>
        </div>
    )
}
export default MPRoundsScreen