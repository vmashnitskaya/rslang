import wordsTypes from './wordsTypes';

const wordsReducer = (
    state = {
        page: null,
        group: null,
        loading: false,
        words: [],
        error: null,
    },
    action
) => {
    const { type, payload } = action;

    switch (type) {
        case wordsTypes.FETCH_WORDS_PENDING:
            return { ...state, error: null, page: null, group: null, words: [], loading: true };
        case wordsTypes.FETCH_WORDS_SUCCESS:
            return {
                ...state,
                loading: false,
                page: payload.page,
                group: payload.group,
                words: payload.words,
            };
        case wordsTypes.FETCH_WORDS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default wordsReducer;
