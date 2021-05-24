// initial state
const initialState = {
    user: null
}

// Action types
const SET_USER = 'SET_USER'

// Action Builders
export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}

// Reducer
export default function authReducer(state=initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload}

        default:
            return state;
    }
}