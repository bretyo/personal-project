import axios from 'axios'
import {useState, useEffect} from 'react'
const MPPrompt=()=>{
    const[image,setImage] = useState('');
    const[prompt,setPrompt] = useState('');
    const[input,setInput] = useState('');
    const[prompt1,setPrompt1] = useState(true);

    useEffect(()=>{
        if(!image){
            axios.get()
        }
    },[image])

    return(
        <div>

        </div>
    )
}
export default MPPrompt;