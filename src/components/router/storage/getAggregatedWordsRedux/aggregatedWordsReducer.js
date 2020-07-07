import aggregatedWordsTypes from './aggregatedWordsTypes';

const initialState = {
    loading: false,
    aggregatedWords: [],
    error: null,
};

const aggregatedWordsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case aggregatedWordsTypes.FETCH_AGGR_WORDS_PENDING:
            return { ...state, error: false, aggregatedWords: [], loading: true };
        case aggregatedWordsTypes.FETCH_AGGR_WORDS_SUCCESS:
            return {
                ...state,
                loading: false,
                aggregatedWords: payload.aggregatedWords,
            };
        case aggregatedWordsTypes.FETCH_AGGR_WORDS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default aggregatedWordsReducer;
