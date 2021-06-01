import axios from 'axios'
import {useState, useEffect} from 'react'
import './MPPrompt.css'
const MPPrompt=(props)=>{
    const {setWaiting, prompt} = props
    const[response, setResponse] = useState('');
    const[input,setInput] = useState('');
    const[prompt1,setPrompt1] = useState(true);

    const handleResponse=()=>{
        setWaiting(true)
    }

    return(
        <div>
            MP PROMPT!
            <img src={prompt.image} />
            <p>{prompt.prompt}</p>
            <button onClick={handleResponse} >Send</button>
        </div>
    )
}
export default MPPrompt;