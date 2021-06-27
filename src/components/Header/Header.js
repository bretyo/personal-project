import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AuthButton from './AuthButton/AuthButton';
import UserDisplay from './UserDisplay/UserDisplay';
import { useEffect, useState } from 'react';
import MenuButton from './MenuButton/MenuButton';
import {useSpring, animated, config} from 'react-spring'
import { setUser } from '../../redux/authReducer';
import axios from 'axios';

const Header=()=>{
    
    // Global User
    const {user} = useSelector(store=>store.authReducer)
    const {playing} = useSelector(store=>store.gameReducer)
    const [navShow,setNavShow] = useState(false)
    const dispatch = useDispatch();

    const headerLoad = useSpring({config:config.slow, from:{transform: 'translateY(-500px)'}, to:{transform: 'translateY(0)'}})
    
    useEffect(()=>{
        if(!user){
            axios.get('/auth/user')
            .then(res=>{
                dispatch(setUser(res.data))
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[user])

    return(
        <animated.header style={headerLoad} className={`${playing ? 'header-hide': ''} `}>
            <nav className='header-container'>
                <Link onClick={()=>setNavShow(false)} to='/'><h1>BretBox</h1></Link>
                {<MenuButton toggleNav={()=>setNavShow(!navShow)}/>}
                <ul className={`nav-content`}>
                    <Link onClick={()=>setNavShow(false)} to='/join'><li>Join Game</li></Link>
                    <Link onClick={()=>setNavShow(false)} to='/games'><li>Start Game</li></Link>
                    {!user?<AuthButton  />: <UserDisplay setNavShow={setNavShow} user={user} />}
                </ul>
                <ul className={`nav-content-drop ${navShow? 'show':''}`}>
                    <Link onClick={()=>setNavShow(false)} to='/join'><li>Join Game</li></Link>
                    <Link onClick={()=>setNavShow(false)} to='/games'><li>Start Game</li></Link>
                    {!user?<AuthButton  />: <UserDisplay setNavShow={setNavShow} user={user} />}
                </ul>
            </nav>
            
        </animated.header>
    )
}
export default Header