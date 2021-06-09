import axios from "axios";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import StatEntry from "./StatEntry";

const Account =(props)=>{
    const[data, setData] = useState([])
    const {user} = useSelector(store=>store.authReducer)
    const {history} = props
    // let user={
    //     user_email : 'test@email.com',
    //     user_name : 'testboi'
    //}

    // let data = //[
    // //     {
    // //         game_name: "Motivational Poser",
    // //         high_score: 600,
    // //         times_played: 7,
    // //         total_wins: 6,
    // //         stat_id: 1
    // //     },
    // //    
    // //]

    //pushes user back to dashboard if they're not logged in
    useEffect(()=>{
        !user && history.push('/')
    },[user])

    const getDataTemp=()=>{
        axios.get('/api/stats')
        .then(res=>{
            setData(res.data)
        })
    }

    const handleDelete=(stat_id)=>{
        axios.delete(`/api/stats/${stat_id}`)
    }

    console.log(data)
    const dataChart= data.map((stat)=>{
        return <StatEntry key={stat.game_name} stat={stat} handleDelete={handleDelete} />
    })
    return(
        <div className='account-screen'>
           {user && <section className='acc-details'>
                <h2>Account Details</h2>
                <h3><span>Email: </span>{user.user_email}</h3>
                <h3><span>Username: </span>{user.user_name}</h3>
            </section>}
            <section className='acc-stats'>
                
                    <table className='stat-chart'>
                        <caption>User's gameplay statistics.</caption>
                        <div className='table-scroll'>
                        <thead>
                            <tr className='top-row'>
                                <td>Title of Game</td>
                                <td># of Plays</td>
                                <td># of Wins</td>
                                <td># of Losses</td>
                                <td>Highest Score</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {dataChart} {/* <<<<<<<<<<<<<<< THIS IS WHERE THE DYNAMIC DATA IS */}
                        </tbody>
                        </div>
                    </table>
                
            </section>
            <button onClick={getDataTemp}>Temp get data button</button>
        </div>
    )
}
export default Account;