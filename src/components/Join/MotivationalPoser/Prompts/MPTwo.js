import { useState } from "react"

const MPTwo=(props)=>{
    const [userInput, setUserInput] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const {promptArr, sendResponse} = props

    const handleSend=()=>{
        sendResponse([
            [promptArr[0],
            userInput,
            promptArr[1]].join(''),
            [userInput2,
            promptArr[2]].join('')
        ])
    }
    return(
        <div>
            <p>{promptArr[0]}</p>
            <input value={userInput} onChange={(e)=>setUserInput(e.target.value)} />
            <p>{promptArr[1]}</p>
            <input value={userInput2} onChange={(e)=>setUserInput2(e.target.value)} />
            <p>{promptArr[2]}</p>
            <button onClick={handleSend}>Send</button>
        </div>
    )
}
export default MPTwo