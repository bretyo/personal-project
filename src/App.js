import './App.css';
import {useState, useEffect} from 'react' //use Effect for import game data
import Header from './components/Header/Header';
import routes from './routes'
// GLOBAL STATE FOR GAME
function App() {
  return (
    <div className="App">
      <Header/>
      {routes}
    </div>
  );
}

export default App;
