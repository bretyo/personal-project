import MPAnswer from "../Games/MotivationalPoser/Screens/MPAnswer"
import MPVoteRes from "../Games/MotivationalPoser/Screens/MPVoteRes"

const Dash =()=>{

    
    const image=`https://images.unsplash.com/photo-1614595402938-ecee8416e6b5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxmdW5ueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60`

    return(
        <div className='intro-screen'>
            <div className='intro-wrapper'>
                <img src={image} />
                <section >
                    <p>Motivational Poser</p>
                </section>
            </div>
        </div>
    )
}
export default Dash;