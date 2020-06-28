import mainGameTypes from './mainGameTypes';

const initialState = {
    mainWords: [],
};

const mainGameReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case mainGameTypes.SET_WORDS:
            return {
                ...state,
                mainWords: payload,
            };
        default:
            return state;
    }
};

export default mainGameReducer;
