import { useEffect} from 'react'
import test_data from '../../../../reTest.json'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompts } from '../../../../redux/gameReducer'
import axios from 'axios'

const MPIntroScreen=(props)=>{
    const{switchScreen, nextScreen, setRound, setAnswers,setVotes} = props
    const{players, prompts} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        setVotes({
            round_1:[],
            round_2: [],
            final_round: []
        })

        setAnswers({
            round_1:[],
            round_2: [],
            final_round: []
        })
    },[])

    useEffect(async()=>{
        setRound('round_1')
        const handleImageLoad=()=>{
            axios.get('/api/images')
                .then(res=>{
                    console.log(res.data.response)
                    dispatch(setPrompts({images: [...prompts.images, ...res.data.response]}))
                })
                .catch(err=>{
                    console.log(err)
                })
        }

        const handlePromptLoad=()=>{
            // let temp = []
            axios.get('/api/prompts/1')
            .then(res=>{
                // console.log(res.data)
                dispatch(setPrompts({prompts:[...prompts.prompts, ...res.data]}))
                // temp = [...res.data]
                // console.log(p)
            })
            .catch(err=>{
                console.log(err)
            })
            // p = [...temp]
        }
        // checks if there's enough images for the game
        if(prompts.images.length < players.length * 2 + 2){
            // Gets the images from the api ** TEMP GETTING TEST DATA TO PREVENT API CHOKE
            await handleImageLoad();
            // i = [...test_data]
        }
        // Same stuff as above, but for prompts
        if(prompts.prompts.length < players.length * 2 + 1){
            await handlePromptLoad()
        }
        // console.log(p)
        // dispatch(setPrompts({...prompts, images: [...prompts.images, ...i], prompts: [...prompts.prompts, ...p]}))
    },[])


    useEffect(() => {
        const timeout = setTimeout(() => {
            switchScreen(nextScreen)    }, 6000);  
        return () => {
            // props.setPlayers([...props.players, props.players[0] = {
            //     user_name: 'fartboi',
            //     playerNum: 1,
            //     score: 2000
            // }])
            clearTimeout(timeout)
        };
    },[]);
    // const {images} = prompts
    // console.log({images})
    // console.log('players: '+players)
    console.log(prompts)
    return(
        <div>
            Intro Screen
            {/* {players &&  players.map(player=>{
                return (
                    <div key={player.user_name}>
                        <h2>{player.user_name}</h2>
                        <p>{player.score}</p>
                    </div>
                )
            })} */}
        </div>
    )
}
export default MPIntroScreen