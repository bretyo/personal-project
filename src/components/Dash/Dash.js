import MPAnswer from "../Games/MotivationalPoser/Screens/MPAnswer"
import MPVoteRes from "../Games/MotivationalPoser/Screens/MPVoteRes"

const Dash =()=>{

    
    const image=`https://images.unsplash.com/photo-1614595402938-ecee8416e6b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`

    return(
        <div className='tutorial'>
            <div className='mp-prompt'>
                
                <img src={`https://images.unsplash.com/photo-1601902322950-cb5182a20b34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE0fHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`} />
                {/* <p>At the start of the round, you will receive a random image (provided by Unsplash.com)</p> */}
            
                <div>
                    <p>You miss 100% of the </p>
                    <input value='cats'/>
                    <p> that you don't </p>
                    <input value='eat'/>
                    <p>.</p>
                    <button>Send</button>
                </div>
            </div>
            <section className='tut-text'>
                <h2>Tutorial!</h2>
                <p>At the start of the round, you will receive a random image (provided by Unsplash.com)</p> 
                <p>You will also receive an inspirational, and unfinished, quote!</p>
                <p>Fill in the blanks and send it before the timer runs out!</p> 
                <p>Once the round is over, you and your fellow players will vote for the most motivating poster. </p>
                <p>The first two rounds, everyone wil have a prompt of their own. But the third round, everybody has the same prompt</p>
                <p>After three rounds, the player with the highest score wins!</p>
                <button>Start Round One</button>
            </section>
        </div>
    )
}
export default Dash;