import {useEffect} from 'react' //use Effect for import game data
import Header from './components/Header/Header';
import routes from './routes'
import axios from 'axios';
import { useDispatch} from 'react-redux'
import { setGames } from './redux/gameReducer'
// GLOBAL STATE FOR GAME

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{

    axios.get('/api/games')
    .then(res=>{
      dispatch(setGames(res.data))
    })
    .catch(err=>{
      console.log(err)
    });

}, [dispatch])
  return (
    <div className={`App `}>
      <Header/>
      {routes}
    </div>
  );
}

export default App;
