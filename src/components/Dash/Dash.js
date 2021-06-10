// import { useState } from "react"
import MPPlayerDisplay from '../Games/MotivationalPoser/Screens/StartScreen/MPPlayerDisplay'
import MPVoteEntry from '../Join/MotivationalPoser/MPVoteEntry'
import MPVoteRes from '../Games/MotivationalPoser/Screens/MPVoteRes'

const Dash =()=>{

     const players = [
         {
             user_name: 'dart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAAK.png',
             score: 100
         },
         {
             user_name: 'cart',
             profileURL:'https://robohash.org/-t_5Rx9CdBl8bciAAAK.png',
             score: 105
         },
         {
             user_name: 'fart',
             profileURL:'https://robohash.org/-t_5Rx90CdB8bciAAAK.png',
             score: 110
         },
         {
             user_name: 'yart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAK.png',
             score: 150
         },
         {
             user_name: 'yart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAK.png',
             score: 150
         },
         {
             user_name: 'yart',
             profileURL:'https://robohash.org/-t_5Rx90CdBl8bciAK.png',
             score: 150
         },
     ]

     const answers=[
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: [`In life, you''ll meet two kinds of people. The ones who punch buggy you and the ones who fuck your momsdffffffff. lkj lkj lkj klj ljk  In the end, you''ll thank them both.`], user: {profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3A.png',user_name: 'wwwwwwwwww'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest bart of gratitude is ddd.'], user: {profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AAAQ.png',user_name: 'bart'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest cart of gratitude is ddd.'], user: {id: 'asdfasdf', profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AAA.png',user_name: 'cart'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest dart of gratitude is ddd.'], user: {profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AA.png',user_name: 'dart'}},
         {image: 'https://images.unsplash.com/photo-1621414130936-6f0c63360ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzUyNjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjMyNjk0OTk&ixlib=rb-1.2.1&q=80&w=1080', response: ['The truest dart of gratitude is ddd.'], user: {profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AA.png',user_name: 'dart'}},
     ]

     const votes = {
         wwwwwwwwww:[
             {id: 'asdfasdf', profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AAAQ.png', score: 100, user_name: 'bart'}
         ],
         bart:[
             {id: 'asdfasdf', profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AAA.png', score: 100, user_name: 'cart'},
         ],
         cart:[
             {id: 'asdfasdf', profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3AA.png', score: 100, user_name: 'dart'}
         ],
         dart:[
             {id: 'asdfasdf', profileURL: 'https://robohash.org/VIzXjd-1TmHJyAm3A.png', score: 100, user_name: 'fart'}
         ],
     }

     

    //  const answMap = answers && answers.map(answer=>{
    //     return <MPVoteEntry key={answer.user.user_name} answer={answer} handleVote={handleVote} />
    // })

    // const results = answers.map(answer=>{
    //     console.log('Vote result Anwer: ', answer)
    //     const votesFrom = votes[answer.user.user_name]?[...votes[answer.user.user_name]]: 0
    //     return <MPVoteRes key={answer.user.user_name} votes={votesFrom} answer={answer} />
    // })

    const sortedPlayers = players.sort((first,second)=>second.score - first.score )
    const winner = players.reduce((acc, curr)=>curr.score > acc.score? curr: acc ,{score:0})
    return(
        <div className='winner'>
            <h2>WINNER!</h2>
            <img src={winner.profileURL} />
            <h3>{winner.user_name}</h3>
            
        </div>
    )
}
export default Dash;