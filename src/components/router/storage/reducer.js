import { combineReducers } from 'redux';
import types from './types';

const initAuthState = {
    userId: '5ee497332e6f8100172962d5',
    token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTQ5NzMzMmU2ZjgxMDAxNzI5NjJkNSIsImlhdCI6MTU5MzgwMTMwMywiZXhwIjoxNTkzODE1NzAzfQ.5ZoD6eRL0y1C6LAu0j3ooOBG-fZ5d3I7vBoX1OQs_LQ',
    createSuccess: null,
    createError: null,
    logInMessage: null,
    logInError: null,
};

const auth = (state = initAuthState, action) => {
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
        case types.CREATE_USER_SUCCESS:
            return { ...state, createSuccess: payload, createError: null };
        case types.CREATE_USER_ERROR:
            return { ...state, createError: payload };
        case types.LOGGED_IN:
            return { ...state, ...payload, logInMessage: payload.message, logInError: null };
        case types.LOGIN_ERROR:
            return { ...state, logInError: payload };
        default:
            return state;
    }
};

const reducer = combineReducers({
    auth,
});

export default reducer;
