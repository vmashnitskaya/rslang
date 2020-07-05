import { combineReducers } from 'redux';
import types from './types';

const words = (state = null, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_WORDS:
            return payload;
        case types.CLEAR_WORDS:
            return null;
        default:
            return state;
    }
};

const savannah = combineReducers({
    words,
});

export default savannah;
