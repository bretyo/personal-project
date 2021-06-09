// import { useState } from "react"
import MPPlayerDisplay from '../Games/MotivationalPoser/Screens/StartScreen/MPPlayerDisplay'
import MPVoteEntry from '../Join/MotivationalPoser/MPVoteEntry'

const Dash =()=>{

     const players = [
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
         {
             user_name: 'bart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'
         },
     ]

     const answers=[
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest indication of gratitude is ddd.'], user: {user_name: 'fart'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest indication of gratitude is ddd.'], user: {user_name: 'fart'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest indication of gratitude is ddd.'], user: {user_name: 'fart'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest indication of gratitude is ddd.'], user: {user_name: 'fart'}},
     ]

     const handleVote=(answer)=>{
         console.log(answer)
     }

     const answMap = answers && answers.map(answer=>{
        return <MPVoteEntry key={answer.user.user_name} answer={answer} handleVote={handleVote} />
    })

    return(
        <div className='join'>
            <div className='vote-screen display-votes'>
                {answMap}
            </div>
        </div>
    )
}
export default Dash;