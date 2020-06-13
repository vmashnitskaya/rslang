import { combineReducers } from 'redux';
import types from './types';

function token(state = null, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_TOKEN:
            return payload;
        case types.CLEAR_TOKEN:
            return null;
        default:
            return state;
    }
}

const reducer = combineReducers({
    token,
});

export default reducer;
