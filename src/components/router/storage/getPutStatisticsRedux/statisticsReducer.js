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
                    c: 0,
                    s: 0,
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
            const needUpdate = !!(payload.learned || payload.correct || payload.sequence);
            const date = statisticsActions.getDate();
            const curDay = state.statistics.optional.main[date];
            const newState = { ...state };
            if (payload.learned) {
                newState.statistics.learnedWords += payload.learned;
            }
            if (curDay || needUpdate) {
                const newDate = {
                    d: payload.wordsPerDay,
                    l: curDay ? curDay.l + payload.learned : payload.learned,
                    c: curDay ? curDay.c + payload.correct : payload.correct,
                    s: curDay && curDay.s < payload.sequence ? payload.sequence : curDay.s,
                };
                newState.statistics.optional.main[date] = newDate;
            }
            return newState;
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
