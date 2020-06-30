import { combineReducers } from 'redux';
import vocabularyTypes from './vocabularyTypes';
import temp from '../temp';

const wordsReducer = (state = temp, action) => {
    const { type, payload, meta } = action;

    switch (type) {
        case vocabularyTypes.SET_VOCABULARY_WORDS:
            return { ...state, [meta.type]: payload };
        case vocabularyTypes.DELETE_WORD_BY_INDEX: {
            const words = state[meta.type]
                ? state[meta.type].filter((_, index) => index !== payload)
                : undefined;
            return { ...state, [meta.type]: words };
        }
        default:
            return state;
    }
};

const reducer = combineReducers({
    words: wordsReducer,
});

export default reducer;
