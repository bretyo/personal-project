import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompts } from '../../../../redux/gameReducer'
import axios from 'axios'
import { useSpring, animated, config } from 'react-spring'


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
            axios.get('/api/prompts/1')
            .then(res=>{
                dispatch(setPrompts({prompts:[...prompts.prompts, ...res.data]}))
            })
            .catch(err=>{
                console.log(err)
            })
        }
        // checks if there's enough images for the game
        if(prompts.images.length < players.length * 2 + 2){
            // Gets the images from the api ** TEMP GETTING TEST DATA TO PREVENT API CHOKE
            await handleImageLoad();
        }
        // Same stuff as above, but for prompts
        if(prompts.prompts.length < players.length * 2 + 1){
            await handlePromptLoad()
        }
    },[])


    useEffect(() => {
        const timeout = setTimeout(() => {
            switchScreen(nextScreen)    }, 6000);  
        return () => {

            clearTimeout(timeout)
        };
    },[]);

    const intro = useSpring({
        config:config.molasses,
        from: { opacity: 0.05, transform: "translate3d(-25%, 0px, 0px)" },
        to: 
            prompts.images?{ opacity: 1, transform: "translate3d(0px, 0px, 0px)" }: {opacity: 0.05, transform: "translate3d(-25%, 0px, 0px)"},
        delay: 200
    })

    console.log(prompts)
    return(
        <div className='intro-screen'>
            {prompts.images[0] && <animated.div style={intro} className='intro-wrapper'>
                <img src={prompts.images[0].urls.regular} />
                <section >
                    <p>Motivational Poser</p>
                </section>
            </animated.div>}
        </div>
    )
}
export default MPIntroScreen