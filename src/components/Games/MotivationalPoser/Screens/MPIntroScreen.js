import { useEffect, useRef } from 'react'
import {createApi} from 'unsplash-js'
import {MY_ACCESS_KEY} from '../../../../unsplashKey'
import test_data from '../../../../reTest.json'
import { useDispatch, useSelector } from 'react-redux'
import { setPrompts } from '../../../../redux/gameReducer'

const MPIntroScreen=(props)=>{
    const{switchScreen, nextScreen, selectedGame} = props
    const{players, prompts} = useSelector(store=>store.gameReducer)
    const dispatch = useDispatch();

    const unsplash = createApi({ accessKey: MY_ACCESS_KEY });
    const handleUnsplashTest=()=>{
        // console.log(MY_ACCESS_KEY)
        unsplash.photos.getRandom({
            count: 30,
          })
          .then(res=>{
              console.log(res.response)
          })
          .catch(err=>{
              console.log(err)
          })
    }

    useEffect(()=>{
        // checks if there's enough images for the game
        if(prompts.images.length < players.length * 2 + 2){
            // Gets the images from the api ** TEMP GETTING TEST DATA TO PREVENT API CHOKE
            dispatch(setPrompts({...prompts, images: [...prompts.images, ...test_data]}))
        }
    },[])


    useEffect(() => {
        const timeout = setTimeout(() => {
            switchScreen(nextScreen)    }, 3000);  
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