import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import MPOne from './MPOne'
// import './MPPrompt.css'
import MPTwo from './MPTwo'
const MPPrompt=(props)=>{
    const {setWaiting, prompt, sendResponse, socket, user_name} = props
    const[promptArr,setPromptArr] = useState(true);
    const {user} = useSelector(store=>store.authReducer)

    

    useEffect(()=>{
        setPromptArr(prompt.prompt.split('____'))
    },[prompt])

    useEffect(()=>{

        const roundEnd=()=>{
            socket.emit('client-send-response', {...prompt, response:[...prompt.prompt], user: {...user, user_name}})
            setWaiting(true);
        }

        socket.on('round-end-client',roundEnd);

    return()=>{
        socket.off('round-end-client', roundEnd)
    }
    },[prompt, user, user_name])

    return(
        <div className={'mp-prompt'}>
            <img src={prompt.image} />
            {
                prompt.prompt_type === 'MPOne'? 
                    <MPOne promptArr={promptArr} sendResponse={sendResponse} />
                :
                    <MPTwo promptArr={promptArr} sendResponse={sendResponse}/>
            }
        </div>
    )
}
export default MPPrompt;