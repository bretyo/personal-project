import { useState } from "react"

const MPOne=(props)=>{
    const [userInput, setUserInput] = useState('')
    const {promptArr, sendResponse} = props

    const handleSend=()=>{
        //----------- THE REASON FOR MAKING THE SINGLE RESPONSE AN ARRAY IS FOR CONTINUITY FOR THE MPVOTEENTRY IN JOIN.
        sendResponse([[
            promptArr[0],
            userInput,
            promptArr[1]
        ].join('')])
    }
    return(
        <div>
            <p>{promptArr[0]}</p>
            <input value={userInput} onChange={(e)=>setUserInput(e.target.value)} />
            <p>{promptArr[1]}</p>
            <button onClick={handleSend}>Send</button>
        </div>
    )
}
export default MPOne