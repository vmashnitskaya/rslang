import statisticsTypes from './statisticsTypes';
import utils from './statisticsUtils';

const getMainGameDay = (state) => {
    const stats = state.statistics.optional.main;
    const date = utils.getDate();
    const curDay = stats && stats[date] ? stats[date] : utils.getInitialDateStaticstics(20);
    return { curDay, date };
};

const initialState = {
    loading: false,
    error: false,
    statistics: {
        learnedWords: 0,
        optional: {
            main: {
                [utils.getDate()]: utils.getInitialDateStaticstics(20),
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
            const newState = { ...state };
            const { curDay, date } = getMainGameDay(state);
            curDay.d = payload.wordsPerDay;
            if (payload.increase) {
                curDay.l += 1;
                newState.statistics.learnedWords += 1;
            }
            newState.statistics.optional = {
                ...newState.statistics.optional,
                main: {
                    ...state.statistics.optional.main,
                    [date]: curDay,
                },
            };
            return newState;
        }
        case statisticsTypes.INC_SUCCESS: {
            const { curDay, date } = getMainGameDay(state);
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
        case statisticsTypes.INC_ERRORS: {
            const { curDay, date } = getMainGameDay(state);
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
        case statisticsTypes.INC_NEW_WORD: {
            const { curDay, date } = getMainGameDay(state);
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
                            [utils.getDateAndTime()]: {
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
