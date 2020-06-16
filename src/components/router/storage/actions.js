import types from './types';

const token = {
    set: (payload) => ({ type: types.SET_TOKEN, payload }),
    clear: () => ({ type: types.CLEAR_TOKEN }),
};

const userId = {
    set: (payload) => ({ type: types.SET_USER_ID, payload }),
    clear: (payload) => ({ type: types.CLEAR_USER_ID, payload }),
};

const action = {
    token,
    userId,
};

export default action;
