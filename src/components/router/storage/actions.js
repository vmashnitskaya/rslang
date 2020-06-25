import types from './types';
import { createUser, loginUser } from '../../loginPage/authorizationApi';

const token = {
    set: (payload) => ({ type: types.SET_TOKEN, payload }),
    clear: () => ({ type: types.CLEAR_TOKEN }),
};

const userId = {
    set: (payload) => ({ type: types.SET_USER_ID, payload }),
    clear: (payload) => ({ type: types.CLEAR_USER_ID, payload }),
};

const user = {
    create: (payload) => (dispatch) => {
        createUser(payload)
            .then(() =>
                dispatch(
                    user.createSuccess(
                        `User with e-mail ${payload.email} was succesfully created. Please sign in.`
                    )
                )
            )
            .catch((error) => dispatch(user.createError(error.message || `Unexpected`)));
    },
    createSuccess: (message) => ({ type: types.CREATE_USER_SUCCESS, payload: message }),
    createError: (payload) => ({ type: types.CREATE_USER_ERROR, payload }),
    logIn: (payload) => (dispatch) => {
        loginUser(payload)
            .then((data) => dispatch(user.loggedIn(data)))
            .catch((error) => dispatch(user.loginError(error)));
    },
    loggedIn: (payload) => ({ type: types.LOGGED_IN, payload }),
    logInError: (payload) => ({ type: types.LOGIN_ERROR, payload }),
};

const action = {
    token,
    userId,
    user,
};

export default action;
