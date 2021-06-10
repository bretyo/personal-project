import MPVoteRes from "../Games/MotivationalPoser/Screens/MPVoteRes"

const Dash =()=>{

    const answers = [
        {response: ['this is some random text that im just throwing up here.'],image: "https://images.unsplash.com/photo-1506777390528-af8560003b14?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc0fHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60", 
        user: {id: "t_5Rx90CdBl8bciAAAK",profileURL: "https://robohash.org/-t_5Rx90CdBl8bciAAAK.png", score: 0, user_email: 'test', user_id: 2, user_name: 'TESTBOI'}}]

    const votes = {
        TESTBOI: [
            {user_name: 'SSSSG', id: 'LKDJFjkdfjdlLSDSD', score: 100, profileURL: 'https://robohash.org/-t_5Rx90CdBl8bciAAAK.png'}
        ]
    }

    const results = answers.map(answer=>{
        console.log('Vote result Anwer: ', answer)
        const votesFrom = votes[answer.user.user_name]?[...votes[answer.user.user_name]]: 0
        return <MPVoteRes key={answer.user.user_name} votes={votesFrom} answer={answer} />
    })

    return(
        <div id='display-vote-results'>
            {results && results}
        </div>
    )
}
export default Dash;