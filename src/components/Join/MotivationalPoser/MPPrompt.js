import axios from 'axios'
import {useState, useEffect} from 'react'
import MPOne from './MPOne'
import './MPPrompt.css'
import MPTwo from './MPTwo'
const MPPrompt=(props)=>{
    const {setWaiting, prompt} = props
    const[response, setResponse] = useState('');
    const[input,setInput] = useState('');
    const[promptArr,setPromptArr] = useState(true);

    const handleResponse=()=>{
        setWaiting(true)
    }

    useEffect(()=>{
        setPromptArr(prompt.prompt.split('____'))
    },[])

    return(
        <div>
            MP PROMPT!
            <img src={prompt.image} />
            {
                prompt.prompt_type === 'MPOne'? 
                    <MPOne promptArr={promptArr} />
                :
                    <MPTwo promptArr={promptArr}/>
            }
            <button onClick={handleResponse} >Send</button>
        </div>
    )
}
export default MPPrompt;