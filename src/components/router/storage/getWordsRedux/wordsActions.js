import wordsTypes from './wordsTypes';
import wordsApi from './wordsApi';

const fetchWordsPending = () => ({
    type: wordsTypes.FETCH_WORDS_PENDING,
});

const fetchWordsSuccess = (page, group, words) => ({
    type: wordsTypes.FETCH_WORDS_SUCCESS,
    payload: { page, group, words },
});

const fetchWordsFailed = (error) => ({
    type: wordsTypes.FETCH_WORDS_FAILED,
    payload: error,
});

const fetchWords = (page, group) => async (dispatch) => {
    try {
        dispatch(fetchWordsPending());
        const words = await wordsApi.fetchWords(page, group);
        dispatch(fetchWordsSuccess(page, group, words));
    } catch (e) {
        dispatch(fetchWordsFailed(e.message));
    }
};

export default { fetchWords };
