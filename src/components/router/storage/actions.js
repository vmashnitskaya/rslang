import types from './types';

const token = {
    set: (payload) => ({ type: types.SET_TOKEN, payload }),
    clear: () => ({ type: types.CLEAR_TOKEN }),
};

const action = {
    token,
};

export default action;
