// initial State
const initialState = {
    games: [],
    selectedGame: {}
}

// Action Types
const SET_GAMES = 'SET_GAMES'
const SET_SELECTED_GAME = 'SET_SELECTED_GAME'

// Action Builders
export function setGames(games){
    return{
        type: SET_GAMES,
        payload: games
    }
}

export function setSelectedGame(gameId){
    return{
        type: SET_SELECTED_GAME,
        payload: gameId
    }
}

// Reducer
export default function gameReducer(state=initialState, action){
    // console.log('games state: ', state.games)
    // console.log('type:', action.type)
    // console.log('selected game: ', action.payload)
    switch(action.type){
        case SET_GAMES:
            return {...state, games: action.payload};

        case SET_SELECTED_GAME:
            if(action.payload===-1){
                return {...state}
            }
            return {...state, selectedGame: state.games[action.payload]}

        default:
            return state;
    }
}