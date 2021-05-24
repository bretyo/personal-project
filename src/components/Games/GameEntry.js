// import {useState} from 'react'
// import {useSelector, useDispatch} from 'react-redux'

// const GameEntry=(props)=>{
//     const {selectedGame} = useSelector(store=>store.gameReducer)
//     const dispatch = useDispatch();
//     return(
//         <li>
//             <h2>Game Title Prop</h2>
//             {
//                 selectedGame.game_name === props.game_name && (
//                     <div>
//                         <button onClick={props.history.push('/games/m_poser')} >Play</button>
//                     </div>
//                 )
//             }
//         </li>
//     )
// }