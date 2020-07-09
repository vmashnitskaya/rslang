import statisticsTypes from './statisticsTypes';
import statisticsApi from './statisticsApi';
import statisticsSelectors from './statisticsSelectors';
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

const increateLearnedWordsNumber = (date) => ({
    type: statisticsTypes.ENCREASE_LEARNED_WORDS_NUMBER,
    payload: date,
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

const updateStatics = (date) => async (dispatch, getState) => {
    dispatch(increateLearnedWordsNumber(date));
    const id = getUserId(getState());
    const token = getToken(getState());
    const { id: statisticsId, ...statistics } = statisticsSelectors.getStatistics(getState());

    await statisticsApi.putUserStatistics(id, token, statistics);
};

export default { fetchStatistics, updateStatics };
