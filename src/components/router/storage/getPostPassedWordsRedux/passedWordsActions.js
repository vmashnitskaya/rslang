import passedWordsTypes from './passedWordsTypes';
import passedWordsApi from './passedWordsApi';

const fetchPassedPending = () => ({
    type: passedWordsTypes.FETCH_PASSED_PENDING,
});

const fetchPassedSuccess = (userId, token, settings) => ({
    type: passedWordsTypes.FETCH_PASSED_SUCCESS,
    payload: { userId, token, settings },
});

const fetchPassedFailed = (error) => ({
    type: passedWordsTypes.FETCH_PASSED_FAILED,
    payload: error,
});

const setDefaultPassed = () => ({
    type: passedWordsTypes.SET_DEFAULT_PASSED,
});

const fetchSettings = (userId, token) => async (dispatch) => {
    try {
        dispatch(fetchPassedPending());
        const passed = await passedWordsApi.getUserPassedWords(userId, token);
        if (passed) {
            dispatch(fetchPassedSuccess(userId, token, passed));
        } else {
            dispatch(setDefaultPassed());
        }
    } catch (e) {
        dispatch(fetchPassedFailed(e.message));
    }
};

export default { fetchSettings };
