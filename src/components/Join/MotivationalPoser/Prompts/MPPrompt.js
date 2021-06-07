import axios from 'axios'
import {useState, useEffect} from 'react'
import MPOne from './MPOne'
// import './MPPrompt.css'
import MPTwo from './MPTwo'
const MPPrompt=(props)=>{
    const {setWaiting, prompt, sendResponse} = props
    const[input,setInput] = useState('');
    const[promptArr,setPromptArr] = useState(true);

    

    useEffect(()=>{
        setPromptArr(prompt.prompt.split('____'))
    },[])

    return(
        <div className={'mp-prompt'}>
            MP PROMPT!
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