import {Route, Switch} from 'react-router-dom'
import Account from './components/Account/Account'
import Dash from './components/Dash/Dash'
import Games from './components/Games/Games'
import MotivationalPoser from './components/Games/MotivationalPoser/MotivationalPoser'
import Join from './components/Join/Join'

export default(
    <Switch>
        <Route exact path='/' component={Dash} />
        <Route path='/account' component={Account}/>
        <Route path='/join' component={Join} />
        <Route exact path='/games' component={Games} />
        <Route path='/games/m_poser' component={MotivationalPoser} />
    </Switch>
)