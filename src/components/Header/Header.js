import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AuthButton from './AuthButton/AuthButton';
import UserDisplay from './UserDisplay/UserDisplay';
import { useState } from 'react';
import MenuButton from './MenuButton/MenuButton';

const Header=(props)=>{
    
    // Global User
    const {user} = useSelector(store=>store.authReducer)
    const {playing} = useSelector(store=>store.gameReducer)
    const [navShow,setNavShow] = useState(false)
    const [menuBtnActive, setMenuBtnActive] = useState(true)

    

    // console.log(logging)
    return(
        <header className={`${playing ? 'header-hide': ''} `}>
            <nav className='header-container'>
                <Link onClick={()=>setNavShow(false)} to='/'><h1>BretBox</h1></Link>
                {menuBtnActive ? <MenuButton toggleNav={()=>setNavShow(!navShow)}/> : ''}
                <ul className={`nav-content`}>
                    <Link onClick={()=>setNavShow(false)} to='/join'><li>Join Game</li></Link>
                    <Link onClick={()=>setNavShow(false)} to='/games'><li>Start Game</li></Link>
                    {!user?<AuthButton  />: <UserDisplay user={user} />}
                </ul>
                <ul className={`nav-content-drop ${navShow? 'show':''}`}>
                    <Link onClick={()=>setNavShow(false)} to='/join'><li>Join Game</li></Link>
                    <Link onClick={()=>setNavShow(false)} to='/games'><li>Start Game</li></Link>
                    {!user?<AuthButton  />: <UserDisplay setNavShow={setNavShow} user={user} />}
                </ul>
            </nav>
            
        </header>
    )
}
export default Header