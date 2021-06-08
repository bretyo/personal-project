import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AuthButton from './AuthButton/AuthButton';
import UserDisplay from './UserDisplay/UserDisplay';

const Header=(props)=>{
    
    // Global User
    const {user} = useSelector(store=>store.authReducer)
    const {playing} = useSelector(store=>store.gameReducer)

    

    // console.log(logging)
    return(
        <header className={`${playing ? 'header-hide': ''} header-hide`}>
            <div className='header-container'>
                <Link to='/'><h1>BretBox</h1></Link>
                <Link to='/join'><h2>Join Game</h2></Link>
                <Link to='/games'><h2>Start Game</h2></Link>
                {!user?<AuthButton  />: <UserDisplay user={user} />}
            </div>
        </header>
    )
}
export default Header