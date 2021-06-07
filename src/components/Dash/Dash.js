import { useState } from "react"

const Dash =(props)=>{
    const [userInput, setUserInput] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const {sendResponse} = props

    const handleSend=()=>{
        sendResponse([
            [promptArr[0],
            userInput,
            promptArr[1]].join(''),
            [userInput2,
            promptArr[2]].join('')
        ])
    }
    const promptArr = 'Your future is created by ____, not ____.'.split('____')
    return(
        <div className={'dash'}>
            <img src={'https://images.unsplash.com/photo-1620572331975-8640a6a6cb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMwMjgzNzY&ixlib=rb-1.2.1&q=80&w=1080'} />
            <div>
                <p>{promptArr[0]}</p>
                <input size='30' value={userInput} onChange={(e)=>setUserInput(e.target.value)} />
                <p>{promptArr[1]}</p>
                <input size='30' value={userInput2} onChange={(e)=>setUserInput2(e.target.value)} />
                <p>{promptArr[2]}</p> 
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
export default Dash;