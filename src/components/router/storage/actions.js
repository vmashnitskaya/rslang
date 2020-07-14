import types from './types';
import { createUser, loginUser } from '../../loginPage/authorizationApi';
import { getToken, getUserId } from './selectors';
import statisticsSelectors from './getPutStatisticsRedux/statisticsSelectors';
import statisticsApi from './getPutStatisticsRedux/statisticsApi';
import settingsSelectors from './getSettingsRedux/settingsSelectors';
import settingsApi from './getSettingsRedux/settingsApi';
import settingsActions from './getSettingsRedux/settingsActions';
import statisticsActions from './getPutStatisticsRedux/statisticsActions';

const token = {
    set: (payload) => ({ type: types.SET_TOKEN, payload }),
    clear: () => ({ type: types.CLEAR_TOKEN }),
};

const userId = {
    set: (payload) => ({ type: types.SET_USER_ID, payload }),
    clear: (payload) => ({ type: types.CLEAR_USER_ID, payload }),
};

const loggedIn = (payload) => ({ type: types.LOGGED_IN, payload });
const logInError = (payload) => ({ type: types.LOGIN_ERROR, payload });

const proceedUserInfo = (data) => async (dispatch) => {
    dispatch(loggedIn(data));
    dispatch(statisticsActions.fetchStatistics(data.userId, data.token));
    dispatch(settingsActions.fetchSettings(data.userId, data.token));
};

const logIn = (email, password) => async (dispatch) => {
    try {
        const data = await loginUser({ email, password });
        const { token, userId } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        dispatch(proceedUserInfo(data));
    } catch (error) {
        dispatch(logInError(error.message));
    }
};

const auth = () => async (dispatch, getState) => {
    try {
        const userId = getUserId(getState());
        const token = getToken(getState());
        if (token && userId) {
            dispatch(proceedUserInfo({ token, userId }));
        }
    } catch (error) {
        dispatch(logInError(error.message));
    }
};

const createSuccess = (message) => ({ type: types.CREATE_USER_SUCCESS, payload: message });
const createError = (payload) => ({ type: types.CREATE_USER_ERROR, payload });

const create = (user) => async (dispatch, getState) => {
    try {
        await createUser(user);
        dispatch(createSuccess(''));
        await dispatch(logIn(user.email, user.password));
        const id = getUserId(getState());
        const token = getToken(getState());
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        const statistics = statisticsSelectors.getStatistics(getState());
        const settings = settingsSelectors.getSettings(getState());
        await Promise.all([
            statisticsApi.putUserStatistics(id, token, statistics),
            settingsApi.putUserSettings(id, token, settings),
        ]);
    } catch (error) {
        dispatch(createError(error.message || `Unexpected`));
    }
};

const logOut = (dispatch) => {
    dispatch(token.clear());
    dispatch(userId.clear());
    dispatch(statisticsActions.setDafaultStatistics());
    dispatch(settingsActions.setDafaultSettings());
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};

const user = {
    createSuccess,
    createError,
    create,
    loggedIn,
    logInError,
    logIn,
    logOut,
    auth,
};

const action = {
    token,
    userId,
    user,
};

export default action;
