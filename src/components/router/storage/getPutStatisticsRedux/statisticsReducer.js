import statisticsTypes from './statisticsTypes';
import statisticsActions from './statisticsActions';

const getInitialDateStaticstics = (dayWords) => ({
    d: dayWords,
    l: 0,
    s: 0,
    e: 0,
    sq: 0,
    msq: 0,
    n: 0,
});

const initialState = {
    loading: false,
    error: false,
    statistics: {
        learnedWords: 0,
        optional: {
            main: {
                [statisticsActions.getDate()]: getInitialDateStaticstics(20),
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
                            ...state.statistics.optional,
                            main: {
                                ...state.statistics.optional.main,
                                [date]: {
                                    ...state.statistics.optional.main[date],
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
        case statisticsTypes.INC_SUCCESS: {
            const date = statisticsActions.getDate();
            const curDay = state.statistics.optional.main[date];
            if (curDay) {
                let { s, sq, msq } = curDay;
                s += 1;
                if (sq === msq) {
                    msq += 1;
                    sq = msq;
                } else {
                    sq += 1;
                }
                return {
                    ...state,
                    statistics: {
                        ...state.statistics,
                        optional: {
                            ...state.statistics.optional,
                            main: {
                                ...state.statistics.optional.main,
                                [date]: {
                                    ...curDay,
                                    s,
                                    sq,
                                    msq,
                                },
                            },
                        },
                    },
                };
            }
            return state;
        }
        case statisticsTypes.INC_ERRORS: {
            const date = statisticsActions.getDate();
            const curDay = state.statistics.optional.main[date];
            if (curDay) {
                return {
                    ...state,
                    statistics: {
                        ...state.statistics,
                        optional: {
                            ...state.statistics.optional,
                            main: {
                                ...state.statistics.optional.main,
                                [date]: {
                                    ...curDay,
                                    e: curDay.e + 1,
                                    sq: 0,
                                },
                            },
                        },
                    },
                };
            }
            return state;
        }
        case statisticsTypes.INC_NEW_WORD: {
            const date = statisticsActions.getDate();
            const curDay = state.statistics.optional.main[date];
            if (curDay) {
                return {
                    ...state,
                    statistics: {
                        ...state.statistics,
                        optional: {
                            ...state.statistics.optional,
                            main: {
                                ...state.statistics.optional.main,
                                [date]: {
                                    ...curDay,
                                    n: curDay.n + 1,
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
                        ...state.statistics.optional,
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
