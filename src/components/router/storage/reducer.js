import { combineReducers } from 'redux';
import types from './types';

const initAuthState = {
    userId: null,
    token: null,
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
