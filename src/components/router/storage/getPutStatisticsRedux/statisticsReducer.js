import statisticsTypes from './statisticsTypes';
import statisticsActions from './statisticsActions';

const initialState = {
    loading: false,
    error: false,
    statistics: {
        learnedWords: 0,
        optional: {
            main: {
                [statisticsActions.getDate()]: {
                    d: 20,
                    l: 0,
                },
            },
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
                statistics: initialState.statistics,
            };
        case statisticsTypes.ENCREASE_LEARNED_WORDS_NUMBER: {
            const date = statisticsActions.getDate();
            const curDay = state.statistics.optional.main[date];
            const increase = payload.increase ? 1 : 0;
            if (curDay) {
                return {
                    ...state,
                    statistics: {
                        ...state.statistics,
                        learnedWords: state.statistics.learnedWords + increase,
                        optional: {
                            main: {
                                ...state.statistics.optional.main,
                                [date]: {
                                    d: payload.wordsPerDay,
                                    l: curDay ? curDay.l + increase : increase,
                                },
                            },
                        },
                    },
                };
            }
            return state;
        }
        case statisticsTypes.SET_MINIGAMES_STATISTICS: {
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    learnedWords: state.statistics.learnedWords + 1,
                    optional: {
                        [payload.game]: {
                            ...state.statistics.optional[payload.game],
                            [statisticsActions.getDateAndTime()]: {
                                t: payload.totalWords,
                                c: payload.correctAnswers,
                            },
                        },
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default settingsReducer;
