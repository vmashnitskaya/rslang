import aggregatedWordsTypes from './aggregatedWordsTypes';
import aggregatedWordsApi from './aggregatedWordsApi';

const fetchAggrWordsPending = () => ({
    type: aggregatedWordsTypes.FETCH_AGGR_WORDS_PENDING,
});

const fetchAggrWordsSuccess = (userId, token, aggregatedWords) => ({
    type: aggregatedWordsTypes.FETCH_AGGR_WORDS_SUCCESS,
    payload: { userId, token, aggregatedWords },
});

const fetchAggrWordsFailed = (error) => ({
    type: aggregatedWordsTypes.FETCH_AGGR_WORDS_FAILED,
    payload: error,
});

const fetchAggregatedWords = (userId, token, wordsPerPage, filter) => async (dispatch) => {
    console.log(filter);
    try {
        dispatch(fetchAggrWordsPending());
        const aggrWords = await aggregatedWordsApi.getAggregatedWords(
            userId,
            token,
            wordsPerPage,
            filter
        );
        dispatch(fetchAggrWordsSuccess(userId, token, aggrWords));
    } catch (e) {
        dispatch(fetchAggrWordsFailed(e.message));
    }
};

export default { fetchAggregatedWords };
