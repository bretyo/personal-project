import {useEffect, useState} from 'react' //use Effect for import game data
import Header from './components/Header/Header';
import routes from './routes'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { setGames } from './redux/gameReducer'
import io from 'socket.io-client'
// GLOBAL STATE FOR GAME

function App(props) {
  const {games} = useSelector(store=>store.gameReducer)
  const [socket, setSocket] = useState(null)
  // const {user} = useSelector(store=>store.authReducer)
  const dispatch = useDispatch();

  useEffect(()=>{
    // if(!socket){
    //   setSocket(io.connect())

    // }

    axios.get('/api/games')
    .then(res=>{
      dispatch(setGames(res.data))
    })
    .catch(err=>{
      console.log(err)
    });

  //   return()=>{
  //     socket.disconnect()
  //     setSocket(null)
  // }
}, [dispatch])
  // console.log(user)
  return (
    <div className={`App `}>
      <Header/>
      {routes}
    </div>
  );
}

export default App;
