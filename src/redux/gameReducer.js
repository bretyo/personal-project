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
    switch(action.type){
        case SET_GAMES:
            return {...state, games: action.payload};

        case SET_SELECTED_GAME:
            return {...state, selectedGame: state.games[action.payload]}

        default:
            return state;
    }
}