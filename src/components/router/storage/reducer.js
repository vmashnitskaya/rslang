import { combineReducers } from 'redux';
import types from './types';

const initAuthState = {
    userId: null,
    token: null,
};

function auth(state = initAuthState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_TOKEN:
            return { ...state, token: payload };
        case types.CLEAR_TOKEN:
            return { ...state, token: null };
        case types.SET_USER_ID:
            return { ...state, token: payload };
        case types.CLEAR_USER_ID:
            return { ...state, token: null };
        default:
            return state;
    }
}

const reducer = combineReducers({
    auth,
});

export default reducer;
