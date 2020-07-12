import statisticsTypes from './statisticsTypes';
import statisticsApi from './statisticsApi';
import statisticsSelectors from './statisticsSelectors';
import settingsSelectros from '../getSettingsRedux/settingsSelectors';
import { getUserId, getToken } from '../selectors';

const fetchStatisticsPending = () => ({
    type: statisticsTypes.FETCH_STATISTICS_PENDING,
});

const fetchStatisticsSuccess = (userId, token, statistics) => ({
    type: statisticsTypes.FETCH_STATISTICS_SUCCESS,
    payload: { userId, token, statistics },
});

const fetchStatisticsFailed = (error) => ({
    type: statisticsTypes.FETCH_STATISTICS_FAILED,
    payload: error,
});

const setDafaultStatistics = () => ({
    type: statisticsTypes.SET_DEFAULT_STATISTICS,
});

const increateLearnedWordsNumber = (wordsPerDay, increase) => ({
    type: statisticsTypes.ENCREASE_LEARNED_WORDS_NUMBER,
    payload: { wordsPerDay, increase },
});

const setMinigameStatistics = (game, totalWords, correctAnswers) => ({
    type: statisticsTypes.SET_MINIGAMES_STATISTICS,
    payload: { game, totalWords, correctAnswers },
});

const fetchStatistics = (userId, token) => async (dispatch) => {
    try {
        dispatch(fetchStatisticsPending());
        const statistics = await statisticsApi.getUserStatistics(userId, token);
        if (statistics) {
            dispatch(fetchStatisticsSuccess(userId, token, statistics));
        } else {
            setDafaultStatistics();
        }
    } catch (e) {
        dispatch(fetchStatisticsFailed(e.message));
    }
};

const saveStatistics = async (getState) => {
    const id = getUserId(getState());
    const token = getToken(getState());
    const statistics = statisticsSelectors.getStatistics(getState());

    await statisticsApi.putUserStatistics(id, token, statistics);
};

const updateStatics = () => async (dispatch, getState) => {
    const { wordsPerDay } = settingsSelectros.getSettings(getState());
    dispatch(increateLearnedWordsNumber(wordsPerDay, true));
    await saveStatistics(getState);
};

const saveWordsPerDay = () => async (dispatch, getState) => {
    const { wordsPerDay } = settingsSelectros.getSettings(getState());
    dispatch(increateLearnedWordsNumber(wordsPerDay, false));
    await saveStatistics(getState);
};

const updateStaticsMiniGame = (game, totalWords, correctAnswers) => async (dispatch, getState) => {
    dispatch(setMinigameStatistics(game, totalWords, correctAnswers));
    await saveStatistics(getState);
};

const getDate = () => `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;
const getDateAndTime = () => `${new Date().toISOString().slice(0, 16).replace(/-|T|:/g, '')}`;

export default {
    fetchStatistics,
    updateStatics,
    saveWordsPerDay,
    updateStaticsMiniGame,
    setDafaultStatistics,
    getDate,
    getDateAndTime,
};
