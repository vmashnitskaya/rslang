import vocabularyTypes from './vocabularyTypes';

const wordsActions = {
    set: (type, words) => ({
        type: vocabularyTypes.SET_VOCABULARY_WORDS,
        payload: words,
        meta: { type },
    }),
    deleteByIndex: (type, index) => ({
        type: vocabularyTypes.DELETE_WORD_BY_INDEX,
        payload: index,
        meta: { type },
    }),
};

const action = {
    words: wordsActions,
};

export default action;
