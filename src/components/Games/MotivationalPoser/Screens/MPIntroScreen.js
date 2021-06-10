import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompts } from '../../../../redux/gameReducer'
import axios from 'axios'

const MPIntroScreen=(props)=>{
    const[showIntro,setShowIntro] = useState(false)
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
        setShowIntro(true)
    },[])


    useEffect(() => {
        const timeout = setTimeout(() => {
            switchScreen(nextScreen)    }, 6000);  
        return () => {

            clearTimeout(timeout)
        };
    },[]);
    console.log(prompts)
    return(
        <div className='intro-screen'>
            {prompts.images[0] && <div className='intro-wrapper'>
                <img src={prompts.images[0].urls.regular} />
                <section >
                    <p>Motivational Poser</p>
                </section>
            </div>}
        </div>
    )
}
export default MPIntroScreen