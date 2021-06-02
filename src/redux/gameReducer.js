// initial State
const initialState = {
    games: [],
    selectedGame: {},
    players: [],
    prompts: {
        prompts: [],
        images: []
    }
}

// Action Types
const SET_GAMES = 'SET_GAMES'
const SET_SELECTED_GAME = 'SET_SELECTED_GAME'
const SET_PLAYERS = 'SET_PLAYERS'
const SET_PROMPTS = 'SET_PROMPTS'

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

export function setPlayers(players){
    return{
        type: SET_PLAYERS,
        payload: players
    }
}

export function setPrompts(prompts){
    return{
        type: SET_PROMPTS,
        payload: prompts
    }
}

// Reducer
export default function gameReducer(state=initialState, action){
    console.log('prompts state: ', state.prompts)
    console.log('type:', action.type)
    console.log('payload: ', action.payload)
    switch(action.type){
        case SET_GAMES:
            return {...state, games: action.payload};

        case SET_SELECTED_GAME:
            if(action.payload===-1){
                return {...state}
            }
            return {...state, selectedGame: state.games[action.payload]}

        case SET_PLAYERS:
            return {...state, players: action.payload}

        case SET_PROMPTS:
            if(action.payload.images){
                return {...state, prompts: {...state.prompts, images: action.payload.images}}
            }
            else{
                return {...state, prompts: {...state.prompts, prompts: action.payload.prompts}}
            }

        default:
            return state;
    }
}