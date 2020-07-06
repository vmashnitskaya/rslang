import statisticsTypes from './statisticsTypes';

const initialState = {
    loading: false,
    error: false,
    statistics: {
        learnedWords: 0,
        optional: {
            [`${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`]: 0,
        },
    },
};

const settingsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case statisticsTypes.FETCH_STATISTICS_PENDING:
            return { ...state, error: false, loading: true };
        case statisticsTypes.FETCH_STATISTICS_SUCCESS:
            return {
                ...state,
                loading: false,
                statistics: payload.statistics,
            };
        case statisticsTypes.FETCH_STATISTICS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case statisticsTypes.SET_DEFAULT_STATISTICS:
            return {
                ...state,
                loading: false,
            };
        case statisticsTypes.ENCREASE_LEARNED_WORDS_NUMBER:
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    learnedWords: state.statistics.learnedWords + 1,
                    optional: {
                        ...state.statistics.optional,
                        [payload]: state.statistics.optional[payload] + 1 || 1,
                    },
                },
            };
        default:
            return state;
    }
};

export default settingsReducer;
