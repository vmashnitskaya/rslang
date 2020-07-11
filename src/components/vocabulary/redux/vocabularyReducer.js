import { combineReducers } from 'redux';
import vocabularyTypes from './vocabularyTypes';

const wordsReducer = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case vocabularyTypes.SET_VOCABULARY_WORDS:
            return payload.length ? payload : [];
        case vocabularyTypes.DELETE_WORD_BY_ID: {
            const newArray = state.filter((element) => element._id !== payload);
            return newArray;
        }
        default:
            return state;
    }
};

const reducer = combineReducers({
    words: wordsReducer,
});

export default reducer;
