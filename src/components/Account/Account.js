import axios from "axios";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import StatEntry from "./StatEntry";

const Account =(props)=>{
    const[data, setData] = useState([])
    // const {user} = useSelector(store=>store.authReducer)
    const {history} = props
    let user={
        user_email : 'test@email.com',
        user_name : 'testboi'
    }

    // pushes user back to dashboard if they're not logged in
    // useEffect(()=>{
    //     !user && history.push('/')
    // },[user])

    const getDataTemp=()=>{
        axios.get('/api/stats')
        .then(res=>{
            setData(res.data)
        })
    }

    console.log(data)
    const dataChart= data.map(stat=>{
        return <StatEntry />
    })
    return(
        <div className='account-screen'>
            <h2>Account</h2>
            <h3>Email: {user.user_email}</h3>
            <h3>Username: {user.user_name}</h3>
            <button onClick={getDataTemp}>Temp get data button</button>
        </div>
    )
}
export default Account;